const mongoose = require("mongoose");
const photo = new mongoose.Schema({
  photo_id: String,
  caption: String,
  hashtag: String, 
  publicId: String
});
module.exports = mongoose.model("Photo", photo);