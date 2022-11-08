import express from "express";
import asyncHandler from "express-async-handler";
import * as statusCodes from "../constants/statusCodes.js";
import { difficultyEnum } from "../constants/difficultyEnum.js";
import {
  getCategories,
  getRandomCatergoryQuestion,
  getRandomQuestion,
  getQuestions,
} from "../services/questionService.js";

const questionRoutes = express.Router();

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
    const data = req.query;
    const categories = data.categories;
    const question = await getRandomCatergoryQuestion(difficultyEnum.Easy, categories);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/medium",
  asyncHandler(async (req, res) => {
    const data = req.query;
    const categories = data.categories;
    const question = await getRandomCatergoryQuestion(difficultyEnum.Medium, categories);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/hard",
  asyncHandler(async (req, res) => {
    const data = req.query;
    const categories = data.categories;
    const question = await getRandomCatergoryQuestion(difficultyEnum.Hard, categories);
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/search",
  asyncHandler(async (req, res) => {
    const questions = await getQuestions(req.query.searchTerm);
    return res.status(statusCodes.OK).json({ questions });
  })
);

questionRoutes.get(
  "/easy/category",
  asyncHandler(async (req, res) => {
    const categories = await getCategories(difficultyEnum.Easy);
    return res.status(statusCodes.OK).json({ categories });
  })
);

questionRoutes.get(
  "/medium/category",
  asyncHandler(async (req, res) => {
    const categories = await getCategories(difficultyEnum.Medium);
    return res.status(statusCodes.OK).json({ categories });
  })
);

questionRoutes.get(
  "/hard/category",
  asyncHandler(async (req, res) => {
    const categories = await getCategories(difficultyEnum.Hard);
    return res.status(statusCodes.OK).json({ categories });
  })
);

export { questionRoutes };
