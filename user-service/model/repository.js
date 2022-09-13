import "dotenv/config";
import mongoose from "mongoose";
import UserModel from "./user-model.js";
import { MONGOGB_URI } from "../config.js";

mongoose.connect(MONGOGB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createUser(params) {
  return new UserModel(params);
}

export async function usernameExists(username) {
  return UserModel.exists({ username });
}
