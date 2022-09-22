import "dotenv/config";

export const PORT = process.env.PORT || 8001;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "key1";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "key2";
