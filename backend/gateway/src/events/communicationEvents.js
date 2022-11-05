const registerCommunicationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("receiveMessage", async (data) => {
    const { roomId, name, time, messageId, message } = JSON.parse(data);
    await sendMessage(defaultParams, roomId, name, time, messageId, message);
  });

};

const sendMessage = async (
  defaultParams,
  roomId,
  name,
  time,
  messageId,
  message
) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = { roomId, name, time, messageId, message };
  io.sockets.in(roomId).emit("receiveMessage", data);
};


export { registerCommunicationHandlers };
