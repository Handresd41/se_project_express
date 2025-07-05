const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItemcontrollers");

// CRUD

// Create
router.post("/", createItem);

// READ
router.get("/", getItems);

// Like
router.post("/:itemId/like", likeItem);

// Delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/unlike", unlikeItem);

module.exports = router;
