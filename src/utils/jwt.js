require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

function createJwtCookie(req, res, next) {
  try {
    const { username } = req.body;
    const token = generateAccessToken(username);
    res.cookie("token", token, {
      maxAge: 10000,
      // httpOnly: true,
      // secure: true,
      // signed: true
    });
    next();
  } catch (error) {
    console.log(error);
  }
}

function checkJwtCookie(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) res.redirect("/login");
    const { username } = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (e) {
    res.clearCookie("token");
    res.redirect("/login");
  }
}

module.exports = { generateAccessToken, createJwtCookie };

// console.log(generateAccessToken("hebersolano1@gmail.com"));
