const { User } = require('../../database/models');

const loginUser = async (userInfo) => {
  const {
    facebookId,
    facebookToken,
    name,
    email,
    avatarUrl,
  } = userInfo;

  const user = await User.query().select('id').findOne({ facebookId });

  const timestamp = Date.now();

  let loggedUser;

  if (user) {
    const userData = {
      facebookToken,
      name,
      email,
      avatarUrl,
      updateDate: timestamp,
    };

    loggedUser = await user.$query().patchAndFetch(userData);
  } else {
    const userData = {
      facebookId,
      facebookToken,
      name,
      email,
      avatarUrl,
      createDate: timestamp,
      updateDate: timestamp,
    };

    loggedUser = await User.query().insertAndFetch(userData);
  }

  return loggedUser;
};

module.exports = loginUser;
