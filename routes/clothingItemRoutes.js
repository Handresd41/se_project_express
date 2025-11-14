const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItemcontrollers");
const { auth } = require("../middlewares/auth");
const {
  validateItemBody,
  validateItemId,
} = require("../middlewares/validation");

router.use(auth);

router.get("/", getItems);
router.post("/", validateItemBody, createItem);

router.delete("/:itemId", validateItemId, deleteItem);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, unlikeItem);

module.exports = router;
