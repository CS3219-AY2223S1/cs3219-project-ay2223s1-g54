import { QuestionModel } from "../db/models/Question.js";
import { NoQuestionEntries } from "../exceptions/NoQuestionEnties.js";

export const getRandomQuestion = async () => {
  const questionCount = await QuestionModel.count();
  if (questionCount <= 0) {
    throw new NoQuestionEntries();
  }

  const randomIndex = Math.floor(Math.random() * questionCount);
  const question = await QuestionModel.findOne().skip(randomIndex);

  return question;
};
