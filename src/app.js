require("dotenv").config();

const Express = require("express");
const path = require("path");
const cors = require("cors");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");

const farAwayRoutes = require("./routes/farAwayRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
require("./db/database.js"); // database connection instance
const { bearerAuthenticator } = require("./utils/bearerStrategy.js");

const app = Express();

// settings
app.set("port", process.env.PORT || 8081);
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

// middlewares
app.use(require("morgan")("dev"));
app.use(cookieParser("secret"));
app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cors({ origin: true, credentials: true }));

// routes
app.get("/", function (req, res) {
  res.render("home.ejs");
});

app.use("/faraway", bearerAuthenticator(), farAwayRoutes);

app.use("/users", userRoutes);

module.exports = app;
