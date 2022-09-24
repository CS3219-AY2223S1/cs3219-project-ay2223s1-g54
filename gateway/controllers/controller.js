import express from "express";
import authController from "./auth-controller.js";
import userController from "./user-controller.js";

const controller = express.Router();

controller.all(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

controller.use("/auth", authController);
controller.use("/user", userController);

controller.all(async (req, res) => {
  throw new Error("Invalid request");
});

export default controller;
