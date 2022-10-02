import express from "express";
import * as statusCodes from "./enums/statusCodes.js";
import { getRandomQuestion } from "./services/questionService.js";

const questionRoute = express.Router();

questionRoute.get("/", async (req, res) => {
  const question = await getRandomQuestion();
  return res.status(statusCodes.OK).json({ question });
});

export { questionRoute };
