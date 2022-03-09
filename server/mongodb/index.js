import mongoose from "mongoose";

const prod = process.env.NODE_ENV === "production";
const dbUrl = prod
  ? process.env.MONGO_DB
  : process.env.MONGO_DEV_DB || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "Applications";

export default async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(dbUrl, {
      // avoids deprecated functionality
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName,
    })
    .catch((e) => {
      console.error("Error connecting to database.");

      throw e;
    });
};
