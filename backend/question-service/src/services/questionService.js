import * as responseMessages from "../constants/responseMessages.js";
import { difficultyEnum } from "../constants/difficultyEnum.js";
import { QuestionModel } from "../db/models/question.js";
import { NoQuestionEntries } from "../exceptions/NoQuestionEntries.js";

export const getRandomQuestion = async (index, categories) => {
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
  if (difficulty && categories) {
    searchCondition.difficulty = difficulty;
    searchCondition.categories = categories;
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

export const getCategories = async () => {
  const categories = new Set();
  const questions = await QuestionModel.find({});
  for (const question of questions) {
    const topicTags = question.topicTags;
    for (const topicTag of topicTags) {
      categories.add(topicTag.name);
    }
  }
  return Array.from(categories);
};
