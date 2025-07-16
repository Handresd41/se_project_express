const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
  updateCurrentUser,
} = require("../controllers/userscontrollers");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.patch("/me", updateCurrentUser);

module.exports = router;
