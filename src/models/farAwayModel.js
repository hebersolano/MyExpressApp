const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemsSchema = new mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      order: Number,
      description: String,
      quantity: Number,
      completed: Boolean,
    },
  ],
});

module.exports = mongoose.model("Items", ItemsSchema);
