import * as questionService from "../services/questionService.js";

const registerMatchHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("createSocketRoom", async (data) => {
    const { difficulty, userId1, userId2, username1, username2, categories } =
      JSON.parse(data);
    await createRoomSockets(
      defaultParams,
      difficulty,
      userId1,
      userId2,
      username1,
      username2,
      categories
    );
  });
};

const createRoomSockets = async (
  defaultParams,
  difficulty,
  userId1,
  userId2,
  username1,
  username2,
  categories
) => {
  const [io, pubClient, subClient] = defaultParams;

  console.log(categories);

  // get socketIDs of both userIDs from redis map
  const socketId1 = await pubClient.hGet("userSocketMap", userId1);
  const socketId2 = await pubClient.hGet("userSocketMap", userId2);
  const socket1 = io.sockets.sockets.get(socketId1);
  const socket2 = io.sockets.sockets.get(socketId2);

  // create a room and group them together
  const roomId = `${socketId1}${socketId2}`;
  socket1.join(roomId);
  socket2.join(roomId);

  // prepare 2 questions for both users
  const questionSet = [];
  for (let i = 0; i < 2; i++) {
    let question;
    if (difficulty == 0) {
      question = await questionService.getEasyQuestion(categories);
    } else if (difficulty == 1) {
      question = await questionService.getMediumQuestion(categories);
    } else if (difficulty == 2) {
      question = await questionService.getHardQuestion(categories);
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
