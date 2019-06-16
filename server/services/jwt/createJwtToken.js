const config = require('config');
const jwt = require('jsonwebtoken');

const createJwtToken = (userId) => {
  const { secret, expiresDays } = config.jwt;

  const payload = {
    sub: userId,
    iat: Date.now(),
    exp: Date.now() + (expiresDays * 86400000),
  };

  const token = jwt.sign(payload, secret);

  return token;
};

module.exports = createJwtToken;
