const registerCommunicationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("receiveMessage", async (data) => {
    const { roomId, messageId, name, message, time } = JSON.parse(data);
    await sendMessage(defaultParams, roomId, messageId, name, message, time);
  });
};

const sendMessage = async (defaultParams, roomId, messageId, name, message, time) => {
  const [io, pubClient, subClient] = defaultParams;

  const messageData = { roomId, messageId, name, message, time };
  // TODO: include question info in collabData
  console.log("communication");
  console.log(roomId);
  io.sockets.in(roomId).emit("receiveMessage", messageData);
};

export { registerCommunicationHandlers };
