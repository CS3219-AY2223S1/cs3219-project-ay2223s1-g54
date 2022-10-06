import {
  createMatchEntry,
  listValidMatchEntriesByDifficulty,
} from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateMatchEntry(
  email,
  difficulty,
  start_time,
  socket_id
) {
  try {
    await createMatchEntry({ email, difficulty, start_time, socket_id });
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new match entry");
    return false;
  }
}

export async function ormListValidMatchEntriesByDifficulty(
  difficulty,
  start_time
) {
  try {
    const newMatchEntry = await listValidMatchEntriesByDifficulty({
      difficulty,
      start_time,
    });
    return newMatchEntry;
  } catch (err) {
    console.log("ERROR: Could not find match entries");
    return false;
  }
}
