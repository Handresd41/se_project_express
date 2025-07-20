const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
const jwt = require("jsonwebtoken");

const token = (userId) => jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: "7d" });

module.exports = {
  JWT_SECRET,
  token,
};
