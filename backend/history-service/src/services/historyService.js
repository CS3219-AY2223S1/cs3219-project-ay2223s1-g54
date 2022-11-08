import * as historyRepo from "../db/repositories/history.js";

export const createSubmission = async (userId, questionId, code) =>  {
  const createdSubmission = await historyRepo.createSubmission(userId, questionId, code);
  return createdSubmission;
}

export const getSubmissionHistory = async (userId, questionId, number) => {
  const submissionHistory = await historyRepo.getSubmissionHistory(userId, questionId, number);
  return submissionHistory;
}

export const getUserSubmissionHistory = async (userId, number) => {
  const userSubmissionHistory = await historyRepo.getUserSubmissionHistory(userId, number);
  return userSubmissionHistory;
}
