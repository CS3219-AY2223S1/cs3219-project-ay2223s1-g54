import * as configs from "../configs.js";
import { getAxios, axiosDecorator } from "../utils/axios.js";

const questionAxios = await getAxios(configs.QUESTION_SERVICE_URI);

export const getAnyQuestion = async () => {
  const resQuestion = await axiosDecorator(questionAxios.get)("/");

  const { question } = resQuestion.data;
  return question;
};

export const getEasyQuestion = async () => {
  const resQuestion = await axiosDecorator(questionAxios.get)("/easy");

  const { question } = resQuestion.data;
  return question;
};

export const getMediumQuestion = async () => {
  const resQuestion = await axiosDecorator(questionAxios.get)("/medium");

  const { question } = resQuestion.data;
  return question;
};

export const getHardQuestion = async () => {
  const resQuestion = await axiosDecorator(questionAxios.get)("/hard");

  const { question } = resQuestion.data;
  return question;
};