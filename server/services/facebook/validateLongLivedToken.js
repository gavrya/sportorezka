/**
 {
   "access_token": "value",
   "token_type": "bearer",
   "expires_in": 5183968
 }
 * */

const validateLongLivedToken = async (tokenInfo) => {
  const errors = [];

  if (typeof tokenInfo !== 'object') {
    errors.push('Invalid long lived token info');

    return errors;
  }

  if (!tokenInfo.access_token) {
    errors.push('Invalid long lived access token');
  }

  return errors;
};

module.exports = validateLongLivedToken;
