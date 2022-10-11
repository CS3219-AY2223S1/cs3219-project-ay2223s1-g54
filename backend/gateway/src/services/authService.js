import * as configs from "../configs.js";
import * as responseMessages from "../constants/responseMessages.js";
import { InvalidCredentials } from "../exceptions/InvalidCredentials.js";
import { getAxios, axiosDecorator } from "../utils/axios.js";

const authAxios = await getAxios(configs.AUTH_SERVICE_URI);
const userAxios = await getAxios(configs.USER_SERVICE_URI);

export const loginUser = async (email, password) => {
  const resMatch = await axiosDecorator(userAxios.post)("/verify", {
    email,
    password,
  });

  const { match } = resMatch.data;
  if (!match) {
    throw new InvalidCredentials(responseMessages.INVALID_CREDENTIALS);
  }

  const resUserId = await axiosDecorator(userAxios.get)("/", {
    params: { email },
  });
  const { userId, username } = resUserId.data;

  const resToken = await axiosDecorator(authAxios.post)("/generate", {
    userId,
    username,
  });
  const { accessToken, refreshToken } = resToken.data;
  return { accessToken, refreshToken };
};

export const renewToken = async (refreshToken) => {
  const resToken = await axiosDecorator(authAxios.post)("/renew", {
    refreshToken,
  });
  const { accessToken } = resToken.data;
  return { accessToken };
};

export const logoutUser = async (refreshToken) => {
  await axiosDecorator(authAxios.post)("/revoke", { refreshToken });
};
