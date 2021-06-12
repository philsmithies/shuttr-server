const mongoose = require("mongoose");
const user = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  
});
module.exports = mongoose.model("User", user);