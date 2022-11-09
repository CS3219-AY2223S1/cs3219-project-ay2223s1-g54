import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes.js";
import { catchAllErrorHandler } from "./middlewares/errorHandlers.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(authRoutes);
app.use(catchAllErrorHandler);

export { app };
