import * as matchRepo from "../db/repositories/match.js";

export const findMatch = async (difficulty, userId, username, categories) => {
  const matchEntry = await matchRepo.getNextAvailableMatch(difficulty, userId, categories);
  if (!matchEntry) {
    // create entry for user and wait for "matched" event
    await matchRepo.createMatch(difficulty, userId, username, categories);
    return null;
  }

  // there's a match, set entry's userId2 and username2
  matchEntry.userId2 = userId;
  matchEntry.username2 = username;
  const newCatergories = matchEntry.categories.filter(value => categories.includes(value));
  console.log("new cat");
  console.log(newCatergories);
  matchEntry.categories = newCatergories;

  await matchEntry.save();
  return matchEntry;
};
