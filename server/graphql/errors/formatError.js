const errors = require('../errors');

const getParam = (error, key, value) => (error.originalError && error.originalError[key]) || value;

const formatError = error => ({
  type: getParam(error, 'type', errors.INTERNAL_SERVER_ERROR.type),
  message: getParam(error, 'message', errors.INTERNAL_SERVER_ERROR.message),
  data: getParam(error, 'data'),
  path: error.path,
});

module.exports = formatError;
