const {
  load,
  fetchAccessTokenInfo,
  fetchUser,
  fetchLongLivedToken,
  validateAccessTokenInfo,
  validateUser,
  validateLongLivedToken,
} = require('../../../services/facebook');

const { loginUser } = require('../../../services/user');
const { BadRequest } = require('../../../graphql/errors');
const { createJwtToken } = require('../../../services/jwt');
const ServerError = require('../../../graphql/errors/serverError');

const loginResolver = async (parent, args) => {
  const { accessToken } = args;

  const facebookData = await Promise.all([
    load(() => fetchAccessTokenInfo(accessToken), validateAccessTokenInfo),
    load(() => fetchUser(accessToken), validateUser),
    load(() => fetchLongLivedToken(accessToken), validateLongLivedToken),
  ]);

  const [
    facebookAccessTokenInfo,
    facebookUser,
    facebookLongLivedToken,
  ] = facebookData;

  if (facebookAccessTokenInfo.errors.length > 0) {
    throw new ServerError(BadRequest, 'Facebook access token info error', facebookAccessTokenInfo.errors);
  }

  if (facebookUser.errors.length > 0) {
    throw new ServerError(BadRequest, 'Facebook user error', facebookUser.errors);
  }

  if (facebookLongLivedToken.errors.length > 0) {
    throw new ServerError(BadRequest, 'Facebook long lived token error', facebookLongLivedToken.errors);
  }

  const userInfo = {
    facebookId: facebookUser.data.id,
    facebookToken: facebookLongLivedToken.data.access_token,
    name: facebookUser.data.name,
    email: facebookUser.data.email,
    avatarUrl: facebookUser.data.picture.data.url,
  };

  const loggedUser = await loginUser(userInfo);

  const payload = {
    userId: loggedUser.get('id'),
  };

  const jwtToken = createJwtToken(payload);

  return {
    jwtToken,
  };
};

module.exports = loginResolver;
