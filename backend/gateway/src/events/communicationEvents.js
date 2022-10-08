const registerCommunicationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("receiveMessage", async (data) => {
    const { roomId, name, message, time } = JSON.parse(data);
    await createRoomSockets(defaultParams, roomId, messageId, name, message, time);
  });
};

const createRoomSockets = async (defaultParams, roomId, messageId, name, message, time) => {
  const [io, pubClient, subClient] = defaultParams;

  const messageData = { difficulty, roomId, messageId, name, message, time };
  // TODO: include question info in collabData
  io.sockets.in(roomId).emit("receieveMessage", messageData);
};

export { registerCommunicationHandlers };
