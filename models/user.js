

const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator');
const user = new mongoose.Schema({
  name:{ type: String, required: true},
  username: {type: String, unique: true,required:true},
  password: {type: String, required: true},
  email: {type: String, unique: true,required:true},
  images: [{type: mongoose.Schema.Types.ObjectId, ref:"Photo"}],
  publicId: String, 
  job:{ type: String, required: true},
  
});
user.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique'})

module.exports = mongoose.model("User", user);