// pulls in the express library
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const AuthControls = require("./controllers/authController");
const PhotoControls = require("./controllers/photoController");
const UserControls = require("./controllers/userController");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

mongoose.connect(
  "mongodb+srv://admin:adminpassword@cluster0.xu6qx.mongodb.net/cyberPlayground?retryWrites=true&w=majority",
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
let server = require("http").Server(app);

// middleware
app.use(express.json()); // =>  allows us to read the request or req body
app.use(
  cors({
    credentials: true,
    origin: "https://shuttr-fe.vercel.app" || "http://localhost:3000",
  })
);
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//------------------------END OF MIDDLEWARE----------------------------
// define what localhost port we want our server to run on
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});

app.get("/", (req, res) => {
  res.send("Shuttr Server");
});

app.post("/api/photos/upload", PhotoControls.upload);
app.get("/api/photos/all", PhotoControls.all);
app.get("/api/photos/getLatest", PhotoControls.getLatest);

app.post("/api/signup", AuthControls.signup);
app.get("/api/logout", AuthControls.logout);
app.get("/user", AuthControls.user);

app.get("/api/user/:username", UserControls.username);
app.get("/api/users", UserControls.users);

app.post("/api/login", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, "secretpassword");
  response.setHeader("Access-Control-Allow-Headers", "Authorization");

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});
