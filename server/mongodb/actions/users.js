const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoDB = require('../index');
const User = require('../models/User');

async function login(username, password) {
  await mongoDB();

  return User.findOne({ username })
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((result) => {
          if (result) return Promise.resolve(user);

          return Promise.reject(Error('The password you entered is incorrect.'));
        });
      }

      return Promise.reject(Error('The username does not exist.'));
    })
    .then((user) => {
      mongoose.connection.close();

      return user;
    })
    .catch((error) => {
      mongoose.connection.close();

      throw error;
    });
}

async function signUp(username, password) {
  await mongoDB();

  return User.countDocuments({ username })
    .then((count) => {
      if (count) {
        return Promise.reject(Error('The username has already been used.'));
      }

      return bcrypt.hashSync(password);
    })
    .then((hashedPassword) => User.create({
      username,
      password: hashedPassword,
    }))
    .then((user) => {
      mongoose.connection.close();

      return user;
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
