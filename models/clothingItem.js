const mongoose = require("mongoose");
const validate = require("validator");

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  ImageURL: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validate.isURL(v),
      message: "Link is not Valid",
    },
  },
});

module.exports = mongoose.model("item", clothingItemSchema);
