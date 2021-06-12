// pulls in the express library
const express = require('express');
const morgan = require("morgan");
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require("./user");
const app = express();// allows us to write app and the crud action we want ex. app.get | app.post | app.delete etc...
//--------------------------------end of imports------------------------------------
mongoose.connect("mongodb+srv://admin:adminpassword@cluster0.xu6qx.mongodb.net/cyberPlayground?retryWrites=true&w=majority", 
{
userNewParser: true,
useUnifiedTopology: true
},
()=>{
  console.log("Mongoose is Conected");
}
);





// -------------------------middleware------------------------------------
app.use(express.json()) // =>  allows us to read the request or req body
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'secretecode',
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieParser('secretecode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//------------------------END OF MIDDLEWARE----------------------------
//////////// Routes (to be filled out later in tutorial)


// define what localhost port we want our server to run on
const PORT = process.env.PORT || 3001 

app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}`)
})
//-----------------------------------------------------------------------
app.get('/', (req, res) => {
  res.send('Hello World')
})

// create a user
app.post("/signup", (req, res) => {
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
      });
      await newUser.save();
      res.send("User Created");
    }
  });
});
  
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

app.get("/user", (req, res) => {
  res.send(req.user); 
  // The req.user stores the entire user that has been authenticated inside of it.
});


app.get('/userl', function(req, res) {
  User.find({}, function(err, users) {
    const userMap = {};
    users.forEach(function(user) {
      userMap[user] = user;
    });
    res.send(userMap);  
  });
});

app.get("/logout", (req, res) => {
  req.logout();
  res.send("success");
});




// try {
//   // await
//   console.log(req.body)
  
//   const { username, password, email} = req.body

//   const newUser = await pool.query(
//       "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *", // returning * lets us see the data in the json response
//       [username, password, email]
//   ) 
//   res.json(newUser.rows[0])
// } catch (err) {
//   console.error(err.message)
// }
// })