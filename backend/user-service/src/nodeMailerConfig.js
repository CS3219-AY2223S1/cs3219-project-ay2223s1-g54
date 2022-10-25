import * as nodemailer from "nodemailer";
import * as responseMessages from "./constants/responseMessages.js";
import {
  EMAIL_CONFIRMATION_URI,
  EMAIL_SERVICE,
  EMAIL_MAILER,
  EMAIL_PASSWORD,
} from "./configs.js";
import { MissingEnv } from "./exceptions/MissingEnv.js";
import {
  EMAIL_SUBJECT,
  generateBodyTemplate,
} from "./constants/emailTemplate.js";

export const sendConfirmationEmail = async (name, email, confirmationCode) => {
  if (
    !EMAIL_CONFIRMATION_URI ||
    !EMAIL_SERVICE ||
    !EMAIL_MAILER ||
    !EMAIL_PASSWORD
  ) {
    throw new MissingEnv(responseMessages.MISSING_MAILER_ENV);
  }

  const transport = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_MAILER,
      pass: EMAIL_PASSWORD,
    },
  });

  await transport.sendMail({
    from: EMAIL_MAILER,
    to: email,
    subject: EMAIL_SUBJECT,
    html: generateBodyTemplate(EMAIL_CONFIRMATION_URI, name, confirmationCode),
  });
};
