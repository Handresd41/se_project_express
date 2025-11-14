const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
const BAD_REQUEST_STATUS_CODE = 400;
const UNAUTHORIZED_STATUS_CODE = 401;
const FORBIDDEN_STATUS_CODE = 403;
const NOT_FOUND_STATUS_CODE = 404;
const CONFLICT_STATUS_CODE = 409;
const GOOD_REQUEST_STATUS_CODE = 200;
const CREATED_STATUS_CODE = 201;

const BadRequestError = require("./errors/BadRequestError");
const UnauthorizedError = require("./errors/UnauthorizedError");
const ForbiddenError = require("./errors/ForbiddenError");
const NotFoundError = require("./errors/NotFoundError");
const ConflictError = require("./errors/ConflictError");

// moved these classes to separate files
const CreatedError = require("./errors/CreatedError");
const GoodRequestError = require("./errors/GoodRequestError");

module.exports = {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  GOOD_REQUEST_STATUS_CODE,
  CREATED_STATUS_CODE,
  CreatedError,
  GoodRequestError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
