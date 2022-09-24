import express from "express";
import getAxios from "../api-adaptor.js";
import * as configs from "../configs.js";
import * as constants from "../constants.js";
import { checkAuthenticationMiddleware } from "../controllers/auth-controller.js";

const userController = express.Router();
const userAxios = await getAxios(configs.USER_SERVICE_URI);

userController.post("/", async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  try {
    await userAxios.post("/", { email, username, password });
    return res.sendStatus(constants.STATUS_OK);
  } catch (err) {
    return res.sendStatus(err.response.status);
  }
});

userController.put("/", checkAuthenticationMiddleware, async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  if (!userId || !oldPassword || !newPassword) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  try {
    await userAxios.put("/", { id: userId, oldPassword, newPassword });
    return res.sendStatus(constants.STATUS_OK);
  } catch (err) {
    return res.sendStatus(err.response.status);
  }
});

userController.delete("/", checkAuthenticationMiddleware, async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.sendStatus(constants.STATUS_BAD_REQUEST);
  }

  try {
    await userAxios.delete("/" + userId);
    return res.sendStatus(constants.STATUS_OK);
  } catch (err) {
    return res.sendStatus(err.response.status);
  }
});

export default userController;
