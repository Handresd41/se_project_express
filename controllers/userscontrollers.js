const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED_STATUS_CODE } = require("../utils/errors");
const { GOOD_REQUEST_STATUS_CODE } = require("../utils/errors");
const { CREATED_STATUS_CODE } = require("../utils/errors");
const { BAD_REQUEST_STATUS_CODE } = require("../utils/errors");
const { NOT_FOUND_STATUS_CODE } = require("../utils/errors");
const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require("../utils/errors");
const { CONFLICT_STATUS_CODE } = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST_STATUS_CODE)
      .send({ message: "Email and password are required" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(GOOD_REQUEST_STATUS_CODE).send({
        token,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Invalid email or password") {
        return res
          .status(UNAUTHORIZED_STATUS_CODE)
          .send({ message: "Invalid email or password" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

// POST /users
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password; // Remove password from the response
      return res.status(CREATED_STATUS_CODE).send({
        data: {
          _id: userObj._id,
          name: userObj.name,
          avatar: userObj.avatar,
          email: userObj.email,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data" });
      }
      if (err.code === 11000) {
        return res
          .status(CONFLICT_STATUS_CODE)
          .send({ message: "Email already exists" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Invalid data" });
    });
};

const updateCurrentUser = (req, res) => {
  const { _id } = req.user;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      res.status(NOT_FOUND_STATUS_CODE).send({ message: "User not found" });
    })
    .then((user) => {
      res.status(GOOD_REQUEST_STATUS_CODE).send({
        data: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      res.status(NOT_FOUND_STATUS_CODE).send({ message: "User not found" });
    })
    .then((user) => {
      res.status(GOOD_REQUEST_STATUS_CODE).send({
        data: {
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { createUser, updateCurrentUser, login, getUser };
