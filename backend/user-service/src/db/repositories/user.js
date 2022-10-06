import { UserModel } from "../models/user.js";

export const emailExists = async (email) => {
  const exists = await UserModel.exists({ email });
  return exists;
};

export const usernameExists = async (username) => {
  const exists = await UserModel.exists({ username });
  return exists;
};

export const getUserById = async (userId) => {
  const user = await UserModel.findById(userId);
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

export const updateUser = async (userId, email, username, passwordHash) => {
  const updatedUser = await UserModel.findById(userId);
  updatedUser.email = email;
  updatedUser.username = username;
  updatedUser.passwordHash = passwordHash;
  updatedUser.updatedAt = Date.now();

  await updatedUser.save();
  return updatedUser;
};

export const deleteUser = async (userId) => {
  const deletedUser = await UserModel.findByIdAndDelete(userId);
  return deletedUser;
};
