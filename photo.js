const mongoose = require("mongoose");
const photo = new mongoose.Schema({
  photo_id: String,
  caption: String,
  location: String, 
  hashtag: String, 
  publicId: String,
  location: String, 
  coordinates: Object
});
module.exports = mongoose.model("Photo", photo);