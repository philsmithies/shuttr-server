// pulls in the express library
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthControls = require("./controllers/authController");
const PhotoControls = require("./controllers/photoController");
const UserControls = require("./controllers/userController");

require("dotenv").config();

mongoose.connect(
  process.env.databaseURL,
  {
    useNewUrlParser: true,
    // userNewParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose is Connected");
  }
);

// allows us to write app and the crud action we want ex. app.get | app.post | app.delete etc...
const app = express();

// middleware
app.use(express.json()); // =>  allows us to read the request or req body
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passportConfig")(passport);

//------------------------END OF MIDDLEWARE----------------------------
// define what localhost port we want our server to run on
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

app.use(express.static("public"));

app.post("/photos/upload", PhotoControls.upload);
app.get("/photos/all", PhotoControls.all);
app.get("/photos/getLatest", PhotoControls.getLatest);

app.post("/signup", AuthControls.signup);
app.get("/logout", AuthControls.logout);
app.get("/user", AuthControls.user);

app.get("/user/:username", UserControls.username);

app.post("/login", (req, res, next) => {
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
});

// react router redirects for netlify or heroku hosting, catches and redirects to index.html
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
