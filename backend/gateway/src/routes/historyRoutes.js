import express from "express";
import asyncHandler from "express-async-handler";
import * as statusCodes from "../constants/statusCodes.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { createSubmission, getSubmissionHistory, getUserSubmissionHistory } from "../services/historyService.js";
const historyRoutes = express.Router();

historyRoutes.post(
  "/submissions/:userId/:questionId",
  // asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const questionId = req.params.questionId;
    await createSubmission(userId, questionId, req.body);
    res.status(statusCodes.OK);
  })
)

historyRoutes.get(
  "/submissions/:userId/:questionId/:number",
  // asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const questionId = req.params.questionId;
    const number = req.params.number;
    const submissionHistory = await getSubmissionHistory(userId, questionId, number);
    res.status(statusCodes.OK).json(submissionHistory);
  })
)

historyRoutes.get(
  "/submissions/:userId",
  // asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userSubmissionHistory = await getUserSubmissionHistory(userId);
    res.status(statusCodes.OK).json(userSubmissionHistory);
  })
)

export { historyRoutes };