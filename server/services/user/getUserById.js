const { User } = require('../../database/models');

const getUserById = async (id) => {
  const user = await User.query().findById(id);

  return user;
};

module.exports = getUserById;
