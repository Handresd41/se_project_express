const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    next(new UnauthorizedError("Authorization required"));
    return;
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  if (!token) {
    next(new UnauthorizedError("Authorization required"));
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      next(new UnauthorizedError("Invalid token"));
      return;
    }
    if (err.name === "TokenExpiredError") {
      next(new UnauthorizedError("Token expired"));
      return;
    }
    next(err);
  }
};

module.exports = { auth };
