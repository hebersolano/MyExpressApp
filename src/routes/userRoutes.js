const { Router } = require("express");
const router = Router({ mergeParams: true });

const userModel = require("../models/userModel.js");

const generator = require("generate-password");

router
  .route("/")
  .get(function (req, res) {
    res.render("register.ejs");
  })
  .post(async function (req, res) {
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
  });

router.route("/key").get(function (req, res) {
  res.render("apiKey.ejs", { token: req.app.locals.token });
  delete req.app.locals.token;
});

module.exports = router;
