const User = require("../models/user");
const GOOD_REQUEST_STATUS_CODE =
  require("../utils/errors").GOOD_REQUEST_STATUS_CODE;
const CREATED_STATUS_CODE = require("../utils/errors").CREATED_STATUS_CODE;
const BAD_REQUEST_STATUS_CODE =
  require("../utils/errors").BAD_REQUEST_STATUS_CODE;
const NOT_FOUND_STATUS_CODE = require("../utils/errors").NOT_FOUND_STATUS_CODE;
const INTERNAL_SERVER_ERROR_STATUS_CODE =
  require("../utils/errors").INTERNAL_SERVER_ERROR_STATUS_CODE;

//GET /users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(GOOD_REQUEST_STATUS_CODE).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: err.message });
    });
};
//POST /users
const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(CREATED_STATUS_CODE).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: err.message });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(GOOD_REQUEST_STATUS_CODE).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "User not found" });
      } else if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
