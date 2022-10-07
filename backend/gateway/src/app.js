import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";
import { REDIS_URI, corsOptions, ioOptions } from "./configs.js";
import { registerConnectionHandlers } from "./events/connectionEvents.js";
import { registerMatchHandlers } from "./events/matchEvents.js";
import { gatewayRoutes } from "./routes/gatewayRoutes.js";
import { catchAllErrorHandler } from "./middlewares/errorHandlers.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, ioOptions);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(gatewayRoutes);
app.use(catchAllErrorHandler);

const pubClient = createClient({ url: REDIS_URI });
const subClient = pubClient.duplicate();
await pubClient.connect();
await subClient.connect();

io.adapter(createAdapter(pubClient, subClient));
registerConnectionHandlers(io, pubClient, subClient);
registerMatchHandlers(io, pubClient, subClient);

export { httpServer };
