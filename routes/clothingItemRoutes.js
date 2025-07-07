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
router.put("/:itemId/likes", likeItem);

// Delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
