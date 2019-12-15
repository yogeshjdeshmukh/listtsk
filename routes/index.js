var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcryptjs');
process.env.SECRET_KEY = 'secret'


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jeanmerci30@gmail.com',
      pass: 'jean@nyc123'
    }
  });


router.post('/addtocart/:id',function (req, res) {
    const { cart, total } = req.body;
    console.log(cart)
    var coursetext;

    var courses = [];
        for(var i = 0; i<cart.length;i++){
            coursetext += i+1 + ". " + cart[i].title + " \n";
            courses.push(cart[i].id)
        }
        console.log("Courses " + courses)
  User.findOneAndUpdate({ _id : req.params.id },{courses},{ returnOriginal: false }, function(err, user) {
    if (user) {
        var mailOptions = {
            from: 'jeanmerci30@gmail.com',
            to: 'deshmukhy87@gmail.com',
            subject: 'Purchase Invoice',
            text: 'You purchased the following courses \n'+coursetext+'The total price is: '+total
          };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 
        console.log("User"+ user)
        console.log(user)
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.json('error: ' + err)
    })
})



router.post('/login',function (req, res) {
    const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (user) {
        console.log("User"+ user)
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Issue token
          console.log("login done")
          const payload = { 
              id:user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
             };
          const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '1h'
          });
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})




router.post('/register', (req, res) => {
    console.log('user signup');
    console.log(req.body)

    var Data = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        password : req.body.password
    }
    // ADD VALIDATION
    User.findOne({ username: Data.email }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the email: ${email}`
            })
        }
        else {
            const newUser = new User({
                firstname : Data.firstname,
                lastname : Data.lastname,
                        email : Data.email,
                     password : Data.password
            })
            console.log(newUser)
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})
module.exports = router;
