import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../utils/errors";

const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  INTERNAL_SERVER_ERROR_STATUS_CODE,
} = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((e) => {
      if (e.name === "ValidationError" || e.name === "CastError") {
        next(new BadRequestError("Invalid data provided for creating item"));
        return;
      }
      next(e);
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
        return;
      }
      if (e.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
        return;
      }
      next(e);
    });
};

const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
        return;
      }
      if (e.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
        return;
      }
      next(e);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      next(e);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        next(
          new ForbiddenError("You do not have permission to delete this item")
        );
        return Promise.reject();
      }
      return ClothingItem.deleteOne({ _id: itemId });
    })
    .then(() => {
      res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((e) => {
      if (!e) return;
      if (e instanceof NotFoundError) {
        next(e);
        return;
      }
      if (e.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
        return;
      }
      next(e);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
