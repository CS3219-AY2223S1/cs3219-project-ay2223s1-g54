import express from "express";
import getAxios from "../api-adaptor.js";
import * as configs from "../configs.js";
import * as constants from "../constants.js";

const authController = express.Router();
const authAxios = await getAxios(configs.AUTH_SERVICE_URI);
const userAxios = await getAxios(configs.USER_SERVICE_URI);

export const checkAuthenticationMiddleware = async (req, res, next) => {
  const accessToken = req.get("Authorization")?.split("Bearer ")[1];

  if (!accessToken) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  try {
    await authAxios.post("/verifyToken", { accessToken });
    next();
  } catch (err) {
    if (err.response.status === constants.STATUS_GONE) {
      return res.sendStatus(constants.STATUS_GONE);
    }
    return res.sendStatus(constants.STATUS_FORBIDDEN);
  }
};

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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/renewToken",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/api/auth/logout",
    });

    return res.status(constants.STATUS_OK).json({ accessToken });
  } catch (err) {
    return res.sendStatus(constants.STATUS_UNAUTHORISED);
  }
});

authController.post("/logout", checkAuthenticationMiddleware, (req, res) => {
  res.sendStatus(200);
});

export default authController;
