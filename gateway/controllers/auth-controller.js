import express from "express";
import getAxios from "../api-adaptor.js";
import * as configs from "../configs.js";
import * as constants from "../constants.js";

const authController = express.Router();
const authAxios = await getAxios(configs.AUTH_SERVICE_URI);
const userAxios = await getAxios(configs.USER_SERVICE_URI);

authController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  // verify credentials
  try {
    const resMatch = await userAxios.post("/verify", { email, password });
    const match = resMatch.data.result;

    if (!match) {
      return res.sendStatus(constants.STATUS_UNAUTHORISED);
    }

    const resUserId = await userAxios.get("/", { params: { email } });
    const userId = resUserId.data.result;

    const resGenerateToken = await authAxios.post("/generateToken", { userId });
    const { accessToken, refreshToken } = resGenerateToken.data;

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    return res.status(constants.STATUS_OK).json({ accessToken });
  } catch (err) {
    return res.sendStatus(constants.STATUS_UNAUTHORISED);
  }
});

export default authController;
