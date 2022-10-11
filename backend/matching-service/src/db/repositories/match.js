import { MatchModel } from "../models/match.js";

export const createMatch = async (difficulty, userId1, username1) => {
  const createdMatch = await MatchModel.create({
    difficulty,
    userId1,
    username1,
  });
  return createdMatch;
};

export const getNextAvailableMatch = async (difficulty, userId) => {
  const currDateTime = new Date().getTime();
  const earliestDateTime = new Date(currDateTime - 30000).getTime();

  // delete any existing user entries within the waiting period
  await MatchModel.deleteMany({
    difficulty,
    userId1: { $eq: userId },
    createdAt: { $gte: earliestDateTime },
    userId2: { $eq: null },
  });

  // find other entry that is looking for a user to match
  const match = await MatchModel.findOne({
    difficulty,
    userId1: { $ne: userId },
    createdAt: { $gte: earliestDateTime },
    userId2: { $eq: null },
  });
  return match;
};
