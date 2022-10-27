export const EMAIL_SUBJECT_CONFIRMATION =
  "PeerPrep - Please confirm your account";
export const EMAIL_SUBJECT_RESET_PASSWORD = "PeerPrep - Password Reset";

export const generateConfirmAccountTemplate = (
  EMAIL_CONFIRMATION_URI,
  name,
  confirmationCode
) => {
  return `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for signing up with PeerPrep. Please confirm your email by clicking on the following link</p>
        <!-- We need to change this to a dynamic link ... -->
        <a href=${EMAIL_CONFIRMATION_URI}/${confirmationCode}> Click here</a>
        <p>Happy coding,<br>PeerPrep Team 54</p>
        </div>`;
};

export const generatePasswordResetTemplate = (name, passwordResetLink) => {
  return `<h1>Reset Your PeepPrep Password</h1>
  <h2>Hello ${name}</h2>
  <p>You are receiving this email because we received a password reset request for your account.<p>
  <p>Please click the link below to reset your password</p>
  <!-- We need to change this to a dynamic link ... -->
  <a href=${passwordResetLink}> Click here</a>
  <p>Happy coding,<br>PeerPrep Team 54</p>
  </div>`;
};
