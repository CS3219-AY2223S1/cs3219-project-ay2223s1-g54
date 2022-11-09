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

  subClient.subscribe("receiveDrawing", async (data) => {
    const { roomId, strokeData } = JSON.parse(data);
    await receiveDrawing(defaultParams, roomId, strokeData);
  });

  subClient.subscribe("receiveUndoDrawing", async (data) => {
    const { roomId } = JSON.parse(data);
    await receiveUndoDrawing(defaultParams, roomId);
  });

  subClient.subscribe("receiveRedoDrawing", async (data) => {
    const { roomId } = JSON.parse(data);
    await receiveRedoDrawing(defaultParams, roomId);
  });

  subClient.subscribe("receiveClearDrawing", async (data) => {
    const { roomId } = JSON.parse(data);
    await receiveClearDrawing(defaultParams, roomId);
  });

  subClient.subscribe("receiveLeaveRoom", async (data) => {
    const { roomId } = JSON.parse(data);
    await receiveLeaveRoom(defaultParams, roomId);
  });

  subClient.subscribe("receiveSubmitCode", async (data) => {
    const { roomId } = JSON.parse(data);
    await receiveSubmitCode(io, roomId);
  })
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

const receiveDrawing = async (defaultParams, roomId, strokeData) => {
  const [io, pubClient, subClient] = defaultParams;

  const drawingData = { strokeData };
  io.sockets.in(roomId).emit("receiveDrawing", drawingData);
};

const receiveUndoDrawing = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  io.sockets.in(roomId).emit("receiveUndoDrawing");
};

const receiveRedoDrawing = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  io.sockets.in(roomId).emit("receiveRedoDrawing");
};

const receiveClearDrawing = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  io.sockets.in(roomId).emit("receiveClearDrawing");
};

const receiveLeaveRoom = async (defaultParams, roomId) => {
  const [io, pubClient, subClient] = defaultParams;
  io.sockets.in(roomId).emit("receiveLeaveRoom");
};

const receiveSubmitCode = async (io, roomId) => {
  io.sockets.in(roomId).emit("receiveSubmitCode");
}

export { registerCollaborationHandlers };
