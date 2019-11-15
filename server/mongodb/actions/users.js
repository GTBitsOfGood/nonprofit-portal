const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoDB = require('../index');
const User = require('../models/User');

const jwtSecret = 'secret';

async function login(email, password) {
  await mongoDB();

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((result) => {
          if (result) return Promise.resolve(user);

          return Promise.reject(Error('The password you entered is incorrect.'));
        });
      }

      return Promise.reject(Error('The email does not exist.'));
    })
    .then((user) => {
      mongoose.connection.close();

      return jwt.sign({
        id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
      }, jwtSecret, {
        expiresIn: '7d',
      });
    })
    .catch((error) => {
      mongoose.connection.close();

      throw error;
    });
}

async function signUp(name, email, password) {
  await mongoDB();

  return User.countDocuments({ email })
    .then((count) => {
      if (count) {
        return Promise.reject(Error('The email has already been used.'));
      }

      return bcrypt.hashSync(password);
    })
    .then((hashedPassword) => User.create({
      name,
      email,
      password: hashedPassword,
    }))
    .then((user) => {
      mongoose.connection.close();

      return jwt.sign({
        id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
      }, jwtSecret, {
        expiresIn: '7d',
      });
    })
    .catch((error) => {
      mongoose.connection.close();

      throw error;
    });
}

module.exports = {
  login,
  signUp,
};
