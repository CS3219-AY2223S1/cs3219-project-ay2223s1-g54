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

export const getCategories = async (index) => {
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

  const categories = new Set();

  const questions = await QuestionModel.find(searchCondition);
  for (const question of questions) {
    const topicTags = question.topicTags;
    for (const topicTag of topicTags) {
      categories.add(topicTag.name);
    }
  }
  return Array.from(categories).sort();
};

export const getRandomCatergoryQuestion = async (index, categories) => {
  const isEasy = index === difficultyEnum.Easy;
  const isMedium = index === difficultyEnum.Medium;
  const isHard = index === difficultyEnum.Hard;

  let difficulty = null;
  if (isEasy || isMedium || isHard) {
    difficulty = Object.keys(difficultyEnum).find(
      (key) => difficultyEnum[key] === index
    );
  }


  if (categories.length == 0) {
    throw new NoQuestionEntries(responseMessages.NO_DATABASE_ENTRIES);
  }
  const randomIndexCategory = Math.floor(Math.random() * categories.length);
  const category = categories[randomIndexCategory]

  const searchCondition = {};
  if (difficulty && category) {
    searchCondition.difficulty = difficulty;
    searchCondition.topicTags = { $elemMatch: { name: category}};
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