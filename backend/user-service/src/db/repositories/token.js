import { TokenModel } from "../models/token.js";
import { nanoid } from "nanoid";

export const getTokenByUserId = async (userId) => {
  const token = await TokenModel.findOne({ userId: userId });
  return token;
};

export const createToken = async (userId) => {
  const createdToken = await TokenModel.create({
    userId: userId,
    token: nanoid(32),
  });

  createdToken.save();
  return createdToken;
};

export const deleteToken = async (userId) => {
  const deleteToken = await TokenModel.findByIdAndDelete(userId);
  return deleteToken;
};
