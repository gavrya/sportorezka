class ServerError extends Error {
  constructor(error, message, data) {
    const errorMessage = message || error.message;

    super(errorMessage);

    this.name = this.constructor.name;
    this.type = error.type;
    this.message = errorMessage;
    this.data = data;
  }
}

module.exports = ServerError;
