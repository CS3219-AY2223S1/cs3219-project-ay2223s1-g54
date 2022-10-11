import jwt from "jsonwebtoken";
import * as configs from "../configs.js";
import * as responseMessages from "../constants/responseMessages.js";
import { ExpiredAccessToken } from "../exceptions/ExpiredAccessToken.js";
import { TokenGenerationFailure } from "../exceptions/TokenGenerationFailure.js";
import { TokenVerficationFailure } from "../exceptions/TokenVerficationFailure.js";

export const generateTokens = async (userId, username) => {
  const userData = { userId, username };

  let accessToken;
  try {
    accessToken = await _generateAccessToken(userData);
  } catch (err) {
    throw new TokenGenerationFailure(
      responseMessages.ACCESS_TOKEN_GENERATION_FAILURE
    );
  }

  let refreshToken;
  try {
    refreshToken = await _generateRefreshToken(userData);
  } catch (err) {
    throw new TokenGenerationFailure(
      responseMessages.REFRESH_TOKEN_GENERATION_FAILURE
    );
  }

  return { accessToken, refreshToken };
};

export const verifyAccessToken = async (accessToken) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, configs.ACCESS_TOKEN_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError")
      throw new ExpiredAccessToken(responseMessages.TOKEN_EXPIRED);
    // JsonWebTokenError (compromised)
    throw new TokenVerficationFailure(responseMessages.TOKEN_COMPROMISED);
  }

  const userId = decodedToken.userId;
  return { userId };
};

export const renewAccessToken = async (refreshToken) => {
  let accessToken;
  try {
    accessToken = await _renewAccessToken(refreshToken);
  } catch (err) {
    throw new TokenGenerationFailure(responseMessages.TOKEN_RENEWAL_FAILURE);
  }

  if (!accessToken) {
    throw new TokenGenerationFailure(responseMessages.NO_RENEWED_TOKEN);
  }

  return { accessToken };
};

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
