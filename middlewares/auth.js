const jwt = require("jsonwebtoken");
const {
  INTERNAL_SERVER_ERROR_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .send({ message: "Authorization required" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  if (!token) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .send({ message: "Authorization required" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res
        .status(UNAUTHORIZED_STATUS_CODE)
        .send({ message: "Invalid token" });
    }
    if (err.name === "TokenExpiredError") {
      return res
        .status(UNAUTHORIZED_STATUS_CODE)
        .send({ message: "Token expired" });
    }
    return res
      .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
      .send({ message: "An error occurred while verifying the token" });
  }
};

module.exports = { auth };
