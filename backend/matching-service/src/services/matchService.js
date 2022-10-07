import * as matchRepo from "../db/repositories/match.js";

export const findMatch = async (difficulty, userId) => {
  const matchEntry = await matchRepo.getNextAvailableMatch(difficulty, userId);
  if (!matchEntry) {
    // create entry for user and wait for "matched" event
    await matchRepo.createMatch(difficulty, userId);
    return null;
  }

  // there's a match, set entry's userId2 field with userId
  matchEntry.userId2 = userId;
  await matchEntry.save();
  return matchEntry;
};
