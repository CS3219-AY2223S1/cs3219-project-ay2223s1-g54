const registerCommunicationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("sendMessage", async (data) => {
    await sendMessageEvent(defaultParams, data);
  });

};

const sendMessageEvent = async (defaultParams, data) => {
  const [io, pubClient, subClient] = defaultParams;

  await pubClient.publish("receiveMessage", data);
};


export { registerCommunicationHandlers };
