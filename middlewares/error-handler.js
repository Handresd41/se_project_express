import {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  CONFLICT_STATUS_CODE,
} from "../utils/errors";

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
