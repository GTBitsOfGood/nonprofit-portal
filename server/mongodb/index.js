import mongoose from "mongoose";
import config from "../../config";

export default async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(config.dbUrl, {
      // avoids deprecated functionality
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: config.dbName,
    })
    .catch((e) => {
      console.error("Error connecting to database.");

      throw e;
    });
};
