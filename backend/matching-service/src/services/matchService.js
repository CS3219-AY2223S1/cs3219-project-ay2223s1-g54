import * as matchRepo from "../db/repositories/match.js";

export const findMatch = async (difficulty, userId) => {
  const matchEntry = matchRepo.getNextAvailableMatch(difficulty);
  if (!matchEntry) {
    // perspective 1
    // create entry for user and wait for "matched" event
    await matchRepo.createMatch(difficulty, userId);
    return null;
  }

  // perspective 2
  // there's a match, set entry's userId2 field with userId
  matchEntry.userId2 = userId;
  matchEntry.save();
  return matchEntry;
};
