const { Router } = require("express");
const router = Router({ mergeParams: true });

const userModel = require("../models/userModel.js");

router.route("/").post(async function (req, res) {
  try {
    const { username, email, password } = req.body;
    const user = new userModel({ username, email, token: password });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
