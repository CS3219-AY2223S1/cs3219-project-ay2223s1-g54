import express from "express";
import asyncHandler from "express-async-handler";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import * as historyService from "../services/historyService.js";
import { MalformedRequest } from "../exceptions/MalformedRequest.js";

const historyRoutes = express.Router();

historyRoutes.post(
  "/submission/:userId/:questionId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const questionId = req.params.questionId;
    const { code } = req.body;

    if (!code) {
      throw new MalformedRequest(responseMessages.MISSING_CODE_FIELD);
    }

    await historyService.createSubmission(userId, questionId, code);
    return res.sendStatus(statusCodes.OK);
  })
)

historyRoutes.get(
  "/submission/:userId/:questionId/:number",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const questionId = req.params.questionId;
    const number = req.params.number;

    const submissionHistory = await historyService.getSubmissionHistory(userId, questionId, number);
    return res.status(statusCodes.OK).json({ submissionHistory });
  })
)

export { historyRoutes };