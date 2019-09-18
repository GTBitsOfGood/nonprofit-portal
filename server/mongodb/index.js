const { MongoClient } = require('mongodb');

const MONGO_SERVER_URL = 'mongodb://localhost:27017/test';

module.exports = () => MongoClient.connect(MONGO_SERVER_URL, {
  // avoids deprecated functionality
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
