import { TokenModel } from "../models/token.js";
import nanoid from "nanoid";

export const getTokenByUserId = async (userId) => {
  const retrievedToken = await TokenModel.findOne({ userId: userId });
  return retrievedToken;
};

export const getTokenByUserIdTokenValue = async (userId, token) => {
  const retrievedToken = await TokenModel.findOne({
    userId: userId,
    token: token,
  });
  return retrievedToken;
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
