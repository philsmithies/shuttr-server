const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const Photo = require("./models/photo");
const cloudinary = require("./utils/cloudinary");

mongoose.connect(
  "mongodb+srv://admin:adminpassword@cluster0.xu6qx.mongodb.net/cyberPlayground?retryWrites=true&w=majority",
  {
    userNewParser: true,
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

require("./utils/passportConfig")(passport);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

//------------------------END OF MIDDLEWARE----------------------------

// define what localhost port we want our server to run on
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
//-----------------------------------------------------------------------
app.get("/", (req, res) => {
  res.send(`Server is connected on port ${PORT}`);
});
