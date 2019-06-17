const errors = {
  InternalServerError: {
    type: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  },
  BadRequest: {
    type: 'BAD_REQUEST',
    message: 'Bad request',
  },
  Unauthorized: {
    type: 'UNAUTHORIZED',
    message: 'Unauthorized request',
  },
  InvalidJwtToken: {
    type: 'INVALID_JWT_TOKEN',
    message: 'Invalid JWT token',
  },
  ExpiredJwtToken: {
    type: 'EXPIRED_JWT_TOKEN',
    message: 'Expired JWT token',
  },
};

module.exports = errors;
