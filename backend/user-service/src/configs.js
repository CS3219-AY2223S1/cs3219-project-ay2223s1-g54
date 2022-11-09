import "dotenv/config";

export const ENV = process.env.ENV || "PROD";
export const PORT = process.env.PORT || 8002;

export const DB_CLOUD_URI = process.env.DB_CLOUD_URI;
export const DB_LOCAL_URI = process.env.DB_LOCAL_URI;
export const MONGOGB_URI = ENV == "PROD" ? DB_CLOUD_URI : DB_LOCAL_URI;

export const EMAIL_CONFIRMATION_URI = process.env.EMAIL_CONFIRMATION_URI;
export const EMAIL_RESET_URI = process.env.EMAIL_RESET_URI;
export const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
export const EMAIL_CONFIRMATION_SECRET =
  process.env.EMAIL_CONFIRMATION_SECRET || "emailsecret";
export const EMAIL_MAILER = process.env.EMAIL_MAILER;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
