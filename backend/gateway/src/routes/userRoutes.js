import express from "express";
import asyncHandler from "express-async-handler";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import * as userService from "../services/userService.js";
import { MalformedRequest } from "../exceptions/MalformedRequest.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const userRoutes = express.Router();

userRoutes.post(
  "/",
  asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (!email) {
      throw new MalformedRequest(responseMessages.MISSING_EMAIL_FIELD);
    } else if (!username) {
      throw new MalformedRequest(responseMessages.MISSING_USERNAME_FIELD);
    } else if (!password) {
      throw new MalformedRequest(responseMessages.MISSING_PASSWORD_FIELD);
    }

    await userService.createUser(email, username, password);
    return res.sendStatus(statusCodes.OK);
  })
);

userRoutes.put(
  "/",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    if (!userId) {
      throw new MalformedRequest(responseMessages.MISSING_USER_ID_FIELD);
    } else if (!oldPassword) {
      throw new MalformedRequest(responseMessages.MISSING_PASSWORD_FIELD);
    } else if (!newPassword) {
      throw new MalformedRequest(responseMessages.MISSING_NEW_PASSWORD_FIELD);
    }

    await userService.updateUser(userId, oldPassword, newPassword);
    return res.sendStatus(statusCodes.OK);
  })
);

userRoutes.delete(
  "/",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      throw new MalformedRequest(responseMessages.MISSING_USER_ID_FIELD);
    }

    await userService.deleteUser(userId);
    return res.sendStatus(statusCodes.OK);
  })
);

export { userRoutes };
