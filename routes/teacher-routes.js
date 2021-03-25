const express = require('express');
const router = express.Router();
const UserModel = require('../schema/schema');

//Only teachers can access these routes

router.get(
    '/profile',
    (req, res, next) => {
        res.json({
            message: 'This is the teachers page, with expanded functionality',
            user: req.user,
            token: req.query.secret_token
        })
    }
);

//Here teachers can check user details
router.get('/check-users',  function (req, res) {
    let users = UserModel.find({},'-password', function (err, users) {
      if (err) {
        console.log(err);
      }
      else {
        res.json({
          message: "Here are all the users:",
          users
        });
      }
    });
});

//Teacher delete users:

router.delete(
    '/deleteuser',
    async function (req,res) {
      UserModel.findOneAndDelete({ email: req.body.email }, function (err, user) {
        if (err) {
          return res.status(400).json('Error deleting user');
        } else {
          return res.status(200).json('User deleted from DB!');
        }
      })
    }
);


router.patch(
    '/updateuser',
    async function (req, res) {
      let params = { 
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email, 
        role: req.body.role,
        place: req.body.place,
        status: req.body.status
    };
  
    for(let prop in params) if(!params[prop]) delete params[prop]; 
  
      let email = req.body.email;
      let filter = { email };
  
      await UserModel.findOneAndUpdate( filter, params, function (err, user) {
        if (err) {
          return res.status(400).json('Error updating user');
        } 
        else if (Boolean(user)) {
          return res.status(200).json('User updated!');
        }
        else {
          return res.status(400).json({ 
            message: 'Check if email is correct',
            user: req.body.email
          })
        }
      })
    }
);

module.exports = router;