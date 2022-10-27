const registerCommunicationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("receiveMessage", async (data) => {
    const { roomId, name, time, messageId, message } = JSON.parse(data);
    await sendMessage(defaultParams, roomId, name, time, messageId, message);
  });

  subClient.subscribe("receiveCallerSignal", async (data) => {
    const { roomId, signalData } = JSON.parse(data);
    await sendCallerSignal(defaultParams, roomId, signalData);
  });

  subClient.subscribe("receiveResponderSignal", async (data) => {
    const { roomId, signalData } = JSON.parse(data);
    await sendResponderSignal(defaultParams, roomId, signalData);
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

const sendCallerSignal = async (defaultParams, roomId, signalData) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = { roomId, signalData };
  io.sockets.in(roomId).emit("receiveCallerSignal", data);
};

const sendResponderSignal = async (defaultParams, roomId, signalData) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = { roomId, signalData };
  io.sockets.in(roomId).emit("receiveResponderSignal", data);
};

export { registerCommunicationHandlers };
