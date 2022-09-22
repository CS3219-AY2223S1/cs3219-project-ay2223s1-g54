import jwt from "jsonwebtoken";
import * as configs from "./configs.js";
import * as constants from "./constants.js";

let refreshTokens = [];

export const setDefaultResponseHeaders = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
};

export const verifyAccessToken = async (req, res) => {
  const { accessToken, userId } = req.body;
  if (accessToken === null || decodedToken.userId === null) {
    res.sendStatus(constants.STATUS_BAD_REQUEST);
    return;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, configs.ACCESS_TOKEN_SECRET);
  } catch (err) {
    res.sendStatus(constants.STATUS_GONE);
    return;
  }

  if (decodedToken.userId !== userId) {
    res.sendStatus(constants.STATUS_BAD_REQUEST);
    return;
  }

  res.sendStatus(constants.STATUS_OK);
};

export const generateAccessToken = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  const userData = { userId };
  const accessToken = await _generateAccessToken(userData);
  const refreshToken = await _generateRefreshToken(userData);
  refreshTokens.push(refreshToken);

  res.status(constants.STATUS_OK).json({ accessToken, refreshToken });
};

export const renewAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.sendStatus(constants.STATUS_BAD_REQUEST);
    return;
  }

  if (!refreshTokens.includes(refreshToken)) {
    res.sendStatus(constants.STATUS_FORBIDDEN);
    return;
  }

  const accessToken = await _renewAccessToken(refreshToken);
  if (accessToken == null) {
    res.sendStatus(constants.STATUS_BAD_REQUEST);
    return;
  }
  res.status(constants.STATUS_OK).json({ accessToken });
};

export const revokeAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) {
    res.sendStatus(constants.STATUS_BAD_REQUEST);
    return;
  }

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(constants.STATUS_OK);
};

export const throwInvalidRequest = async (req, res) => {
  throw new Error("Invalid request");
};

////////////////////////////////////////////
///////////// HELPER FUNCTIONS /////////////
////////////////////////////////////////////
const _generateAccessToken = async (payload) => {
  const accessTokenConfig = { expiresIn: "15m", algorithm: "HS256" };
  const accessToken = jwt.sign(
    payload,
    configs.ACCESS_TOKEN_SECRET,
    accessTokenConfig
  );
  return accessToken;
};

const _generateRefreshToken = async (payload) => {
  const refreshTokenConfig = { expiresIn: "1d", algorithm: "HS256" };
  const refreshToken = jwt.sign(
    payload,
    configs.REFRESH_TOKEN_SECRET,
    refreshTokenConfig
  );
  return refreshToken;
};

const _renewAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, configs.REFRESH_TOKEN_SECRET);
    const accessToken = await _generateAccessToken({ userId: decoded.userId });
    return accessToken;
  } catch (err) {
    return null;
  }
};
