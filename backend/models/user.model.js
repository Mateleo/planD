const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  username: {type:String, required:true},
//   email: {type:String, required:true, unique:true},
  avatar: {type:String, required:true},
});

module.exports = mongoose.model("User", UserSchema);
