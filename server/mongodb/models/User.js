const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
