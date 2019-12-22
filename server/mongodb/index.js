import mongoose from 'mongoose';
import config from '../../config';

export default () => mongoose.connect(config.dbUrl, {
  // avoids deprecated functionality
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: config.dbName,
})
  .catch((e) => {
    console.error('Error connecting to database.');

    throw e;
  });
