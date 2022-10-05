import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { gatewayRoutes } from "./routes/gatewayRoutes.js";
import { catchAllErrorHandler } from "./middlewares/errorHandlers.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options("*", cors());
app.use(gatewayRoutes);
app.use(catchAllErrorHandler);

export { app };
