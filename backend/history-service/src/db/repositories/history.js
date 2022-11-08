import { HistoryModel } from "../models/history.js";

export const createSubmission = async (userId, questionId, code) => { 
  const createdSubmission = await  HistoryModel.create({ userId, questionId, code });
  return createdSubmission;
}

export const getSubmissionHistory = async (userId, questionId, number) => {
  const submissionHistory = await HistoryModel.find({ userId: userId, questionId: questionId})
                                              .sort({ createdAt: -1 })
                                              .limit(number)
  return submissionHistory;
}

export const getUserSubmissionHistory = async (userId) => {
  const userSubmissionHistory = await HistoryModel.find({ userId: userId })
                                                  .sort({ createdAt: -1 })
  return userSubmissionHistory;
}
