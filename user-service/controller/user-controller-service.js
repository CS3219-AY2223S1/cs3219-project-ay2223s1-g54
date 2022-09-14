import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/user-model.js";
import {
  ormCreateUser,
  ormUsernameExists,
  ormEmailExists,
  ormDeleteUserById,
  ormUpdateUserPassword,
  ormGetPasswordHash,
} from "../model/user-orm.js";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config.js";

let refreshTokens = [];

export const apiStatus = async (req, res) => {
  return res.status(200).json({ message: "user-service is available" });
};

export const signupUser = async (req, res) => {
  try {
    const { username, password, confirmPassword, email } = req.body;

    if (!username || !password || !confirmPassword || !email)
      return res.status(400).json({ message: "Missing signup fields" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not match" });

    const usernameExists = await ormUsernameExists(username);
    if (usernameExists)
      return res.status(409).json({ message: "Username already exists" });

    const emailExists = await ormEmailExists(email);
    if (emailExists)
      return res.status(409).json({ message: "Email already exists" });

    const SALT_ROUNDS = 10;
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const createdUser = await ormCreateUser(email, username, passwordHash);
    if (createdUser.username !== username)
      return res.status(400).json({ message: "Error creating user" });

    return res.status(201).json({ message: "User was created" });
  } catch (err) {
    return res.status(500).json({ message: "Unable to create new user" });
  }
};

export const deleteUser = async (req, res) => {
  const { accessToken } = req.body;
  const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

  if (!accessToken || !decodedToken.userId) {
    return res.status(401).json({ error: "Access Token missing or invalid" });
  }

  await ormDeleteUserById(decodedToken.userId);
  refreshTokens = refreshTokens.filter((token) => token !== accessToken);
  return res.status(204).end();
};

export const updateUserPassword = async (req, res) => {
  const { accessToken } = req.body;

  const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

  if (!accessToken || !decodedToken.userId) {
    return res.status(401).json({ error: "Access Token missing or invalid" });
  }

  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    return res
      .status(400)
      .json({ message: "New password cannot be old password" });
  }

  const oldPasswordHash = await ormGetPasswordHash(decodedToken.userId);
  const isOldPasswordCorrect = await bcrypt.compare(
    oldPassword,
    oldPasswordHash
  );

  if (!isOldPasswordCorrect) {
    return res.status(400).json({ message: "Old password incorrect" });
  }

  const SALT_ROUNDS = 10;
  const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await ormUpdateUserPassword(decodedToken.userId, newPasswordHash);
  return res.status(200).json({ message: "Password has been updated" });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing login fields" });

    const result = await UserModel.find({ email }).exec();
    if (result.length <= 0)
      return res.status(401).json({ message: "User does not exist" });

    const hashedPassword = result[0]["passwordHash"];
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPassword)
      return res.status(401).json({ message: "Incorrect password" });

    const userId = result[0]["id"];
    const accessTokenObject = await allocateAccessToken(userId);
    return res.status(200).json({ accessTokenObject });
  } catch (err) {
    return res.status(500).json({ message: "Unable to login user" });
  }
};

export const logoutUser = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  await deallocateAccessToken(refreshToken);
  res.status(204).json({ message: "User logged out" });
};

export const renewUser = async (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401).json("");
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403).json();

  const accessToken = await renewAccessToken(refreshToken);
  if (accessToken == null)
    return res
      .sendStatus(403)
      .json({ message: "Unable to renew access token" });
  return res.sendStatus(200).json({ accessToken });
};

export const renewAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const accessToken = await generateAccessToken({ userId: decoded.userId });

    return accessToken;
  } catch (err) {
    return null;
  }
};

const allocateAccessToken = async (userId) => {
  const accessToken = await generateAccessToken(userId);
  const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  return { accessToken, refreshToken };
};

const deallocateAccessToken = async (refreshToken) => {
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
};

const generateAccessToken = async (userId) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
};
