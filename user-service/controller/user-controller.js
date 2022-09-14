import express from "express";
import {
  apiStatus,
  signupUser,
  loginUser,
  logoutUser,
  renewUser,
  updateUserPassword,
  deleteUser,
} from "./user-controller-service.js";

const user_controller = express.Router();

user_controller.get("/status", apiStatus);
user_controller.post("/signup", signupUser);
user_controller.post("/login", loginUser);
user_controller.post("/logout", logoutUser);
user_controller.post("/renew", renewUser);
user_controller.put("/update", updateUserPassword);
user_controller.delete("/delete", deleteUser);

export default user_controller;
