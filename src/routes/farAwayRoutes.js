const { Router } = require("express");
const router = Router({ mergeParams: true });

const ItemsModel = require("../models/farAwayModel.js");

router
  .route("/")
  .get(async function (req, res) {
    console.log(req.user._id);
    const data = await ItemsModel.findOne({ author: req.user._id });
    if (!data) res.send([]);
    else res.send(data?.items);
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
        console.log(data.items);
        data.items = req.body;
        await data.save();
      }
      res.status(201).send("accepted");
    } catch (error) {
      console.error(error);
    }
  });

module.exports = router;
