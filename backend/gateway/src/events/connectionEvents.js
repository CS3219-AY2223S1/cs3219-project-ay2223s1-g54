const registerConnectionHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  io.on("connection", async (socket) => {
    socket.on(
      "clientConnected",
      async ({ socketId, userId }) =>
        await clientConnectedEvent(defaultParams, socketId, userId)
    );

    socket.on(
      "clientDisconnected",
      async ({ userId }) => await clientDisconnectedEvent(defaultParams, userId)
    );

    socket.on(
      "findMatch",
      async ({ difficulty, userId }) =>
        await findMatchEvent(defaultParams, difficulty, userId)
    );
  });
};

const clientConnectedEvent = async (defaultParams, socketId, userId) => {
  const [io, pubClient, subClient] = defaultParams;
  await pubClient.hSet("userSocketMap", userId, socketId);
};

const clientDisconnectedEvent = async (defaultParams, userId) => {
  const [io, pubClient, subClient] = defaultParams;
  await pubClient.hDel("userSocketMap", userId);
};

const findMatchEvent = async (defaultParams, difficulty, userId) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ difficulty, userId });
  await pubClient.publish("findMatch", data);
};

export { registerConnectionHandlers };
