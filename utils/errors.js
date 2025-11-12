const INTERNAL_SERVER_ERROR_STATUS_CODE = 500;
const BAD_REQUEST_STATUS_CODE = 400;
const UNAUTHORIZED_STATUS_CODE = 401;
const FORBIDDEN_STATUS_CODE = 403;
const NOT_FOUND_STATUS_CODE = 404;
const CONFLICT_STATUS_CODE = 409;
const GOOD_REQUEST_STATUS_CODE = 200;
const CREATED_STATUS_CODE = 201;

class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS_CODE;
    this.name = "BadRequestError";
  }
}

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS_CODE;
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.statusCode = FORBIDDEN_STATUS_CODE;
    this.name = "ForbiddenError";
  }
}

class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.statusCode = NOT_FOUND_STATUS_CODE;
    this.name = "NotFoundError";
  }
}

class ConflictError extends Error {
  constructor(message = "Conflict") {
    super(message);
    this.statusCode = CONFLICT_STATUS_CODE;
    this.name = "ConflictError";
  }
}

class CreatedError extends Error {
  constructor(message = "Created") {
    super(message);
    this.statusCode = CREATED_STATUS_CODE;
    this.name = "CreatedError";
  }
}

class GoodRequestError extends Error {
  constructor(message = "OK") {
    super(message);
    this.statusCode = GOOD_REQUEST_STATUS_CODE;
    this.name = "GoodRequestError";
  }
}

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
