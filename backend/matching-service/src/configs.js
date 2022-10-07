import "dotenv/config";

export const ENV = process.env.ENV || "PROD";
export const PORT = process.env.PORT || 8003;

export const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";
export const DB_CLOUD_URI = process.env.DB_CLOUD_URI;
export const DB_LOCAL_URI = process.env.DB_LOCAL_URI;
export const MONGOGB_URI = ENV == "PROD" ? DB_CLOUD_URI : DB_LOCAL_URI;

export const ioOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};
