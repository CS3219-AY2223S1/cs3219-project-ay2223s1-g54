import * as questionService from "../services/questionService.js";

const registerMatchHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("pendingMatch", async (data) => {
    const { id, userId1 } = JSON.parse(data);
    await pendingMatch(defaultParams, id, userId1);
  });

  subClient.subscribe("createSocketRoom", async (data) => {
    const { id, difficulty, userId1, userId2, username1, username2 } =
      JSON.parse(data);
    await createRoomSockets(
      defaultParams,
      id,
      difficulty,
      userId1,
      userId2,
      username1,
      username2
    );
  });
};

const pendingMatch = async (defaultParams, id, userId1) => {
  const [io, pubClient, subClient] = defaultParams;

  // get socketID of userID2 from redis map
  const socketId1 = await pubClient.hGet("userSocketMap", userId1);
  const socket1 = io.sockets.sockets.get(socketId1);

  // join room
  const roomId = id;
  socket1.join(roomId);

  io.sockets.in(roomId).emit("userPendingMatch", { roomId });
};

const createRoomSockets = async (
  defaultParams,
  id,
  difficulty,
  userId1,
  userId2,
  username1,
  username2
) => {
  const [io, pubClient, subClient] = defaultParams;

  // get socketID of userID2 from redis map
  const socketId2 = await pubClient.hGet("userSocketMap", userId2);
  const socket2 = io.sockets.sockets.get(socketId2);

  // join room
  const roomId = id;
  socket2.join(roomId);

  // prepare 2 questions for both users
  const questionSet = [];
  for (let i = 0; i < 2; i++) {
    let question;
    if (difficulty == 0) {
      question = await questionService.getEasyQuestion();
    } else if (difficulty == 1) {
      question = await questionService.getMediumQuestion();
    } else if (difficulty == 2) {
      question = await questionService.getHardQuestion();
    } else {
      question = await questionService.getAnyQuestion();
    }
    questionSet.push(question);
  }

  // ping for collaboration
  const collabData = {
    roomId,
    difficulty,
    userId1,
    userId2,
    username1,
    username2,
    questionSet,
  };
  io.sockets.in(roomId).emit("readyForCollab", collabData);
};

export { registerMatchHandlers };
