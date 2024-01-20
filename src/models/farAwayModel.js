const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  itemId: String,
  description: String,
  quantity: Number,
  completed: Boolean,
});

module.exports = mongoose.model("Items", ItemsSchema);
