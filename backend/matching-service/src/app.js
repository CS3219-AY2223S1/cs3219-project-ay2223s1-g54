import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { REDIS_URI } from "./configs.js";
import { registerMatchHandlers } from "./events/matchEvents.js";

const httpServer = createServer();

const ioOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
const io = new Server(httpServer, ioOptions);

const pubClient = createClient({ url: REDIS_URI });
const subClient = pubClient.duplicate();

await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));
registerMatchHandlers(io, pubClient, subClient);

export { httpServer, io, pubClient, subClient };
