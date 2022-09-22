import express from "express";
import * as service from "./controller-service.js";

const controller = express.Router();

controller.all(service.setDefaultResponseHeaders);
controller.get("/", service.getUserId);
controller.post("/", service.createUser);
controller.put("/", service.updateUserPassword);
controller.delete("/", service.deleteUser);
controller.get("/verify", service.verifyUser);
controller.all(service.throwInvalidRequest);

export default controller;
