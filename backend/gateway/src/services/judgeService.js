import { getAxios, axiosDecorator } from "../utils/axios.js";
import * as configs from "../configs.js";

const judgeAxios = await getAxios(configs.JUDGE_SERVICE_URI);

export const createSubmission = async (params) => {
  const res = await axiosDecorator(judgeAxios.post)("/submissions", params);
  const { token } = res.data;
  return token;
};

export const getSubmission = async (token) => {
  const res = await axiosDecorator(judgeAxios.get)(`/submissions/${token}`);
  return res.data;
};
