const router = require("express").Router();
const {
  createUser,
  getUser,
  updateCurrentUser,
} = require("../controllers/userscontrollers");

router.get("/", getUser);
router.post("/", createUser);
router.patch("/", updateCurrentUser);

module.exports = router;
