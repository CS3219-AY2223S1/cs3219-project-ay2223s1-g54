const registerCollaborationHandlers = async (io, pubClient, subClient) => {
  const defaultParams = [io, pubClient, subClient];

  subClient.subscribe("sendCurrentCode", async (data) => {
    const { roomId, code } = JSON.parse(data);
    await syncCollaborationCode(defaultParams, roomId, code);
  });

  subClient.subscribe("sendLeaveRoom", async (data) => {
    const { roomId } = JSON.parse(data);
    await syncLeaveRoom(defaultParams, roomId);
  });
};

const syncCollaborationCode = async (defaultParams, roomId, code) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = JSON.stringify({ roomId, code });
  await pubClient.publish("receiveCurrentCode", data);
};

const syncLeaveRoom = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;

  const data = JSON.stringify({ roomId });
  await pubClient.publish("receiveLeaveRoom", data);
};

export { registerCollaborationHandlers };
