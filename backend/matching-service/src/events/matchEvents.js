import { findMatch } from "../services/matchService.js";

const registerMatchHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("findMatch", async (data) => {
    const { difficulty, userId, username, categories } = JSON.parse(data);
    await findMatchEvent(defaultParams, difficulty, userId, username, categories);
  });
};

const findMatchEvent = async (defaultParams, difficulty, userId, username, userCategories) => {
  const [io, pubClient, subClient] = defaultParams;

  const matchEntry = await findMatch(difficulty, userId, username, userCategories);
  if (!matchEntry) {
    return; // need to wait for next person to join
  }

  const { userId1, userId2, username1, username2, categories } = matchEntry;

  const data = JSON.stringify({
    difficulty,
    userId1,
    userId2,
    username1,
    username2,
    categories,
  });
  await pubClient.publish("createSocketRoom", data);
};

export { registerMatchHandlers };
