const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const jwt = require("jsonwebtoken");

const token = jwt.sign({ _id: "user_id" }, JWT_SECRET, {
  expiresIn: "7d",
});

module.exports = {
  JWT_SECRET,
  token,
};
