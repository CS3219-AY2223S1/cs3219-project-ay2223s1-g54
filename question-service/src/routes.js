import express from "express";
import * as difficultyIndex from "./enums/difficultyIndex.js";
import * as statusCodes from "./enums/statusCodes.js";
import { getRandomQuestion } from "./services/questionService.js";

const questionRoute = express.Router();

questionRoute.get("/", async (req, res) => {
  const question = await getRandomQuestion(difficultyIndex.ANY);
  return res.status(statusCodes.OK).json({ question });
});

questionRoute.get("/easy", async (req, res) => {
  const question = await getRandomQuestion(difficultyIndex.EASY);
  return res.status(statusCodes.OK).json({ question });
});

questionRoute.get("/medium", async (req, res) => {
  const question = await getRandomQuestion(difficultyIndex.MEDIUM);
  return res.status(statusCodes.OK).json({ question });
});

questionRoute.get("/hard", async (req, res) => {
  const question = await getRandomQuestion(difficultyIndex.HARD);
  return res.status(statusCodes.OK).json({ question });
});

export { questionRoute };
