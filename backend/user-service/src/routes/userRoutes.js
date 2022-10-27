import express from "express";
import asyncHandler from "express-async-handler";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import * as userService from "../services/userService.js";
import { MalformedRequest } from "../exceptions/MalformedRequest.js";

const userRoutes = express.Router();

userRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) {
      throw new MalformedRequest(responseMessages.MISSING_EMAIL_FIELD);
    }

    const user = await userService.getUser(email);
    const userId = user.id;
    const username = user.username;
    return res.status(statusCodes.OK).json({ userId, username });
  })
);

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
  asyncHandler(async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    if (!userId) {
      throw new MalformedRequest(responseMessages.MISSING_USER_ID_FIELD);
    } else if (!oldPassword) {
      throw new MalformedRequest(responseMessages.MISSING_PASSWORD_FIELD);
    } else if (!newPassword) {
      throw new MalformedRequest(responseMessages.MISSING_NEW_PASSWORD_FIELD);
    }

    await userService.updateUserPassword(userId, oldPassword, newPassword);
    return res.sendStatus(statusCodes.OK);
  })
);

userRoutes.delete(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
      throw new MalformedRequest(responseMessages.MISSING_USER_ID_FIELD);
    }

    await userService.deleteUser(userId);
    return res.sendStatus(statusCodes.OK);
  })
);

userRoutes.post(
  "/verify",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      throw new MalformedRequest(responseMessages.MISSING_EMAIL_FIELD);
    } else if (!password) {
      throw new MalformedRequest(responseMessages.MISSING_PASSWORD_FIELD);
    }

    const match = await userService.verifyUser(email, password);
    return res.status(statusCodes.OK).json({ match });
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
    return res
      .status(statusCodes.OK)
      .json({ success: responseMessages.USER_EMAIL_VERIFIED });
  })
);

userRoutes.post("/passwordReset", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new MalformedRequest(responseMessages.MISSING_EMAIL_FIELD);
  }

  await userService.sendResetPasswordLinkUser(email);
  return res
    .status(statusCodes.OK)
    .json({ success: responseMessages.USER_RESET_EMAIL_SENT });
});

export { userRoutes };
