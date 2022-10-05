import express from "express";
import { authRoutes } from "./authRoutes.js";
import { userRoutes } from "./userRoutes.js";

const gatewayRoutes = express.Router();

gatewayRoutes.use("/auth", authRoutes);
gatewayRoutes.use("/user", userRoutes);

export { gatewayRoutes };
