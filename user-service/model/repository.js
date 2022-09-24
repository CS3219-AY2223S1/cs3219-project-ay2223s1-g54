import mongoose from "mongoose";
import UserModel from "./user-model.js";
import { MONGOGB_URI } from "../configs.js";

mongoose.connect(MONGOGB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const emailExists = async (email) => {
  const exists = await UserModel.exists({ email });
  return exists;
};

export const usernameExists = async (username) => {
  const exists = await UserModel.exists({ username });
  return exists;
};

export const getUserById = async (id) => {
  const user = await UserModel.findById(id);
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email: email });
  return user;
};

export const createUser = async (email, username, passwordHash) => {
  const createdUser = await UserModel.create({ email, username, passwordHash });
  return createdUser;
};

export const updateUser = async (id, email, username, passwordHash) => {
  const updatedUser = await UserModel.findById(id);
  updatedUser.email = email;
  updatedUser.username = username;
  updatedUser.passwordHash = passwordHash;
  updatedUser.updatedAt = Date.now();
  console.log(updateUser);
  await updatedUser.save();
  return updatedUser;
};

export const deleteUser = async (id) => {
  const deletedUser = await UserModel.findByIdAndDelete(id);
  return deletedUser;
};
