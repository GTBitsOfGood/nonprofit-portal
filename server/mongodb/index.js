const mongoose = require('mongoose');

const MONGO_SERVER_URL = 'mongodb://localhost:27017/test';

module.exports = () => mongoose.connect(MONGO_SERVER_URL, {
  // avoids deprecated functionality
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
