const lodashGet = require('lodash.get');

/**
 {
   "id": "value",
   "name": "Last First",
   "first_name": "First",
   "last_name": "Last",
   "short_name": "Last",
   "picture": {
     "data": {
       "height": 50,
       "is_silhouette": true,
       "url": "value",
       "width": 50
     }
   },
   "email": "user@gmail.com"
 }
 * */

const validateUser = async (user) => {
  const errors = [];

  if (typeof user !== 'object') {
    errors.push('Invalid facebook user');

    return errors;
  }

  if (!user.id) {
    errors.push('Invalid facebook user id');
  }

  if (!user.name) {
    errors.push('Invalid facebook user name');
  }

  if (!user.email) {
    errors.push('Invalid facebook user email');
  }

  const userAvatarUrl = lodashGet(user, 'picture.data.url');

  if (!userAvatarUrl) {
    errors.push('Invalid facebook user avatar url');
  }

  return errors;
};

module.exports = validateUser;
