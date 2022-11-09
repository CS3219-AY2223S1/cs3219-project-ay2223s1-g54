import express from "express";
import asyncHandler from "express-async-handler";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import { MalformedRequest } from "../exceptions/MalformedRequest.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import {
  createSubmission,
  getSubmissionHistory,
  getUserSubmissionHistory,
} from "../services/historyService.js";
const historyRoutes = express.Router();

historyRoutes.post(
  "/submissions/:userId/:questionId",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const questionId = req.params.questionId;
    await createSubmission(userId, questionId, req.body);
    res.sendStatus(statusCodes.OK);
  })
);

historyRoutes.get(
  "/submissions/:userId/:questionId",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const questionId = req.params.questionId;
    const number = req.query.number;

    if(!number) {
      throw new MalformedRequest(responseMessages.MISSING_QUERY_PARAM_NUMBER);
    }

    const submissionHistory = await getSubmissionHistory(
      userId,
      questionId,
      number
    );
    res.status(statusCodes.OK).json(submissionHistory);
  })
);

historyRoutes.get(
  "/submissions/:userId",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const number = req.query.number;

    if (!number) {
      throw new MalformedRequest(responseMessages.MISSING_QUERY_PARAM_NUMBER);
    }

    const userSubmissionHistory = await getUserSubmissionHistory(userId, number);
    res.status(statusCodes.OK).json(userSubmissionHistory);
  })
);

export { historyRoutes };
