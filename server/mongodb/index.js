const mongoose = require('mongoose');
const config = require('../../config').default;

module.exports = () => mongoose.connect(config.dbUrl, {
  // avoids deprecated functionality
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: config.dbName,
})
  .catch((e) => {
    console.error('Error connecting to database.');

    throw e;
  });
