/* eslint-disable no-console */
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const routes = require("./routes/indexroutes");
const errorHandler = require("./middlewares/error-handler");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(cors());
app.use(express.json());

// request logger must run before routes
app.use(requestLogger);

// mount routes
app.use(routes);

// error logger after routes
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
