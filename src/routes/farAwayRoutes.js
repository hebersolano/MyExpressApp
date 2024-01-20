const { Router } = require("express");
const router = Router({ mergeParams: true });

const mongoose = require("mongoose");
const ItemsModel = require("../models/farAwayModel.js");

router.route("/").get(async function (req, res) {
  // const myItem = new ItemsModel({ itemId: "thisIs", description: "some description", quantity: 11, completed: false });
  // console.log(myItem);
  // await myItem.save();
  res.send(await ItemsModel.find({}));
});

module.exports = router;
