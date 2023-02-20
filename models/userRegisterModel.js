const mongoose = require("mongoose");

const RegisterSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    gender: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("register", RegisterSchema);

module.exports = {
  UserModel,
};
