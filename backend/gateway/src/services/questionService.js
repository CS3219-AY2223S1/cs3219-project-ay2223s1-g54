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

export const getSearchQuestions = async (searchTerm) => {
  const resQuestions = await axiosDecorator(questionAxios.get)("/search", {
    params: { searchTerm },
  });

  const { questions } = resQuestions.data;
  return questions;
};

export const getAllQuestions = async () => {
  const resQuestions = await axiosDecorator(questionAxios.get)("/all");

  const { questions } = resQuestions.data;
  return questions;
};

export const getSearchQuestionById = async (id) => {
  const resQuestions = await axiosDecorator(questionAxios.get)("/id", {
    params: { id },
  });

  const { question } = resQuestions.data;
  return question;
};
