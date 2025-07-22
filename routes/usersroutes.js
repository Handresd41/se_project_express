const router = require("express").Router();
const {
  getUser,
  updateCurrentUser,
} = require("../controllers/userscontrollers");
const { auth } = require("../middlewares/auth");

router.use(auth);

router.get("/", getUser);
router.patch("/", updateCurrentUser);

module.exports = router;
