const ItemsModel = require("../models/farAwayModel.js");

const farAwayCtrl = {};

farAwayCtrl.getItems = async function (req, res) {
  const data = await ItemsModel.findOne({ author: req.user._id });
  if (!data) res.send([]);
  else res.send(data?.items);
};

farAwayCtrl.saveItems = async function (req, res) {
  try {
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
    res.status(201).send("accepted");
  } catch (error) {
    console.error(error);
  }
};

module.exports = farAwayCtrl;
