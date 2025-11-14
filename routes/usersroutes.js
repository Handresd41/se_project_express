const router = require("express").Router();
const {
  getUser,
  updateCurrentUser,
} = require("../controllers/userscontrollers");
const { auth } = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

router.use(auth);

router.get("/", getUser);
router.patch("/", validateUserUpdate, updateCurrentUser);

module.exports = router;
