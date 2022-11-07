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
    const { difficulty } = req.query;
    const difficultyIdx = parseInt(difficulty);

    // 0 = easy, 1 = medium, 2 = hard, 3 = any
    if (!difficultyIdx) {
      throw new MalformedRequest(responseMessages.MISSING_DIFFICULTY_FIELD);
    } else if (difficultyIdx < 0 || difficultyIdx > 3) {
      throw new MalformedRequest(responseMessages.OUT_OF_RANGE_DIFFICULTY);
    }

    let question;
    if (difficultyIdx == 1) {
      question = await questionService.getEasyQuestion();
    } else if (difficultyIdx == 1) {
      question = await questionService.getMediumQuestion();
    } else if (difficultyIdx == 1) {
      question = await questionService.getHardQuestion();
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
