import "dotenv/config";

export const ENV = process.env.ENV || "PROD";
export const PORT = process.env.PORT || 8006;

export const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";

export const ioOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
