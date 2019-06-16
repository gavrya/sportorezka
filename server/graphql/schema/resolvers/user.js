const { getUserById } = require('../../../services/user');
const { Unauthorized } = require('../../../graphql/errors');
const ServerError = require('../../../graphql/errors/serverError');

const userResolver = async (parent, args, ctx) => {
  const { authUser } = ctx;

  if (!authUser) {
    throw new ServerError(Unauthorized);
  }

  const user = await getUserById(authUser.id);

  return user.toJSON();
};

module.exports = userResolver;
