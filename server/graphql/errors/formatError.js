const { InternalServerError } = require('../errors');

const getParam = (error, key, value) => (error.originalError && error.originalError[key]) || value;

const formatError = error => ({
  type: getParam(error, 'type', InternalServerError.type),
  message: getParam(error, 'message', InternalServerError.message),
  data: getParam(error, 'data'),
  path: error.path,
});

module.exports = formatError;
