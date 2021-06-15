const mongoose = require("mongoose");
const photo = new mongoose.Schema({
  photo_id: String,
  caption: String,
  location: String, 
  hashtag: String, 
  publicId: String,
  location: String, 
  description: String, 
  coordinates: Object,
  author: {type: mongoose.Types, ref:'User'},
});
module.exports = mongoose.model("Photo", photo);