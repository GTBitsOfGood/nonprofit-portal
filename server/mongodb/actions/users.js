import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoDB from '../index';
import User from '../models/User';

export async function login(email, password) {
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
    .then((user) => jwt.sign({
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    }));
}

export async function signUp(name, email, password) {
  await mongoDB();

  return User.countDocuments({ email })
    .then((count) => {
      if (count) {
        return Promise.reject(Error('The email has already been used.'));
      }

      return bcrypt.hashSync(password, process.env.PASS_SALT);
    })
    .then((hashedPassword) => User.create({
      name,
      email,
      password: hashedPassword,
    }))
    .then((user) => jwt.sign({
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    }));
}

export async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) return Promise.resolve(decoded);

    return Promise.reject(Error('Invalid token!'));
  });
}
