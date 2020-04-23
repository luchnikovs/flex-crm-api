const User = require('../models/user');
const bCrypt = require('bcrypt');

// Create a new user
const createUser = (req, res) => {
  const {email, username, password, passwordConf} = req.body

  if (email && username && password) {
    const userData = {
      email,
      username,
      password,
    }

    User.create(userData, function (err, user) {
      if (err) {
        if(err.name === 'ValidationError') {
          return res.status(400).send({
            message: err.message
          });
        } else {
          return res.status(500).send({
            message: err
          });
        }
      }

      return res.status(200).json({
        message: 'New user was registered',
        result: user
      });
    });
  }
};

const authenticate = (req, res) => {
  const {email, password} = req.body

  User.findOne({email: email}, function (err, user) {
      if (err) {
        return res.status(400).send({
          message: err.message
        });
      } else if (!user) {
        return res.status(401).send({
          message: 'User not found.'
        });
      }

      bCrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return res.status(200).json({
            message: 'User authorized',
            result: user
          });
        } else {
          return res.status(401).send({
            message: 'User not found.'
          });
        }
      })
    });
};

module.exports = {createUser, authenticate}