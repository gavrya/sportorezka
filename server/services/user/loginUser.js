const { User } = require('../../database/models');

const loginUser = async (userInfo) => {
  const {
    facebookId,
    facebookToken,
    name,
    email,
    avatarUrl,
  } = userInfo;

  const user = await User.where({ facebookId }).fetch();

  const timestamp = Date.now();

  let loggedUser;

  if (user) {
    loggedUser = await user.save({
      facebookToken,
      name,
      email,
      avatarUrl,
      updateDate: timestamp,
    }, { patch: true });
  } else {
    loggedUser = await User.forge({
      facebookId,
      facebookToken,
      name,
      email,
      avatarUrl,
      createDate: timestamp,
      updateDate: timestamp,
    }).save();
  }

  return loggedUser;
};

module.exports = loginUser;
