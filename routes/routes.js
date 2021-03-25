const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../schema/schema');

const router = express.Router();


// All users can access these routes
router.post(
    '/signup',
    async (req, res) => {
      const { name, surname, email, role, password, status, place } = req.body;
  
        let userExists = await UserModel.findOne({ email });
        if (userExists) {
          return res.status(400).json({message: 'Email already in use!'});
        }
        const user = await UserModel.create({ name, surname, email, role, password, status, place });
        return res.status(200).json({
          message: 'Signup successful! You are now a user',
          user: user
        });
    }  
  );

  
router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
              return next(info);
            }
  
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email, role: user.role };
                const token = jwt.sign({ user: body }, 'supersecret');
                return res.json({ token });
              })
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
  );

  router.post(
    '/forgot-password',
      function (req, res) {
        UserModel.findOne({ email: req.body.email }, function (err, user) {
            if (err) {
              console.log(err);
  
          } if (Boolean(user)) {
              return res.json('Password reset request recieved! Check your email for further instructions');
          }   
          return res.json('Email does not exist in database') 
        })
        
      }
  );

  module.exports = router;