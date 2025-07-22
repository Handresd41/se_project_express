const router = require("express").Router();
const clothingItem = require("./clothingItemRoutes");
const userRouter = require("./usersroutes");
const { login, createUser } = require("../controllers/userscontrollers");
const { NOT_FOUND_STATUS_CODE } = require("../utils/errors");

router.use("/items", clothingItem);

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users/me", userRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send({ message: "The requested resource was not found" });
});

module.exports = router;
