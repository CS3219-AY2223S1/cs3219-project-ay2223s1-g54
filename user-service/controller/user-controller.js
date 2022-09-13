import express from "express";
import {
  apiStatus,
  signupUser,
  loginUser,
  logoutUser,
  renewUser,
} from "./user-controller-service.js";

const user_controller = express.Router();

user_controller.get("/", apiStatus);
user_controller.post("/signup", signupUser);
user_controller.post("/login", loginUser);
user_controller.post("/logout", logoutUser);
user_controller.post("/renew", renewUser);

export default user_controller;
