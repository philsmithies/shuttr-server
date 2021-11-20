// The req.user stores the entire user that has been authenticated inside of it.
app.get("/user", (req, res) => {
  res.send(req.user);
});

// app.get("/userl", function (req, res) {
//   User.find({}, function (err, users) {
//     const userMap = {};
//     users.forEach(function (user) {
//       userMap[user] = user;
//     });
//     res.send(userMap);
//   });
// });

app.get("/user/username/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(404).send();
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});
