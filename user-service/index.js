import express from "express";
import cors from "cors";
import user_controller from "./controller/user-controller.js";
import { PORT } from "./config.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.use("/api/user", user_controller).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});
app.use((err, req, res, next) => res.status(500).json({ error: err.message }));
app.listen(PORT, () => console.log(`user-service listening on port ${PORT}`));

export default app;
