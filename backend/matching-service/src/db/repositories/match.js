import { MatchModel } from "../models/match.js";

export const createMatch = async (difficulty, userId1) => {
  const createdMatch = await MatchModel.create({ difficulty, userId1 });
  return createdMatch;
};

export const getNextAvailableMatch = async (difficulty) => {
  const currDateTime = new Date().getTime();
  const earliestDateTime = new Date(currDateTime - 30000).getTime();
  const match = MatchModel.findOne({
    difficulty,
    createdAt: { $gte: earliestDateTime },
  });
  return match;
};
