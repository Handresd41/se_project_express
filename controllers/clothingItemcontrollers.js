const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require("../utils/errors");

// createItem
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send({ data: item }))
    .catch((e) => {
      if (e.name === "ValidationError" || e.name === "CastError") {
        next(new BadRequestError("Invalid data provided for creating item"));
        return;
      }
      next(e);
    });
};

// likeItem
const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
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

// unlikeItem
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
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

// getItems
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((e) => next(e));
};

// deleteItem
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
        return Promise.reject(); // stop chain
      }
      return ClothingItem.deleteOne({ _id: itemId });
    })
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((e) => {
      if (!e) return;
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
