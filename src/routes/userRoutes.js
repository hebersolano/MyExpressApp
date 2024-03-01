const { Router } = require("express");
const router = Router({ mergeParams: true });

const { getForm, newUser, getKey } = require("../controllers/users.controller.js");
const { SetJwtCookie } = require("../utils/jwt.js");

router.route("/").get(getForm).post(SetJwtCookie, newUser);

router.route("/key").get(getKey);

module.exports = router;
