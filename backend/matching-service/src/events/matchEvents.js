import { cancelMatch, findMatch } from "../services/matchService.js";

const registerMatchHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("findMatch", async (data) => {
    const { difficulty, userId, username } = JSON.parse(data);
    await findMatchEvent(defaultParams, difficulty, userId, username);
  });

  subClient.subscribe("cancelMatch", async (data) => {
    const { roomId } = JSON.parse(data);
    await cancelMatchEvent(defaultParams, roomId);
  });
};

const findMatchEvent = async (defaultParams, difficulty, userId, username) => {
  const [io, pubClient, subClient] = defaultParams;

  const matchEntry = await findMatch(difficulty, userId, username);
  if (!matchEntry.userId2 || !matchEntry.username2) {
    const { _id, userId1 } = matchEntry;
    const data = JSON.stringify({ id: _id, userId1 });
    await pubClient.publish("pendingMatch", data);
    return; // need to wait for next person to join
  }

  const { _id, userId1, userId2, username1, username2 } = matchEntry;

  const data = JSON.stringify({
    difficulty,
    id: _id,
    userId1,
    userId2,
    username1,
    username2,
  });
  await pubClient.publish("createSocketRoom", data);
};

const cancelMatchEvent = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;

  await cancelMatch(roomId);
};
export { registerMatchHandlers };
