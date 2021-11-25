let User = require("../models/user.js");
const passport = require("passport");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

require("../utils/passportConfig")(passport);

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
  login: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
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
