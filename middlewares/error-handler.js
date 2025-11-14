const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  console.error(err);

  const statusCode =
    err.statusCode || err.status || INTERNAL_SERVER_ERROR_STATUS_CODE;
  const message =
    statusCode === INTERNAL_SERVER_ERROR_STATUS_CODE
      ? "An internal server error occurred"
      : err.message;

  res.status(statusCode).send({ message });
};
