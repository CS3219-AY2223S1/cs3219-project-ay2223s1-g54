export const EMAIL_SUBJECT = "Please confirm your account for PeerPrep";
export const generateBodyTemplate = (
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
