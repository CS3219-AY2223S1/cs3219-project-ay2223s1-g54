import express from "express";
import cors from "cors";
import { createServer } from "http";

import io from "./socket.js";
import { createMatchEntry } from "./controller/matching-controller.js";

const app = express();
const PORT = process.env.PORT || 8001;
const corsObject = {
  origin: true,
  credentials: true,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsObject)); // config cors so that front-end can use
app.options("*", cors(corsObject));

const router = express.Router();
router.get("/", (_, res) => res.send("Hello World from matching-service"));
router.post("/", createMatchEntry);

app.use("/api/matching", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

const httpServer = createServer(app);
io.init(httpServer);
io.get().on("connection", (socket) => {
  console.log(`New Client connected ${socket.id}`);

  socket.on("code-event1", ({ room_id, newCode }) => {
    io.get().sockets.in(room_id).emit("code-event", { newCode });
  });
});
httpServer.listen(PORT, () =>
  console.log(`matching-service listening on port ${PORT}`)
);
