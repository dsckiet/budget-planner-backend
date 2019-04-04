const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  name: String
});

module.exports = User = mongoose.model("User", UserSchema);
