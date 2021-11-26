const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const cookieParser = require("cookie-parser");

// create a user
let AuthController = {
  signup: (req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          publicId: req.body.publicId,
          job: req.body.job,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  },
  logout: (req, res) => {
    req.logout();
    res.send("success");
  },
  user: (req, res) => {
    console.log(req.user);
    res.send(req.user);
  },
};

module.exports = AuthController;
