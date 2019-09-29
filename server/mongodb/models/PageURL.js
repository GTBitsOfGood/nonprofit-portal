const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const PageURLSchema = new Schema({
  itemId: {
    type: String,
    required: true,
  },
  urlString: {
    type: String,
    required: true,
  },
});

let PageURL;

if (mongoose.models.PageURL) {
  PageURL = mongoose.model('PageURL');
} else {
  PageURL = mongoose.model('PageURL', PageURLSchema);
}

module.exports = PageURL;
