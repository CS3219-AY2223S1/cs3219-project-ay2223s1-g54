import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/user-model.js";
import { ormCreateUser, ormUsernameExists, ormEmailExists } from "../model/user-orm.js";
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const createdUser = await ormCreateUser(email, username, hashedPassword);
    if (createdUser.username !== username)
      return res.status(400).json({ message: "Error creating user" });

    return res.status(201).json({ message: "User was created" });
  } catch (err) {
    return res.status(500).json({ message: "Unable to create new user" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing login fields" });

    const result = await UserModel.find({ email }).exec();
    if (result.length <= 0)
      return res.status(401).json({ message: "User does not exist" });

    const hashedPassword = result[0]["password"];
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPassword)
      return res.status(401).json({ message: "Incorrect password" });

    const accessTokenObject = await allocateAccessToken(email);
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
    const accessToken = await generateAccessToken({ email: decoded.email });

    return accessToken;
  } catch (err) {
    return null;
  }
};

const allocateAccessToken = async (email) => {
  const accessToken = await generateAccessToken(email);
  const refreshToken = jwt.sign({ email }, REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  return { accessToken, refreshToken };
};

const deallocateAccessToken = async (refreshToken) => {
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
};

const generateAccessToken = async (email) => {
  return jwt.sign({ email }, ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
};
