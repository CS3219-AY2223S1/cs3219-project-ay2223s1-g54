import express from "express";
import asyncHandler from "express-async-handler";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import * as questionService from "../services/questionService.js";
import { MalformedRequest } from "../exceptions/MalformedRequest.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";

const questionRoutes = express.Router();

questionRoutes.get(
  "/random",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const { difficulty, categories } = req.query;
    const difficultyIdx = parseInt(difficulty);
    const categoriesArray = String(categories).split(",");
    
    // 0 = easy, 1 = medium, 2 = hard, 3 = any
    if (!difficultyIdx) {
      throw new MalformedRequest(responseMessages.MISSING_DIFFICULTY_FIELD);
    } else if (difficultyIdx < 0 || difficultyIdx > 3) {
      throw new MalformedRequest(responseMessages.OUT_OF_RANGE_DIFFICULTY);
    }

    //TODO throw error is category is empty

    let question;
    if (difficultyIdx == 1) {
      question = await questionService.getEasyQuestion(categoriesArray);
    } else if (difficultyIdx == 2) {
      question = await questionService.getMediumQuestion(categoriesArray);
    } else if (difficultyIdx == 3) {
      question = await questionService.getHardQuestion(categoriesArray);
    } else {
      question = await questionService.getAnyQuestion();
    }
    return res.status(statusCodes.OK).json({ question });
  })
);

questionRoutes.get(
  "/search",
  asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;
    let questions;
    questions = await questionService.getSearchQuestions(searchTerm);
    return res.status(statusCodes.OK).json({ questions });
  })
);

export { questionRoutes };
