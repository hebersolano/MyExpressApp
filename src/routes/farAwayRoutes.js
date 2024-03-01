const { Router } = require("express");
const router = Router({ mergeParams: true });
const { getItems, saveItems } = require("../controllers/farAwayCtrl.js");

const ItemsModel = require("../models/farAwayModel.js");

router.route("/").get(reqLogTest, getItems).post(reqLogTest, saveItems);

module.exports = router;

function reqLogTest(req, res, next) {
  console.log("user:", req.user);
  console.log("params:", req.params);
  console.log("query:", req.query);
  console.log("body:", req.body);
  next();
}
