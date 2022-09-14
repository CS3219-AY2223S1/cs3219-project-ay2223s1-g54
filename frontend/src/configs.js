const URI_USER_SVC =
  process.env.REACT_APP_URI_USER_SVC || "http://localhost:8000";
export const URI_MATCHING_SVC =
  process.env.REACT_APP_URI_MATCHING_SVC || "http://localhost:8001";

const PREFIX_USER_SVC = "/api/users";
const PREFIX_MATCHING_SVC = "/api/matching";

const CREATE_USER = "/signup";
const SIGN_IN_USER = "/login";
const LOGOUT_USER = "/logout";
const DELETE_USER = "/delete";
const UPDATE_USER = "/update";

export const URL_USER_SVC_CREATE_USER =
  URI_USER_SVC + PREFIX_USER_SVC + CREATE_USER;
export const URL_USER_SVC_SIGN_IN_USER =
  URI_USER_SVC + PREFIX_USER_SVC + SIGN_IN_USER;
export const URL_USER_SVC_LOGOUT_USER =
  URI_USER_SVC + PREFIX_USER_SVC + LOGOUT_USER;
export const URL_USER_SVC_DELETE_USER =
  URI_USER_SVC + PREFIX_USER_SVC + DELETE_USER;
export const URL_USER_SVC_UPDATE_USER =
  URI_USER_SVC + PREFIX_USER_SVC + UPDATE_USER;

export const URL_MATCHING_SVC = URI_MATCHING_SVC + PREFIX_MATCHING_SVC;
export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
