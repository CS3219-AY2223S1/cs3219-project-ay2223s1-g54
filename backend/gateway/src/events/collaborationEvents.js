const registerCollaborationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("receiveLanguage", async (data) => {
    const { roomId, language } = JSON.parse(data);
    await receiveLanguage(defaultParams, roomId, language);
  });

  subClient.subscribe("receiveCurrentCode", async (data) => {
    const { roomId, code } = JSON.parse(data);
    await receiveCollaborationCode(defaultParams, roomId, code);
  });

  subClient.subscribe("receiveLeaveRoom", async (data) => {
    const { roomId } = JSON.parse(data);
    await receiveLeaveRoom(defaultParams, roomId);
  });
};

const receiveLanguage = async (defaultParams, roomId, language) => {
  const [io, pubClient, subClient] = defaultParams;

  const languageData = { language };
  io.sockets.in(roomId).emit("receiveLanguage", languageData);
};

const receiveCollaborationCode = async (defaultParams, roomId, code) => {
  const [io, pubClient, subClient] = defaultParams;

  const codeData = { code };
  io.sockets.in(roomId).emit("receiveCurrentCode", codeData);
};

const receiveLeaveRoom = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  io.sockets.in(roomId).emit("receiveLeaveRoom");
};

export { registerCollaborationHandlers };
