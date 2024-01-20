const Express = require("express");

const mongoose = require("mongoose");
const ItemsModel = require("../models/farAwayModel.js");

const router = Express.Router({ mergeParams: true });

router.route("/").get(async function (req, res) {
  // const myItem = new ItemsModel({ itemId: "thisIs", description: "some description", quantity: 11, completed: false });
  // console.log(myItem);
  // await myItem.save();
  res.send(await ItemsModel.find({}));
});

module.exports = router;
