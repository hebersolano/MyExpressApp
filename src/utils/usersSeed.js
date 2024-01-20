const mongoose = require("mongoose");
const UserModel = require("../models/userModel");

mongoose.connect("mongodb://127.0.0.1:27017/api-rest");

var records = [
  { id: 1, username: "jack", token: "123456789", displayName: "Jack", emails: [{ value: "jack@example.com" }] },
  { id: 2, username: "jill", token: "abcdefghi", displayName: "Jill", emails: [{ value: "jill@example.com" }] },
];

async function dbSeed() {
  for (const record of records) {
    const user = new UserModel({ username: record.username, token: record.token, email: record.emails[0].value });
    await user.save();
  }
}

dbSeed();
