import express from "express";
import { questionRoute } from "./routes.js";
import { catchAllErrorHandler } from "./middlewares/errorHandlers.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(questionRoute);
app.use(catchAllErrorHandler);

export { app };
