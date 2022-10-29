import express from "express";
import asyncHandler from "express-async-handler";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import * as userService from "../services/userService.js";
import { MalformedRequest } from "../exceptions/MalformedRequest.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const userRoutes = express.Router();

userRoutes.post(
  "/create",
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

userRoutes.post(
  "/update",
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

userRoutes.post(
  "/delete",
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

userRoutes.get(
  "/confirm/:confirmationCode",
  asyncHandler(async (req, res) => {
    const { confirmationCode } = req.params;
    if (!confirmationCode) {
      throw new MalformedRequest(
        responseMessages.MISSING_CONFIRMATION_CODE_FIELD
      );
    }

    await userService.emailVerifyingUser(confirmationCode);
    return res.sendStatus(statusCodes.OK);
  })
);

userRoutes.post(
  "/passwordReset",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
      throw new MalformedRequest(responseMessages.MISSING_EMAIL_FIELD);
    }

    await userService.sendResetPasswordLinkUser(email);
    return res
      .status(statusCodes.OK)
      .json({ success: responseMessages.USER_RESET_EMAIL_SENT });
  })
);

userRoutes.post(
  "/passwordReset/:userId/:token",
  asyncHandler(async (req, res) => {
    const { newPassword } = req.body;
    const { userId, token } = req.params;
    if (!newPassword) {
      throw new MalformedRequest(responseMessages.MISSING_PASSWORD_FIELD);
    }

    await userService.resetPasswordUser(userId, token, newPassword);
    return res
      .sendStatus(statusCodes.OK)
      .json({ success: responseMessages.USER_PASSWORD_RESET_SUCCESS });
  })
);

export { userRoutes };
