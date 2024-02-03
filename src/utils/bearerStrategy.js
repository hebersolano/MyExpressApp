const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const UserModel = require("../models/userModel");

const bearerStrategy = new BearerStrategy(function (token, callback) {
  process.nextTick(async function () {
    try {
      console.log(token);
      const user = await UserModel.findOne({ token });
      if (!user) return callback(null, false);
      return callback(null, user);
    } catch (err) {
      return callback(err);
    }
  });
});

passport.use(bearerStrategy);

const bearerAuthenticator = function (req, res, next) {
  return passport.authenticate("bearer", { session: false });
};

module.exports = {
  bearerStrategy,
  bearerAuthenticator,
};
