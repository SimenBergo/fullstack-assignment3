const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../schema/schema');

const router = express.Router();

//Students and teachers can access this router
 
//This lets students see other users details:
router.get('/check-users',  function (req, res) {
  let users = UserModel.find({},'-password -_id -email', function (err, users) {
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

module.exports = router;