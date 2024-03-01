require("dotenv").config();
const generator = require("generate-password");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const usersCtrl = {};

usersCtrl.getForm = function (req, res) {
  res.render("register.ejs");
};

usersCtrl.newUser = async function (req, res) {
  try {
    const { username, email, password } = req.body;
    const token = generator.generate({
      length: 25,
      numbers: true,
    });

    const user = new userModel({ username, email, token });
    await user.save();
    req.app.locals.token = token;
    res.redirect("/users/key");
  } catch (error) {
    console.log(error);
  }
};

usersCtrl.getKey = function (req, res) {
  res.render("apiKey.ejs", { token: req.app.locals.token });
  delete req.app.locals.token;
};

module.exports = usersCtrl;
