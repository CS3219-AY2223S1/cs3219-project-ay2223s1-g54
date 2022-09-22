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
  if (!accessToken || !decodedToken.userId) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, configs.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res.sendStatus(constants.STATUS_GONE);
  }

  if (decodedToken.userId !== userId) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  return res.sendStatus(constants.STATUS_OK);
};

export const generateAccessToken = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  const userData = { userId };
  let accessToken, refreshToken;
  try {
    accessToken = await _generateAccessToken(userData);
    refreshToken = await _generateRefreshToken(userData);
  } catch (err) {
    return res.sendStatus(constants.STATUS_INTERNAL_SERVER_ERROR);
  }
  refreshTokens.push(refreshToken);

  return res.status(constants.STATUS_OK).json({ accessToken, refreshToken });
};

export const renewAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(constants.STATUS_FORBIDDEN);
  }

  let accessToken;
  try {
    accessToken = await _renewAccessToken(refreshToken);
  } catch (err) {
    return res.sendStatus(constants.STATUS_INTERNAL_SERVER_ERROR);
  }

  if (!accessToken) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  return res.status(constants.STATUS_OK).json({ accessToken });
};

export const revokeAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  return res.sendStatus(constants.STATUS_OK);
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
  const decoded = jwt.verify(refreshToken, configs.REFRESH_TOKEN_SECRET);
  const accessToken = await _generateAccessToken({ userId: decoded.userId });
  return accessToken;
};
