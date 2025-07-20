const router = require("express").Router();
const {
  createUser,
  getUser,
  updateCurrentUser,
} = require("../controllers/userscontrollers");

router.get("/me", getUser);
router.post("/", createUser);
router.patch("/", updateCurrentUser);

module.exports = router;
