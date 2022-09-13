export const ENV = process.env.ENV || "PROD";
export const PORT = process.env.PORT || 8000;

export const DB_CLOUD_URI = process.env.DB_CLOUD_URI;
export const DB_LOCAL_URI = process.env.DB_LOCAL_URI;
export const MONGOGB_URI = ENV == "PROD" ? DB_CLOUD_URI : DB_LOCAL_URI;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
