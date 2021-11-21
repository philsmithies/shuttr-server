let Photo = require("../models/photo.js");

let PhotoController = {
  upload: (req, res) => {
    res.send(req.user);
    try {
      const newPhoto = new Photo({
        publicId: req.body.imageUrl,
        hashtag: req.body.hashtag,
        caption: req.body.caption,
        location: req.body.location,
        description: req.body.description,
        coordinates: req.body.coordinates,
        author: req.user.username,
      });
      console.log(req.user.images);
      req.user.images << newPhoto;
      await newPhoto.save();
      res.json(newPhoto.imageUrl);
    } catch (err) {
      console.error("Something went wrong", err);
    }
  },
  all: (req, res, next) => {
    Photo.find({}, function (err, photos) {
      const photoMap = [];
      photos.forEach(function (photo) {
        photoMap.push(photo);
      });
      res.send(photoMap);
    });
  },
  getLatest: (req, res) => {
    const getPhoto = await Photo.findOne().sort({ _id: -1 });
    res.json(getPhoto.imageUrl);
  },
};

module.exports = PhotoController;
