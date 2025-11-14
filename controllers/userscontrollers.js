const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  GOOD_REQUEST_STATUS_CODE,
  CREATED_STATUS_CODE,
} = require("../utils/errors");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError("Email and password are required"));
    return;
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(GOOD_REQUEST_STATUS_CODE).send({ token });
    })
    .catch((err) => {
      if (err && err.message === "Invalid email or password") {
        next(new UnauthorizedError("Invalid email or password"));
        return;
      }
      next(err);
    });
};

// POST /users
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.create({ name, avatar, email, password })
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
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
      if (err && err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      if (err && err.code === 11000) {
        next(new ConflictError("Email already exists"));
        return;
      }
      next(err);
    });
};

const updateCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError("User not found");
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
      if (err && err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
        return;
      }
      next(err);
    });
};

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError("User not found");
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
      next(err);
    });
};

module.exports = { createUser, updateCurrentUser, login, getUser };
