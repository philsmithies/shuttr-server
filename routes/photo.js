app.get("/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder: cyber_photos")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  // gets a array response of all the public ids we can use to put on the page
  res.send(publicIds);
});

app.post("/upload", async (req, res) => {
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
});

app.get("/photos", function (req, res) {
  Photo.find({}, function (err, photos) {
    const photoMap = [];
    photos.forEach(function (photo) {
      photoMap.push(photo);
    });
    res.send(photoMap);
  });
});

app.get("/getLatest", async (req, res) => {
  const getPhoto = await Photo.findOne().sort({ _id: -1 });
  res.json(getPhoto.imageUrl);
});
