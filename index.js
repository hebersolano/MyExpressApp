const Express = require("express");
const path = require("path");

const { bearerAuthenticator } = require("./src/utils/bearerStrategy.js");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/api-rest");

const ejsMate = require("ejs-mate");

const app = Express();
app.use(require("morgan")("dev"));
app.set("views", path.join(__dirname, "/src/views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home.ejs");
});

// app.get("/users", passport.authenticate("bearer", { session: false }), function (req, res) {
//   res.json(req.user);
// });

// Routes
const farAwayRoutes = require("./src/routes/farAwayRoutes.js");
app.use("/faraway", bearerAuthenticator(), farAwayRoutes);

const userRoutes = require("./src/routes/userRoutes.js");
app.use("/users", userRoutes);

app.listen(3030, function () {
  console.log("Listening http://localhost:3030/");
});
