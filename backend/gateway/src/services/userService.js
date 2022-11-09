import { getAxios, axiosDecorator } from "../utils/axios.js";
import * as configs from "../configs.js";

const userAxios = await getAxios(configs.USER_SERVICE_URI);

export const createUser = async (email, username, password) => {
  await axiosDecorator(userAxios.post)("/", { email, username, password });
};

export const updateUser = async (userId, oldPassword, newPassword) => {
  await axiosDecorator(userAxios.put)("/", {
    userId,
    oldPassword,
    newPassword,
  });
};

export const deleteUser = async (userId) => {
  await axiosDecorator(userAxios.delete)(`/${userId}`);
};

export const emailVerifyingUser = async (confirmationCode) => {
  await axiosDecorator(userAxios.get)(`/confirm/${confirmationCode}`);
};

export const sendResetPasswordLinkUser = async (email) => {
  await axiosDecorator(userAxios.post)("/passwordReset", { email });
};

export const resetPasswordUser = async (userId, token, newPassword) => {
  await axiosDecorator(userAxios.post)(`/passwordReset/${userId}/${token}`, {
    newPassword,
  });
};
