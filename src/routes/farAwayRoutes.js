const { Router } = require("express");
const router = Router({ mergeParams: true });

const ItemsModel = require("../models/farAwayModel.js");
const userModel = require("../models/userModel.js");

router
  .route("/")
  .get(async function (req, res) {
    console.log(req.user._id);
    const data = await ItemsModel.findOne({ author: req.user._id });
    res.send(data.items);
  })
  .post(async function (req, res) {
    try {
      console.log("params:", req.params);
      console.log("body:", req.body);
      console.log("query:", req.query);
      console.log("user:", req.user);

      const data = await ItemsModel.findOne({ author: req.user._id });
      if (!data) {
        const myItem = new ItemsModel({
          author: req.user._id,
          items: req.body,
        });
        await myItem.save();
      } else {
        data.items = req.body;
        await data.save();
      }
      // await ItemsModel.findByIdAndUpdate(
      //   { author: "65b404a3867f53112cf29341" },
      //   { items: req.body },
      //   { returnDocument: "after", upsert: true }
      // );

      // res.send(await ItemsModel.find({ author: req.user.username }));
      res.send("test");
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;
