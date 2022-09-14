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
  return UserModel.create(params);
}

export async function deleteUserById(id) {
  return UserModel.findByIdAndDelete(id);
}

export async function updateUser(userId, passwordHash) {
  const user = await UserModel.findById(userId);
  user.passwordHash = passwordHash;
  user.save();
  return user;
}

export async function usernameExists(username) {
  return UserModel.exists({ username });
}

export async function emailExists(email) {
  return UserModel.exists({ email });
}

export async function getPasswordHash(userId) {
  const user = await UserModel.findById(userId);
  return user.passwordHash;
}
