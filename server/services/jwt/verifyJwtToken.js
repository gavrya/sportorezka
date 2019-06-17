const config = require('config');
const jwt = require('jsonwebtoken');

const verifyJwtToken = (jwtToken) => {
  const { secret } = config.jwt;

  let isValid = true;
  let isExpired = false;
  let payload = null;

  try {
    payload = jwt.verify(jwtToken, secret);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      isExpired = true;
    } else {
      isValid = false;
    }
  }

  return {
    isValid,
    isExpired,
    payload,
  };
};

module.exports = verifyJwtToken;
