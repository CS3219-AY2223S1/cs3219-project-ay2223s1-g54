import bcrypt from "bcryptjs";
import * as repository from "./repository.js";
import * as constants from "../constants.js";

const SALT_ROUNDS = 10;

export const getUserId = async (email) => {
  if (!email) {
    throw Error(constants.STATUS_BAD_REQUEST);
  }

  let user;
  try {
    user = await repository.getUserByEmail(email);
  } catch (err) {
    throw Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }

  if (!user) {
    throw Error(constants.STATUS_NOT_FOUND);
  }

  const { id } = user;
  if (!id) {
    throw Error(constants.STATUS_NOT_FOUND);
  }
  return id;
};

export const createUser = async (email, username, password) => {
  if (!email || !username || !password) {
    throw Error(constants.STATUS_BAD_REQUEST);
  }

  let emailExists, userExists;
  try {
    emailExists = await repository.emailExists(email);
    userExists = await repository.usernameExists(username);
  } catch (err) {
    throw Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }

  if (emailExists || userExists) {
    throw Error(constants.STATUS_CONFLICT);
  }

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const createdUser = await repository.createUser(
      email,
      username,
      passwordHash
    );
    return createdUser;
  } catch (err) {
    throw Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }
};

export const updateUserPassword = async (id, oldPassword, newPassword) => {
  if (!id || !oldPassword || !newPassword) {
    throw Error(constants.STATUS_BAD_REQUEST);
  }

  if (oldPassword === newPassword) {
    throw Error(constants.STATUS_CONFLICT);
  }

  let user;
  try {
    user = await repository.getUserById(id);
  } catch (err) {
    throw Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }

  if (!user) {
    throw Error(constants.STATUS_NOT_FOUND);
  }

  const { email, username, passwordHash } = user;

  let passwordMatch;
  try {
    passwordMatch = await bcrypt.compare(oldPassword, passwordHash);
  } catch (err) {
    return Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }

  if (!passwordMatch) {
    throw Error(constants.STATUS_FORBIDDEN);
  }

  try {
    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    const updatedUser = await repository.updateUser(
      id,
      email,
      username,
      passwordHash
    );
    return updatedUser;
  } catch (err) {
    throw Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }
};

export const deleteUser = async (id) => {
  if (!id) {
    throw Error(constants.STATUS_BAD_REQUEST);
  }

  try {
    const deletedUser = await repository.deleteUser(id);
    return deletedUser;
  } catch (err) {
    throw Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }
};

export const verifyUser = async (email, password) => {
  if (!email || !password) {
    throw Error(constants.STATUS_BAD_REQUEST);
  }

  let user;
  try {
    user = await repository.getUserByEmail(email);
  } catch (err) {
    throw Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }

  if (!user) {
    throw Error(constants.STATUS_NOT_FOUND);
  }

  try {
    const { passwordHash } = user;
    const passwordMatch = await bcrypt.compare(password, passwordHash);
    return passwordMatch;
  } catch (err) {
    throw Error(constants.STATUS_INTERNAL_SERVER_ERROR);
  }
};
