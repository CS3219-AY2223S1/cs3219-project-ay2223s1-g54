import express from "express";
import { authRoutes } from "./authRoutes.js";
import { userRoutes } from "./userRoutes.js";

const gatewayRoutes = express.Router();

gatewayRoutes.all((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

gatewayRoutes.use("/auth", authRoutes);
gatewayRoutes.use("/user", userRoutes);

export { gatewayRoutes };
