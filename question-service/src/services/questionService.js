import * as difficultyIndex from "../enums/difficultyIndex.js";
import { QuestionModel } from "../db/models/Question.js";
import { NoQuestionEntries } from "../exceptions/NoQuestionEnties.js";

export const getRandomQuestion = async (index) => {
  let difficulty = null;
  if (index === difficultyIndex.EASY) {
    difficulty = "Easy";
  } else if (index === difficultyIndex.MEDIUM) {
    difficulty = "Medium";
  } else if (index === difficultyIndex.HARD) {
    difficulty = "Hard";
  }

  const searchCondition = {};
  if (difficulty) {
    searchCondition["difficulty"] = difficulty;
  }

  const questionCount = await QuestionModel.count(searchCondition);
  if (questionCount <= 0) {
    throw new NoQuestionEntries();
  }

  const randomIndex = Math.floor(Math.random() * questionCount);
  const question = await QuestionModel.findOne(searchCondition).skip(
    randomIndex
  );

  return question;
};
