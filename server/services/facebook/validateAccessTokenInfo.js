const config = require('config');

/**
 {
   "app_id": "value",
   "type": "USER",
   "application": "value",
   "data_access_expires_at": 1568310475,
   "expires_at": 1560538800,
   "is_valid": true,
   "scopes": [
     "user_location",
     "user_gender",
     "user_link",
     "user_age_range",
     "email",
     "public_profile"
   ],
   "user_id": "value"
 }
 * */

const requiredFields = [
  'app_id',
  'type',
  'is_valid',
  'scopes',
  'user_id',
];

const requiredScopes = [
  'public_profile',
  'email',
];

const validateAccessTokenInfo = async (accessTokenInfo) => {
  const errors = [];

  if (typeof accessTokenInfo !== 'object') {
    errors.push('Invalid access token info');

    return errors;
  }

  if (requiredFields.some(field => !(field in accessTokenInfo))) {
    errors.push('Invalid access token fields');

    return errors;
  }

  const {
    app_id: appId,
    type,
    is_valid: isValid,
    scopes,
    user_id: userId,
  } = accessTokenInfo;

  const facebookAppId = config.facebook.appId;

  if (appId.toString() !== facebookAppId.toString()) {
    errors.push(`Invalid facebook app id: ${appId} !== ${facebookAppId}`);
  }

  if (type !== 'USER') {
    errors.push(`Invalid facebook user type: ${type} !== USER`);
  }

  if (!isValid) {
    errors.push('Invalid facebook access token');
  }

  if (!Array.isArray(scopes)) {
    errors.push('Invalid facebook user scopes');
  }

  if (requiredScopes.some(requiredScope => !scopes.includes(requiredScope))) {
    errors.push(`Invalid facebook user scopes: ${scopes.join(',')}`);
  }

  if (typeof userId !== 'string' || userId.length === 0) {
    errors.push('Invalid facebook user id');
  }

  return errors;
};

module.exports = validateAccessTokenInfo;
