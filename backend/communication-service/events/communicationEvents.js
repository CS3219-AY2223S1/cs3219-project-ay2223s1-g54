const registerCommunicationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("sendMessage", async (data) => {
    await communicationEvent(data);
  });
};

const communicationEvent = async (data) => {
  const [io, pubClient, subClient] = defaultParams;

  await pubClient.publish("receiveMessage", data);
};

export { registerCommunicationHandlers };
