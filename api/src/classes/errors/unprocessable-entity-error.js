class UnprocessableEntityError extends Error {
  constructor(message) {
    super(message);
    this.status = 422;
  }
}

module.exports = UnprocessableEntityError;
