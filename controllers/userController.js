let User = require("../models/user.js");

let UserController = {
  id: (req, res) => {
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
  },
};

module.exports = UserController;

// app.get("/userl", function (req, res) {
//   User.find({}, function (err, users) {
//     const userMap = {};
//     users.forEach(function (user) {
//       userMap[user] = user;
//     });
//     res.send(userMap);
//   });
// });
