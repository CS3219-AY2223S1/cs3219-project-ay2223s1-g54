import "dotenv/config";

export const ENV = process.env.ENV || "PROD";
export const PORT = process.env.PORT || 8001;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "key1";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "key2";
