import "dotenv/config";

export const PORT = process.env.PORT || 8000;

export const AUTH_SERVICE_URI =
  process.env.AUTH_SERVICE_URL || "http://localhost:8001/api/auth";
export const USER_SERVICE_URI =
  process.env.USER_SERVICE_URL || "http://localhost:8002/api/user";
