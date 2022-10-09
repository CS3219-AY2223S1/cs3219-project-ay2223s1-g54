const registerCollaborationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("sendLanguage", async (data) => {
    const { roomId, language } = JSON.parse(data);
    await syncLanguage(defaultParams, roomId, language);
  });

  subClient.subscribe("sendCurrentCode", async (data) => {
    const { roomId, code } = JSON.parse(data);
    await syncCollaborationCode(defaultParams, roomId, code);
  });

  subClient.subscribe("sendDrawing", async (data) => {
    const { roomId, x0, y0, x1, y1, color } = JSON.parse(data);
    await syncDrawing(defaultParams, roomId, x0, y0, x1, y1, color);
  });

  subClient.subscribe("sendClearDrawing", async (data) => {
    const { roomId } = JSON.parse(data);
    await syncClearDrawing(defaultParams, roomId);
  });

  subClient.subscribe("sendLeaveRoom", async (data) => {
    const { roomId } = JSON.parse(data);
    await syncLeaveRoom(defaultParams, roomId);
  });
};

const syncLanguage = async (defaultParams, roomId, language) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = JSON.stringify({ roomId, language });
  await pubClient.publish("receiveLanguage", data);
};

const syncCollaborationCode = async (defaultParams, roomId, code) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = JSON.stringify({ roomId, code });
  await pubClient.publish("receiveCurrentCode", data);
};

const syncDrawing = async (defaultParams, roomId, x0, y0, x1, y1, color) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = JSON.stringify({ roomId, x0, y0, x1, y1, color });
  await pubClient.publish("receiveDrawing", data);
};

const syncClearDrawing = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = JSON.stringify({ roomId });
  await pubClient.publish("receiveClearDrawing", data);
};

const syncLeaveRoom = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = JSON.stringify({ roomId });
  await pubClient.publish("receiveLeaveRoom", data);
};

export { registerCollaborationHandlers };
