import "dotenv/config";

export const ENV = process.env.ENV || "PROD";
export const PORT = process.env.PORT || 8000;

export const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";
export const FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
export const AUTH_SERVICE_URI =
  process.env.AUTH_SERVICE_URI || "http://localhost:8001";
export const USER_SERVICE_URI =
  process.env.USER_SERVICE_URI || "http://localhost:8002";
export const MATCHING_SERVICE_URI =
  process.env.MATCHING_SERVICE_URI || "http://localhost:8003";
export const QUESTION_SERVICE_URI =
  process.env.QUESTION_SERVICE_URI || "http://localhost:8004";
export const COLLABORATION_SERVICE_URI =
  process.env.COLLABORATION_SERVICE_URI || "http://localhost:8005";
export const COMMUNICATION_SERVICE_URI =
  process.env.COOMUNICATION_SERVICE_URI || "http://localhost:8006";

export const ioOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};

export const corsOptions = {
  origin: [FRONTEND_URI],
  credentials: true,
};
