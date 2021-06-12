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
const Photo = require("./photo");
const cloudinary = require("./utils/cloudinary");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

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

// boiler plate on all the images to stop giant images. 
app.use(express.static('public'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }))

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

/// multer config

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

app.get('/images', async(req, res) => {
  const {resources} = await cloudinary.search.expression
  ('folder: cyber_photos').sort_by('public_id', 'desc')
  .max_results(30)
  .execute()
  const publicIds = resources.map( file => file.public_id)
  // gets a array response of all the public ids we can use to put on the page
  res.send(publicIds) 
})


// app.post('/uploadImage', async (req, res) => { 
//   console.log(req.body)
//   Photo.findOne({hashtag: req.body.hashtag}, async (err, doc)=>{
//       try {
//       const fileStr = JSON.stringify(req.body.data)
//       const uploadedResponse = await cloudinary.uploader.upload(
//         fileStr, {
//         upload_preset: 'cyber_photos'
//       })
//       console.log(uploadedResponse)
//       res.json({msg: "WOOP WOOP"})
//       res.setHeader('Content-Type', 'text/plain');
//       const newPhoto = new Photo({
//         hashtag: req.body.hashtag,
//         caption: req.body.caption,
//         // publicId: res.json(req.file)
//       });
//       await newPhoto.save();
//       res.send('Photo Created');
//     } catch (error){
//       console.error(error)
//       res.status(500).json({err: 'something is going bad'})
//     }
//     })
// });

// app.post('/upload', async (req, res) => {
//   Photo.findOne({hashtag: req.body.hashtag}, async (err, doc)=>{
//     const fileStr = JSON.stringify(req.body.image)
//     console.log("the file is" + fileStr)
//     const uploadedResponse = await cloudinary.uploader.upload(
//       fileStr, {
//       upload_preset: 'cyber_photos'
//     })
//     console.log(uploadedResponse)
//     res.json({msg: "WOOP WOOP"})
//     if (err) throw err;
//     if (!doc){
//       const newPhoto = new Photo ({
//         imageUrl: req.body.imageUrl,
//         hashtag: req.body.hashtag,
//         caption: req.body.caption
//       });
//       await newPhoto.save();
//       res.json(newImage.imageUrl);
//       res.send('Photo Created');
//     } 
//   });
// });

app.post('/upload', async (req, res) => {
  try {
    const newPhoto = new Photo({
      publicId: req.body.imageUrl,
      hashtag: req.body.hashtag,
      caption: req.body.caption
    });
    await newPhoto.save();
    res.json(newPhoto.imageUrl);
  } catch (err) {
    console.error('Something went wrong', err);
  }
});

app.get('/getLatest', async (req, res) => {
  const getPhoto = await Photo.findOne().sort({ _id: -1 });
  res.json(getPhoto.imageUrl);
});
