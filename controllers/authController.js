const User = require("../models/user");
const bcrypt = require("bcrypt");

// create a user
let AuthController = {
  signup: async (req, res) => {
    const { username, name, password, email, publicId, job } = req.body;
    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
          username,
          email,
          name,
          password: passwordHash,
          publicId,
          job,
        });

        const savedUser = await user.save();
        res.send("User Created");
        res.status(201).json(savedUser);
      }
    });
  },
  logout: (_req, res) => {
    res.send("success");
  },
  user: (req, res) => {
    console.log(req.user);
    res.send(req.user);
  },
};

module.exports = AuthController;
