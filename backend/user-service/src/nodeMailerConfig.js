import * as nodemailer from "nodemailer";
import {
  EMAIL_CONFIRMATION_URI,
  GMAIL_MAILER,
  GMAIL_PASSWORD,
} from "./configs.js";

const user = GMAIL_MAILER;
const pass = GMAIL_PASSWORD;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export const sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: user,
    to: email,
    subject: "Please confirm your account for peerprep",
    html: `<h1>Email Confirmation</h1>
    <h2>Hello ${name}</h2>
    <p>Thank you for signing up with Peerprep. Please confirm your email by clicking on the following link</p>
    <!-- We need to change this to a dynamic link ... -->
    <a href=${EMAIL_CONFIRMATION_URI}/${confirmationCode}> Click here</a>
    <p>Happy coding,<br>Peerprep Team 54</p>
    </div>`,
  });
};
