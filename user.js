const mongoose = require("mongoose");

const uniqueValidator = require('mongoose-unique-validator');
const user = new mongoose.Schema({
  name:{ type: String, required: true},
  username: {type: String, unique: true,required:true},
  password: {type: String, required: true},
  email: {type: String, unique: true,required:true},
  
});
user.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique'})
=======
const user = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model("User", user);