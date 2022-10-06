import { findMatch } from "../services/matchService.js";

const registerMatchHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("findMatch", (difficulty, userId) =>
    findMatchEvent(defaultParams, difficulty, userId)
  );
};

const findMatchEvent = async (defaultParams, difficulty, userId) => {
  const [io, pubClient, subClient] = defaultParams;

  const matchEntry = await findMatch(difficulty, userId);
  if (!matchEntry) {
    return; // need to wait for next person to join
  }

  const { userId1, userId2 } = matchEntry;
  pubClient.publish("createSocketRoom", [userId1, userId2]);
};

export { registerMatchHandlers };
