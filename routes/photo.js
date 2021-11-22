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
