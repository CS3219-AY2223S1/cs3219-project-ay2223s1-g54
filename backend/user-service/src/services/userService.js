import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import * as userRepo from "../db/repositories/user.js";
import * as regExp from "../constants/regExp.js";
import * as responseMessages from "../constants/responseMessages.js";
import { SALT_ROUNDS } from "../constants/bcrypt.js";
import { FieldValidationFailure } from "../exceptions/FieldValidationFailure.js";
import { IdenticalPassword } from "../exceptions/IdenticalPassword.js";
import { InformationExists } from "../exceptions/InformationExists.js";
import { PasswordNotMatch } from "../exceptions/PasswordNotMatch.js";
import { RepositoryFailure } from "../exceptions/RepositoryFailure.js";
import { UserNotFound } from "../exceptions/UserNotFound.js";
import { UserNotVerified } from "../exceptions/UserNotVerified.js";
import { sendConfirmationEmail } from "../nodeMailerConfig.js";
import { EMAIL_CONFIRMATION_SECRET } from "../configs.js";

export const getUser = async (email) => {
  let user;
  try {
    user = await userRepo.getUserByEmail(email);
  } catch (err) {
    throw new RepositoryFailure(responseMessages.GET_USER_BY_EMAIL_FAILURE);
  }

  if (!user) {
    throw new UserNotFound(responseMessages.USER_NOT_FOUND);
  }

  return user;
};

export const createUser = async (email, username, password) => {
  let emailExists, usernameExists;

  const emailRegExp = new RegExp(regExp.EMAIL);
  if (!email.match(emailRegExp)) {
    throw new FieldValidationFailure(responseMessages.EMAIL_VALIDATION_FAIL);
  }

  const usernameRegExp = new RegExp(regExp.USERNAME);
  if (!username.match(usernameRegExp)) {
    throw new FieldValidationFailure(responseMessages.USERNAME_VALIDATION_FAIL);
  }

  const passwordRegExp = new RegExp(regExp.PASSWORD);
  if (!password.match(passwordRegExp)) {
    throw new FieldValidationFailure(responseMessages.PASSWORD_VALIDATION_FAIL);
  }

  try {
    emailExists = await userRepo.emailExists(email);
  } catch (err) {
    throw new RepositoryFailure(responseMessages.GET_EMAIL_EXISTS_FAILURE);
  }

  try {
    usernameExists = await userRepo.usernameExists(username);
  } catch (err) {
    throw new RepositoryFailure(responseMessages.GET_USER_EXISTS_FAILURE);
  }

  if (emailExists) {
    throw new InformationExists(responseMessages.EMAIL_ALREADY_EXISTS);
  }

  if (usernameExists) {
    throw new InformationExists(responseMessages.USERNAME_ALREADY_EXISTS);
  }

  try {
    const confirmationCode = jsonwebtoken.sign(
      { email: email },
      EMAIL_CONFIRMATION_SECRET
    );
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const createdUser = await userRepo.createUser(
      email,
      username,
      passwordHash,
      confirmationCode
    );

    sendConfirmationEmail(username, email, confirmationCode);

    return createdUser;
  } catch (err) {
    throw new RepositoryFailure(responseMessages.CREATE_USER_FAILURE);
  }
};

export const updateUserPassword = async (userId, oldPassword, newPassword) => {
  if (oldPassword === newPassword) {
    throw new IdenticalPassword(responseMessages.PASSWORDS_IDENTICAL);
  }

  const passwordRegExp = new RegExp(regExp.PASSWORD);
  if (!newPassword.match(passwordRegExp)) {
    throw new FieldValidationFailure(responseMessages.PASSWORD_VALIDATION_FAIL);
  }

  let user;
  try {
    user = await userRepo.getUserById(userId);
  } catch (err) {
    throw new RepositoryFailure(responseMessages.GET_USER_BY_ID_FAILURE);
  }

  if (!user) {
    throw new UserNotFound(responseMessages.USER_NOT_FOUND);
  }

  const { email, username, passwordHash } = user;
  const passwordMatch = await bcrypt.compare(oldPassword, passwordHash);
  if (!passwordMatch) {
    throw new PasswordNotMatch(responseMessages.PASSWORD_DOES_NOT_MATCH);
  }

  try {
    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const updatedUser = await userRepo.updateUser(
      userId,
      email,
      username,
      passwordHash
    );
    return updatedUser;
  } catch (err) {
    throw new RepositoryFailure(responseMessages.UPDATE_USER_FAILURE);
  }
};

export const deleteUser = async (userId) => {
  try {
    const deletedUser = await userRepo.deleteUser(userId);
    return deletedUser;
  } catch (err) {
    throw new RepositoryFailure(responseMessages.DELETE_USER_FAILURE);
  }
};

export const verifyUser = async (email, password) => {
  let user;
  try {
    user = await userRepo.getUserByEmail(email);
  } catch (err) {
    throw new RepositoryFailure(responseMessages.GET_USER_BY_EMAIL_FAILURE);
  }

  if (!user) {
    throw new UserNotFound(responseMessages.USER_NOT_FOUND);
  }

  if (user.status != "Active") {
    throw new UserNotVerified(responseMessages.USER_NOT_EMAIL_VERIFIED);
  }

  const { passwordHash } = user;
  const passwordMatch = await bcrypt.compare(password, passwordHash);
  return passwordMatch;
};

export const emailVerifyingUser = async (confirmationCode) => {
  let user;
  let confirmedUser;

  try {
    user = await userRepo.getUserByConfirmationCode(confirmationCode);
  } catch (err) {
    throw new RepositoryFailure(
      responseMessages.GET_USER_BY_CONFIRMATION_CODE_FAILURE
    );
  }

  if (!user) {
    throw new UserNotFound(responseMessages.USER_NOT_FOUND);
  }

  try {
    confirmedUser = await userRepo.confirmUser(confirmationCode);
  } catch (err) {
    throw new RepositoryFailure(responseMessages.CONFIRM_USER_FAILURE);
  }
  return confirmedUser;
};
