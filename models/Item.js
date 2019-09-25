const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Item = mongoose.model('item', ItemSchema);
