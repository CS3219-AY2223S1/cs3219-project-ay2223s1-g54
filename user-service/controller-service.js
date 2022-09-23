import * as constants from "./constants.js";
import * as orm from "./model/user-orm.js";

export const setDefaultResponseHeaders = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
};

export const getUserId = async (req, res) => {
  const { email } = req.query;
  try {
    const id = await orm.getUserId(email);
    return res.status(constants.STATUS_OK).json({ result: id });
  } catch (err) {
    return res.sendStatus(err.message);
  }
};

export const createUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    await orm.createUser(email, username, password);
    return res.sendStatus(constants.STATUS_OK);
  } catch (err) {
    return res.sendStatus(err.message);
  }
};

export const updateUserPassword = async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;
  try {
    await orm.updateUserPassword(id, oldPassword, newPassword);
    return res.sendStatus(constants.STATUS_OK);
  } catch (err) {
    return res.sendStatus(err.message);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    await orm.deleteUser(id);
    return res.sendStatus(constants.STATUS_OK);
  } catch (err) {
    return res.sendStatus(err.message);
  }
};

export const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const match = await orm.verifyUser(email, password);
    return res.status(constants.STATUS_OK).json({ result: match });
  } catch (err) {
    return res.sendStatus(err.message);
  }
};

export const throwInvalidRequest = async (req, res) => {
  throw new Error("Invalid request");
};
