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
};

module.exports = errors;
