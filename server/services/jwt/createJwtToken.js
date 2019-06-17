const config = require('config');
const jwt = require('jsonwebtoken');

const createJwtToken = (payload) => {
  const { secret, expiresInDays } = config.jwt;

  const token = jwt.sign(payload, secret, { expiresIn: `${expiresInDays} days` });

  return token;
};

module.exports = createJwtToken;
