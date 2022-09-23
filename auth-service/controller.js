import express from "express";
import * as service from "./controller-service.js";

const controller = express.Router();

controller.all(service.setDefaultResponseHeaders);
controller.post("/generateToken", service.generateAccessToken);
controller.post("/renewToken", service.renewAccessToken);
controller.post("/revokeToken", service.revokeAccessToken);
controller.all(service.throwInvalidRequest);

export default controller;
