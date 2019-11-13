const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

let Application;

if (mongoose.models.User) {
  Application = mongoose.model('User');
} else {
  Application = mongoose.model('User', UserSchema);
}

module.exports = Application;
