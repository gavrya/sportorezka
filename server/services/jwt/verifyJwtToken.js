const config = require('config');
const jwt = require('jsonwebtoken');

const verifyJwtToken = (jwtToken) => {
  const { secret } = config.jwt;

  const decoded = jwt.verify(jwtToken, secret);

  if (decoded.exp <= Date.now()) {
    throw new Error('JWT token expires');
  }

  return decoded;
};

module.exports = verifyJwtToken;
