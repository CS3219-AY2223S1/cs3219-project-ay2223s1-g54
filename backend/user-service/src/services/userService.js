import bcrypt from "bcryptjs";
import * as userRepo from "../db/repositories/user.js";
import * as responseMessages from "../constants/responseMessages.js";
import { SALT_ROUNDS } from "../constants/bcrypt.js";
import { IdenticalPassword } from "../exceptions/IdenticalPassword.js";
import { InformationExists } from "../exceptions/InformationExists.js";
import { PasswordNotMatch } from "../exceptions/PasswordNotMatch.js";
import { RepositoryFailure } from "../exceptions/RepositoryFailure.js";
import { UserNotFound } from "../exceptions/UserNotFound.js";

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
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const createdUser = await userRepo.createUser(
      email,
      username,
      passwordHash
    );
    return createdUser;
  } catch (err) {
    throw new RepositoryFailure(responseMessages.CREATE_USER_FAILURE);
  }
};

export const updateUserPassword = async (userId, oldPassword, newPassword) => {
  if (oldPassword === newPassword) {
    throw new IdenticalPassword(responseMessages.PASSWORDS_IDENTICAL);
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

  const { passwordHash } = user;
  const passwordMatch = await bcrypt.compare(password, passwordHash);
  return passwordMatch;
};
