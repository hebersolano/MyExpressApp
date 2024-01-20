const Express = require("express");
const path = require("path");

const passport = require("passport");
const Strategy = require("passport-http-bearer").Strategy;

const mongoose = require("mongoose");
const UserModel = require("./src/models/userModel");
mongoose.connect("mongodb://127.0.0.1:27017/api-rest");

const ejsMate = require("ejs-mate");

passport.use(
  new Strategy(function (token, cb) {
    process.nextTick(async function () {
      try {
        const user = await UserModel.findOne({ token });
        if (!user) return cb(null, false);
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    });
  })
);

const app = Express();
app.use(require("morgan")("dev"));
app.set("views", path.join(__dirname, "/src/views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home.ejs");
});

app.get("/users", passport.authenticate("bearer", { session: false }), function (req, res) {
  res.json(req.user);
});

// Routes
const farAwayRoutes = require("./src/routes/farAwayRoutes.js");

// app.get("/", function (req, res) {
//   res.send("Hello word");
// });

app.use("/faraway", farAwayRoutes);

app.listen(3030, function () {
  console.log("Listening http://localhost:3030/");
});
