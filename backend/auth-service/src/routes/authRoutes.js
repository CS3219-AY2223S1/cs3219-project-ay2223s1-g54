import express from "express";
import asyncHandler from "express-async-handler";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import * as authService from "../services/authService.js";
import { MalformedRequest } from "../exceptions/MalformedRequest.js";

const authRoutes = express.Router();
let refreshTokens = [];

authRoutes.post(
  "/generate",
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      throw new MalformedRequest(responseMessages.MISSING_USER_ID_FIELD);
    }

    const tokens = await authService.generateTokens(userId);
    const { accessToken, refreshToken } = tokens;
    refreshTokens.push(refreshToken);
    return res.status(statusCodes.OK).json({ accessToken, refreshToken });
  })
);

authRoutes.post(
  "/verify",
  asyncHandler(async (req, res) => {
    const { accessToken } = req.body;
    if (!accessToken) {
      throw new MalformedRequest(responseMessages.MISSING_ACCESS_TOKEN_FIELD);
    }

    const { userId } = await authService.verifyAccessToken(accessToken);
    return res.status(statusCodes.OK).json({ userId });
  })
);

authRoutes.post(
  "/renew",
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new MalformedRequest(responseMessages.MISSING_REFRESH_TOKEN_FIELD);
    }

    if (!refreshTokens.includes(refreshToken)) {
      throw new MalformedRequest(responseMessages.INVALID_REFRESH_TOKEN);
    }

    const { accessToken } = await authService.renewAccessToken(refreshToken);
    return res.status(statusCodes.OK).json({ accessToken });
  })
);

authRoutes.post(
  "/revoke",
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new MalformedRequest(responseMessages.MISSING_REFRESH_TOKEN_FIELD);
    }

    refreshTokens = refreshTokens.filter((token) => token != refreshToken);
    return res.sendStatus(statusCodes.OK);
  })
);

export { authRoutes };
