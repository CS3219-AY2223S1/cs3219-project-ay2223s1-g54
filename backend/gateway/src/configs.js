import "dotenv/config";

export const ENV = process.env.ENV || "PROD";
export const PORT = process.env.PORT || 8000;

export const AUTH_SERVICE_URI =
  process.env.AUTH_SERVICE_URI || "http://localhost:8001";
export const USER_SERVICE_URI =
  process.env.USER_SERVICE_URI || "http://localhost:8002";
export const MATCHING_SERVICE_URI =
  process.env.MATCHING_SERVICE_URI || "http://localhost:8003";
export const QUESTION_SERVICE_URI =
  process.env.QUESTION_SERVICE_URI || "http://localhost:8004";
