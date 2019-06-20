const { UserType } = require('../types');
const { userResolver } = require('../resolvers');

const UserQuery = {
  type: UserType,
  description: 'Get currently logged in user information',
  resolve: userResolver,
};

module.exports = UserQuery;
