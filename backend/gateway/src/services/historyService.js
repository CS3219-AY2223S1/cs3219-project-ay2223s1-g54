import { getAxios, axiosDecorator } from "../utils/axios.js";
import * as configs from "../configs.js";

const judgeAxios = await getAxios(configs.HISTORY_SERVICE_URI);

export const createSubmission = async (userId, questionId, params) => {
  await axiosDecorator(judgeAxios.post)(`/submissions/${userId}/${questionId}`, params);
};

export const getSubmissionHistory = async (userId, questionId, number) => {
  const res = await axiosDecorator(judgeAxios.get)(`/submissions/${userId}/${questionId}`, {
    params: { number },
  });
  return res.data;
};

export const getUserSubmissionHistory = async (userId, number) => {
  const res = await axiosDecorator(judgeAxios.get)(`/submissions/${userId}`, {
    params: { number },
  });
  return res.data;
}
