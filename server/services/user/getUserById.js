const { User } = require('../../database/models');

const getUserById = async (id) => {
  const user = await User.where({ id }).fetch();

  return user;
};

module.exports = getUserById;
