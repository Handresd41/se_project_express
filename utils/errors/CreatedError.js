class CreatedError extends Error {
  constructor(message = "Created") {
    super(message);
    this.statusCode = 201;
    this.name = "CreatedError";
  }
}

module.exports = CreatedError;
