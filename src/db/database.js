const { default: mongoose, connection } = require("mongoose");
const MONGO_UR = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/temp";

mongoose.connect(MONGO_UR).catch(function (e) {
  console.log("DB connection error:", e);
});

connection.once("open", function () {
  console.log("DB connection open");
});
