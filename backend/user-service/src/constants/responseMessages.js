export const MISSING_USER_ID_FIELD = "The userId field is missing";
export const MISSING_EMAIL_FIELD = "The email field is missing";
export const MISSING_USERNAME_FIELD = "The username field is missing";
export const MISSING_PASSWORD_FIELD = "The password field is missing";
export const MISSING_NEW_PASSWORD_FIELD = "The new password field is missing";

export const GET_USER_BY_ID_FAILURE =
  "There is a problem retrieving the user by userId";
export const GET_USER_BY_EMAIL_FAILURE =
  "There is a problem retrieving the user by email";
export const GET_USER_BY_CONFIRMATION_CODE_FAILURE =
  "There is a problem retrieving the user by confirmation code";
export const GET_EMAIL_EXISTS_FAILURE =
  "There is a problem checking if the email exists";
export const GET_USER_EXISTS_FAILURE =
  "There is a problem checking if the user exists";
export const CREATE_USER_FAILURE = "There is a problem creating the user";
export const UPDATE_USER_FAILURE = "There is a problem updating the user";
export const DELETE_USER_FAILURE = "There is a problem deleting the user";
export const CONFIRM_USER_FAILURE = "There is a problem confirming the user";

export const USER_NOT_FOUND = "There is not such user";
export const EMAIL_ALREADY_EXISTS = "The email was already taken";
export const USERNAME_ALREADY_EXISTS = "The username was already taken";
export const PASSWORDS_IDENTICAL = "The old and new passwords were identical";
export const PASSWORD_DOES_NOT_MATCH = "The password does not match";

export const EMAIL_VALIDATION_FAIL =
  "The email specified is not an NUS school email";
export const USERNAME_VALIDATION_FAIL =
  "The username specified does not start with an alphabet, follow by alphanumeric characters with total length between 6 to 18 characters";
export const PASSWORD_VALIDATION_FAIL =
  "The password does not contain alphanumeric characters of between 8 to 16 characters long";

export const USER_NOT_EMAIL_VERIFIED =
  "Please verify your Email before logging in";
export const USER_EMAIL_VERIFIED =
  "Account successfully verified, you can login now";
export const USER_ALREADY_EMAIL_VERIFIED = "Account is already verified";

export const MISSING_MAILER_ENV =
  "The mailer environment variables are missing";

export const GET_TOKEN_BY_USER_ID_FAILURE =
  "There is a problem retrieving the token by user id";
export const TOKEN_NOT_FOUND = "There is not such token";

export const CREATE_TOKEN_FAILURE = "There is a problem creating the token";
export const DELETE_TOKEN_FAILURE = "There is a problem deleting the token";
export const USER_RESET_EMAIL_SENT =
  "Reset password Email has been sent to your account";
