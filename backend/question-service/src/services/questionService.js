import * as responseMessages from "../constants/responseMessages.js";
import { difficultyEnum } from "../constants/difficultyEnum.js";
import { QuestionModel } from "../db/models/question.js";
import { NoQuestionEntries } from "../exceptions/NoQuestionEntries.js";

export const getRandomQuestion = async (index) => {
  const isEasy = index === difficultyEnum.Easy;
  const isMedium = index === difficultyEnum.Medium;
  const isHard = index === difficultyEnum.Hard;

  let difficulty = null;
  if (isEasy || isMedium || isHard) {
    difficulty = Object.keys(difficultyEnum).find(
      (key) => difficultyEnum[key] === index
    );
  }

  const searchCondition = {};
  if (difficulty) {
    searchCondition.difficulty = difficulty;
  }

  const questionCount = await QuestionModel.count(searchCondition);
  if (questionCount <= 0) {
    throw new NoQuestionEntries(responseMessages.NO_DATABASE_ENTRIES);
  }

  const randomIndex = Math.floor(Math.random() * questionCount);
  const question = await QuestionModel.findOne(searchCondition).skip(
    randomIndex
  );

  return question;
};

export const getQuestions = async (searchTerm) => {

  const searchCondition = {
    $text:
      {
        $search: searchTerm
      }
  };

  const questionCount = await QuestionModel.count(searchCondition);
  if (questionCount <= 0) {
    throw new NoQuestionEntries(responseMessages.NO_DATABASE_ENTRIES);
  }

  const questions = await QuestionModel.find(searchCondition);

  return questions;
};