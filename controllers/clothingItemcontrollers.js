const ClothingItem = require("../models/clothingItem");
const { GOOD_REQUEST_STATUS_CODE } = require("../utils/errors");
const { BAD_REQUEST_STATUS_CODE } = require("../utils/errors");
const { NOT_FOUND_STATUS_CODE } = require("../utils/errors");
const { INTERNAL_SERVER_ERROR_STATUS_CODE } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, ImageUrl } = req.body;

  ClothingItem.create({ name, weather, ImageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Error creating item" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => {
      res.status(GOOD_REQUEST_STATUS_CODE).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      if (e.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Unable to like the item" });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => {
      res.status(GOOD_REQUEST_STATUS_CODE).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      if (e.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Unable to unlike the item" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(GOOD_REQUEST_STATUS_CODE).send(items))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Unable to get the item" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => res.status(GOOD_REQUEST_STATUS_CODE).send(item))
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND_STATUS_CODE)
          .send({ message: "Item not found" });
      }
      if (e.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS_CODE)
        .send({ message: "Unable to delete the item" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
