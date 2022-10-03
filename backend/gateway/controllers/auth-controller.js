import express from "express";
import getAxios from "../api-adaptor.js";
import * as configs from "../configs.js";
import * as constants from "../constants.js";

const authController = express.Router();
const authAxios = await getAxios(configs.AUTH_SERVICE_URI);
const userAxios = await getAxios(configs.USER_SERVICE_URI);

const setRefreshTokenCookies = async (req, res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/auth/renewToken",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    path: "/api/auth/logout",
  });
};

export const checkAuthenticationMiddleware = async (req, res, next) => {
  const accessToken = req.get("Authorization")?.split("Bearer ")[1];

  if (!accessToken) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  try {
    const resVerify = await authAxios.post("/verifyToken", { accessToken });
    const { userId } = resVerify.data;

    req.body.userId = userId;
    next();
  } catch (err) {
    if (err.response.status === constants.STATUS_GONE) {
      return res.sendStatus(constants.STATUS_GONE);
    }
    return res.sendStatus(constants.STATUS_FORBIDDEN);
  }
};

authController.post("/renewToken", async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  try {
    const resToken = await authAxios.post("/renewToken", { refreshToken });
    const { accessToken } = resToken.data;

    setRefreshTokenCookies(req, res, refreshToken);
    return res.status(constants.STATUS_OK).json({ accessToken });
  } catch (err) {
    return res.sendStatus(constants.STATUS_INTERNAL_SERVER_ERROR);
  }
});

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  try {
    const resMatch = await userAxios.post("/verify", { email, password });
    const match = resMatch.data.result;

    if (!match) {
      return res.sendStatus(constants.STATUS_UNAUTHORISED);
    }

    const resUserId = await userAxios.get("/", { params: { email } });
    const userId = resUserId.data.result;

    const resToken = await authAxios.post("/generateToken", { userId });
    const { accessToken, refreshToken } = resToken.data;

    setRefreshTokenCookies(req, res, refreshToken);

    return res.status(constants.STATUS_OK).json({ accessToken });
  } catch (err) {
    return res.sendStatus(constants.STATUS_UNAUTHORISED);
  }
});

authController.post(
  "/logout",
  checkAuthenticationMiddleware,
  async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.sendStatus(constants.STATUS_BAD_REQUEST);
    }

    try {
      await authAxios.post("/revokeToken", { refreshToken });
      return res.sendStatus(constants.STATUS_OK);
    } catch (err) {
      return res.sendStatus(constants.STATUS_INTERNAL_SERVER_ERROR);
    }
  }
);

export default authController;
