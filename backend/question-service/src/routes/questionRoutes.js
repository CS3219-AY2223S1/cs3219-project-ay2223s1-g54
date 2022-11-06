import express from "express";
import asyncHandler from "express-async-handler";
import * as statusCodes from "../constants/statusCodes.js";
import { difficultyEnum } from "../constants/difficultyEnum.js";
import {
  getCategories,
  getRandomQuestion,
} from "../services/questionService.js";

const questionRoutes = express.Router();

questionRoutes.get(
  "/",
  asyncHandler(async (req, res) => {
    const { categories } = req.body;
    const question = await getRandomQuestion(difficultyEnum.Any);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/easy",
  asyncHandler(async (req, res) => {
    const { categories } = req.body;
    const question = await getRandomQuestion(difficultyEnum.Easy);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/medium",
  asyncHandler(async (req, res) => {
    const { categories } = req.body;
    const question = await getRandomQuestion(difficultyEnum.Medium);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/hard",
  asyncHandler(async (req, res) => {
    const { categories } = req.body;
    const question = await getRandomQuestion(difficultyEnum.Hard);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const categories = await getCategories();
    return res.status(statusCodes.OK).json({ categories });
  })
);

export { questionRoutes };
