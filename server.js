// pulls in the express library
const express = require('express');
const pool = require('./config/db');
const morgan = require("morgan");
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require("./users");

mongoose.connect("mongodb+srv://admin:adminpassword@cluster0.xu6qx.mongodb.net/cyberPlayground?retryWrites=true&w=majority", 
{
userNewParser: true,
useUnifiedTopology: true
},
()=>{
  console.log("Mongoose is Conected");
}
);

// allows us to write app and the crud action we want ex. app.get | app.post | app.delete etc...
const app = express()


// middleware
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


//////////// Routes (to be filled out later in tutorial)


// define what localhost port we want our server to run on
const PORT = process.env.PORT || 3001 

app.listen(PORT, ()=> {
    console.log(`Server running on port: ${PORT}`)
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

// create a user
app.post('/users',  (req, res) => {
  User.findOne({username: req.body.username}, async (err, doc)=>{
    if (err) throw err;
    if (doc) res.send('User Already Exists');
    if (!doc){
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send('User Created');
    }
  });
});
  
app.post('/login', async (req, res) => {
  try {
      // await
      console.log(req.body)
      
      const { username, password, email} = req.body

      const newUser = await pool.query(
          "SELECT * users WHERE username = $1 AND password = $2", // returning * lets us see the data in the json response
          [username, password]
      ) 
      res.json(newUser.rows[0])
  } catch (err) {
      console.error(err.message)
  }
})

// get all users
app.get('/users', async (req, res) => {
  try {
      const allUsers = await pool.query("SELECT * FROM users")
      res.json(allUsers.rows)
  } catch (err) {
      console.error(err.message)
  }
})

// get only one user
app.get('/users/:id', async (req, res) => {
  console.log(req.params)
  const { id } = req.params
  try {
      const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]) 
      // $1 is a placeholder, then the 2nd argument is what that variable is 
      //going to be
      res.json(user.rows[0])
  } catch (err) {
      console.error(err.message)
  }
})


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