import * as configs from "../configs.js";
import { getAxios, axiosDecorator } from "../utils/axios.js";

const questionAxios = await getAxios(configs.QUESTION_SERVICE_URI);

export const getAnyQuestion = async () => {
  const resQuestion = await axiosDecorator(questionAxios.get)("/");

  const { question } = resQuestion.data;
  return question;
};

export const getEasyQuestion = async (categories) => {
  const resQuestion = await axiosDecorator(questionAxios.get)("/easy", {
    params: { categories },
  });

  const { question } = resQuestion.data;
  return question;
};

export const getMediumQuestion = async (categories) => {
  const resQuestion = await axiosDecorator(questionAxios.get)("/medium", {
    params: { categories },
  });

  const { question } = resQuestion.data;
  return question;
};

export const getHardQuestion = async (categories) => {
  const resQuestion = await axiosDecorator(questionAxios.get)("/hard", {
    params: { categories },
  });

  const { question } = resQuestion.data;
  return question;
};

export const getSearchQuestions = async (searchTerm) => {
  const resQuestions = await axiosDecorator(questionAxios.get)("/search", {
    params: { searchTerm },
  });

  const { questions } = resQuestions.data;
  return questions;
};
