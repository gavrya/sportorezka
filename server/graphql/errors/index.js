const errors = {
  INTERNAL_SERVER_ERROR: {
    type: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  },
  BAD_REQUEST: {
    type: 'BAD_REQUEST',
    message: 'Bad request',
  },
  UNAUTHORIZED: {
    type: 'UNAUTHORIZED',
    message: 'Unauthorized request',
  },
};

module.exports = errors;
