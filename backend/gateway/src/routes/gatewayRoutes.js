import express from "express";
import { authRoutes } from "./authRoutes.js";
import { userRoutes } from "./userRoutes.js";
import { questionRoutes } from "./questionRoutes.js";
import { judgeRoutes } from "./judgeRoutes.js";

const gatewayRoutes = express.Router();

gatewayRoutes.use("/auth", authRoutes);
gatewayRoutes.use("/user", userRoutes);
gatewayRoutes.use("/question", questionRoutes);
gatewayRoutes.use("/judge", judgeRoutes);

export { gatewayRoutes };
