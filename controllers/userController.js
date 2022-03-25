const User = require("../models/user");

let UserController = {
  username: (req, res) => {
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
