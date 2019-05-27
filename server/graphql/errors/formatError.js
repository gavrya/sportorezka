const errors = require('../errors');

const get = (error, key, value) => error[key] || value;

const formatError = error => ({
  name: get(error, 'name', errors.INTERNAL_SERVER_ERROR.name),
  message: error.message || errors.INTERNAL_SERVER_ERROR.message,
  data: get(error, 'data'),
  path: error.path,
  locations: error.locations,
});

module.exports = formatError;
