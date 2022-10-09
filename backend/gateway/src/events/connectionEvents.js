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

    socket.on(
      "sendLanguage",
      async ({ roomId, language }) =>
        await sendLanguage(defaultParams, roomId, language)
    );

    socket.on(
      "sendCurrentCode",
      async ({ roomId, code }) =>
        await sendCollaborationCode(defaultParams, roomId, code)
    );

    socket.on(
      "sendDrawing",
      async ({ roomId, x0, y0, x1, y1, color }) =>
        await sendDrawing(defaultParams, roomId, x0, y0, x1, y1, color)
    );

    socket.on(
      "sendClearDrawing",
      async ({ roomId }) => await sendClearDrawing(defaultParams, roomId)
    );

    socket.on(
      "sendLeaveRoom",
      async ({ roomId }) => await sendLeaveRoom(defaultParams, roomId)
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

const sendLanguage = async (defaultParams, roomId, language) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId, language });
  await pubClient.publish("sendLanguage", data);
};

const sendCollaborationCode = async (defaultParams, roomId, code) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId, code });
  await pubClient.publish("sendCurrentCode", data);
};

const sendDrawing = async (defaultParams, roomId, x0, y0, x1, y1, color) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId, x0, y0, x1, y1, color });
  await pubClient.publish("sendDrawing", data);
};

const sendClearDrawing = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId });
  await pubClient.publish("sendClearDrawing", data);
};

const sendLeaveRoom = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  const data = JSON.stringify({ roomId });
  await pubClient.publish("sendLeaveRoom", data);
};

export { registerConnectionHandlers };
