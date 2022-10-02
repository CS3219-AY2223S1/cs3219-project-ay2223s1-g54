import mongoose from "mongoose";
import * as configs from "../configs.js";

export const dbInit = async () => {
  try {
    const mongooseData = { useNewUrlParser: true, useUnifiedTopology: true };
    mongoose.connect(configs.MONGOGB_URI, mongooseData);

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Failed to connect to MongoDB");
  }
};
