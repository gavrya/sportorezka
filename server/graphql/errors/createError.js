const createError = (error, message, data) => ({
  name: error.name,
  message: message || error.message,
  data,
});

module.exports = createError;
