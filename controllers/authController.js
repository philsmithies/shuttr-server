const User = require("../models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

// create a user
let AuthController = {
  signup: async (req, res) => {
    const { username, name, password, email, publicId, job } = req.body;

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

    res.status(201).json(savedUser);
    // User.findOne({ username: req.body.username }, async (err, doc) => {
    //   if (err) throw err;
    //   if (doc) res.send("User Already Exists");
    //   if (!doc) {
    //     const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //     const newUser = new User({
    //       name: req.body.name,
    //       email: req.body.email,
    //       username: req.body.username,
    //       password: hashedPassword,
    //       publicId: req.body.publicId,
    //       job: req.body.job,
    //     });
    //     await newUser.save();
    //     res.send("User Created");
    //     response.status(201).json(savedUser);
    //   }
    // });
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
