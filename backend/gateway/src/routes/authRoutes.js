import express from "express";
import asyncHandler from "express-async-handler";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import * as authService from "../services/authService.js";
import { MalformedRequest } from "../exceptions/MalformedRequest.js";
import { setRefreshTokenCookie } from "../middlewares/setRefreshTokenCookie.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const authRoutes = express.Router();

authRoutes.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      throw new MalformedRequest(responseMessages.MISSING_EMAIL_FIELD);
    } else if (!password) {
      throw new MalformedRequest(responseMessages.MISSING_PASSWORD_FIELD);
    }

    const { accessToken, refreshToken } = await authService.loginUser(
      email,
      password
    );
    await setRefreshTokenCookie(req, res, refreshToken, "/auth/renew");
    await setRefreshTokenCookie(req, res, refreshToken, "/auth/logout");
    return res.status(statusCodes.OK).json({ accessToken });
  })
);

authRoutes.post(
  "/renew",
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new MalformedRequest(responseMessages.MISSING_REFRESH_TOKEN_COOKIE);
    }

    const { accessToken } = await authService.renewToken(refreshToken);
    return res.status(statusCodes.OK).json({ accessToken });
  })
);

authRoutes.post(
  "/logout",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new MalformedRequest(responseMessages.MISSING_REFRESH_TOKEN_COOKIE);
    }

    await authService.logoutUser(refreshToken);
    return res.sendStatus(statusCodes.OK);
  })
);

export { authRoutes };
