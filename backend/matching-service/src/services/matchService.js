import * as matchRepo from "../db/repositories/match.js";

export const findMatch = async (difficulty, userId, username) => {
  const matchEntry = await matchRepo.getNextAvailableMatch(difficulty, userId);
  if (!matchEntry) {
    // create entry for user and wait for "matched" event
    await matchRepo.createMatch(difficulty, userId, username);
    return null;
  }

  // there's a match, set entry's userId2 and username2
  matchEntry.userId2 = userId;
  matchEntry.username2 = username;
  await matchEntry.save();
  return matchEntry;
};
