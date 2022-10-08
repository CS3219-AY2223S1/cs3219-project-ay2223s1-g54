const registerCollaborationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("receiveCurrentCode", async (data) => {
    const { roomId, code } = JSON.parse(data);
    await receiveCollaborationCode(defaultParams, roomId, code);
  });
};

const receiveCollaborationCode = async (defaultParams, roomId, code) => {
  const [io, pubClient, subClient] = defaultParams;

  const codeData = { code };
  io.sockets.in(roomId).emit("receiveCurrentCode", codeData);
};

export { registerCollaborationHandlers };
