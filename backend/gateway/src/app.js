import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URI } from "./configs.js";
import { gatewayRoutes } from "./routes/gatewayRoutes.js";
import { catchAllErrorHandler } from "./middlewares/errorHandlers.js";

const app = express();
const corsOptions = {
  origin: [FRONTEND_URI],
  credentials: true,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(gatewayRoutes);
app.use(catchAllErrorHandler);

export { app };
