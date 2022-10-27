const registerCommunicationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("sendMessage", async (data) => {
    await sendMessageEvent(defaultParams, data);
  });

  subClient.subscribe("sendCallerSignal", async (data) => {
    await sendCallerSignalEvent(defaultParams, data);
  });

  subClient.subscribe("sendResponderSignal", async (data) => {
    await sendResponderSignalEvent(defaultParams, data);
  });
};

const sendMessageEvent = async (defaultParams, data) => {
  const [io, pubClient, subClient] = defaultParams;

  await pubClient.publish("receiveMessage", data);
};

const sendCallerSignalEvent = async (defaultParams, data) => {
  const [io, pubClient, subClient] = defaultParams;

  await pubClient.publish("receiveCallerSignal", data);
};

const sendResponderSignalEvent = async (defaultParams, data) => {
  const [io, pubClient, subClient] = defaultParams;

  await pubClient.publish("receiveResponderSignal", data);
};

export { registerCommunicationHandlers };
