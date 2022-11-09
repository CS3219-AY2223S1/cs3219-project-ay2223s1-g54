import express from "express";
import asyncHandler from "express-async-handler";
import * as statusCodes from "../constants/statusCodes.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { createSubmission, getSubmission } from "../services/judgeService.js";

const judgeRoutes = express.Router();

judgeRoutes.post(
  "/submissions",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const token = await createSubmission(req.body);
    res.status(statusCodes.OK).json({ token });
  })
);

judgeRoutes.get(
  "/submissions/:token",
  asyncHandler(verifyAccessToken),
  asyncHandler(async (req, res) => {
    const token = req.params.token;
    const submissionResult = await getSubmission(token);
    res.status(statusCodes.OK).json(submissionResult);
  })
);

export { judgeRoutes };