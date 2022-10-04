import express from "express";
import asyncHandler from "express-async-handler";
import * as statusCodes from "../constants/statusCodes.js";
import { difficultyEnum } from "../constants/difficultyEnum.js";
import { getRandomQuestion } from "../services/questionService.js";

const questionRoutes = express.Router();

questionRoutes.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

questionRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const question = await getRandomQuestion(difficultyEnum.Any);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/easy",
  asyncHandler(async (req, res) => {
    const question = await getRandomQuestion(difficultyEnum.Easy);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/medium",
  asyncHandler(async (req, res) => {
    const question = await getRandomQuestion(difficultyEnum.Medium);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/hard",
  asyncHandler(async (req, res) => {
    const question = await getRandomQuestion(difficultyEnum.Hard);
    return res.status(statusCodes.OK).json({ question });
  })
);

export { questionRoutes };
