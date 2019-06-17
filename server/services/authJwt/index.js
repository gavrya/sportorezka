const ServerError = require('../../graphql/errors/serverError');
const {
  Unauthorized,
  InvalidJwtToken,
  ExpiredJwtToken,
} = require('../../graphql/errors');

const checkAuthJwt = (authJwt) => {
  if (!authJwt) {
    throw new ServerError(Unauthorized);
  }

  if (!authJwt.isValid) {
    throw new ServerError(InvalidJwtToken);
  }

  if (authJwt.isExpired) {
    throw new ServerError(ExpiredJwtToken);
  }
};

module.exports = checkAuthJwt;
