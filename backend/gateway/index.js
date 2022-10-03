import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as configs from "./configs.js";
import * as constants from "./constants.js";
import controller from "./controllers/controller.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.options("*", cors());
app.get("/", (req, res) => res.sendStatus(constants.STATUS_OK));
app.use("/api", controller);
app.all("*", (req, res) => res.sendStatus(constants.STATUS_NOT_FOUND));

app.use((err, req, res, next) => {
  const body = { error: err.message };
  res.status(constants.STATUS_INTERNAL_SERVER_ERROR).json(body);
  next(err);
});

app.listen(configs.PORT, () =>
  console.log(`gateway listening on port ${configs.PORT}`)
);

export default app;
