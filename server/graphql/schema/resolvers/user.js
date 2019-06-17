const { getUserById } = require('../../../services/user');
const checkAuthJwt = require('../../../services/authJwt');

const userResolver = async (parent, args, ctx) => {
  const { authJwt } = ctx;

  checkAuthJwt(authJwt);

  const user = await getUserById(authJwt.payload.userId);

  return user.toJSON();
};

module.exports = userResolver;
