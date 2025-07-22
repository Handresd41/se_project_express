const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItemcontrollers");

// CRUD

router.get("/", getItems);

router.use(auth);

// Create
router.post("/", createItem);

// Like
router.put("/:itemId/likes", likeItem);

// Delete
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
