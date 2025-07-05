const router = require("express").Router();
const clothingItem = require("./clothingItemRoutes");
const userRouter = require("./usersroutes");
const NOT_FOUND_STATUS_CODE = require("../utils/errors").NOT_FOUND_STATUS_CODE;

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(NOT_FOUND_STATUS_CODE).send({ message: "Page not found" });
});

module.exports = router;
