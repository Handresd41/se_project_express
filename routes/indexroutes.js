const router = require("express").Router();
const clothingItem = require("./clothingItemRoutes");
const userRouter = require("./usersroutes");
const { login, createUser } = require("../controllers/userscontrollers");
const { NotFoundError } = require("../utils/errors");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");

router.use("/items", clothingItem);

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);

router.use("/users/me", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("The requested resource was not found"));
});

module.exports = router;
