import express from "express";
import { authRoutes } from "./authRoutes.js";
import { userRoutes } from "./userRoutes.js";
import { questionRoutes } from "./questionRoutes.js";

const gatewayRoutes = express.Router();

gatewayRoutes.use("/auth", authRoutes);
gatewayRoutes.use("/user", userRoutes);
gatewayRoutes.use("/question", questionRoutes);

export { gatewayRoutes };
