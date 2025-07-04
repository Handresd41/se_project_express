const router = require("express").Router();
const clothingItem = require("./clothingItemRoutes");
const userRouter = require("./usersroutes");

router.use("/users", userRouter);
router.use("/items", clothingItem);

router.use((req, res) => {
  res.status(500).send({ message: "Router Not Found" });
});

module.exports = router;
