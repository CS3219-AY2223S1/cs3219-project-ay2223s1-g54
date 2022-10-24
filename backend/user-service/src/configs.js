import "dotenv/config";

export const ENV = process.env.ENV || "PROD";
export const PORT = process.env.PORT || 8002;

export const DB_CLOUD_URI = process.env.DB_CLOUD_URI;
export const DB_LOCAL_URI = process.env.DB_LOCAL_URI;
export const MONGOGB_URI = ENV == "PROD" ? DB_CLOUD_URI : DB_LOCAL_URI;

export const EMAIL_CONFIRMATION_URI =
  process.env.EMAIL_CONFIRMATION_URI || "http://localhost:8002/confirm";
export const EMAIL_CONFIRMATION_SECRET = process.env.EMAIL_CONFIRMATION_SECRET;
export const GMAIL_MAILER = process.env.GMAIL_MAILER;
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
