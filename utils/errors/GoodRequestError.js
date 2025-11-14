class GoodRequestError extends Error {
  constructor(message = "OK") {
    super(message);
    this.statusCode = 200;
    this.name = "GoodRequestError";
  }
}

module.exports = GoodRequestError;
