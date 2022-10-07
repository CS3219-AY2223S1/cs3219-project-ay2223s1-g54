const registerMatchHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("createSocketRoom", async (data) => {
    const { difficulty, userId1, userId2 } = JSON.parse(data);
    await createRoomSockets(defaultParams, difficulty, userId1, userId2);
  });
};

const createRoomSockets = async (
  defaultParams,
  difficulty,
  userId1,
  userId2
) => {
  const [io, pubClient, subClient] = defaultParams;

  // get socketIDs of both userIDs from redis map
  const socketId1 = await pubClient.hGet("userSocketMap", userId1);
  const socketId2 = await pubClient.hGet("userSocketMap", userId2);
  const socket1 = io.sockets.sockets.get(socketId1);
  const socket2 = io.sockets.sockets.get(socketId2);

  // create a room and group them together
  const roomId = `${socketId1}${socketId2}`;
  socket1.join(roomId);
  socket2.join(roomId);

  // ping for collaboration
  const collabData = { difficulty, userId1, userId2 };
  // TODO: include question info in collabData
  console.log("readyForCollab", { difficulty, userId1, userId2, roomId });
  io.sockets.in(roomId).emit("readyForCollab", collabData);
};

export { registerMatchHandlers };
