export const URI_GATEWAY =
  process.env.REACT_APP_URI_GATEWAY || "http://localhost:8000";

export const PREFIX_AUTH_SVC = "/auth";
export const PREFIX_USER_SVC = "/user";
export const PREFIX_MATCHING_SVC = "/matching";
export const PREFIX_QUESTION_SVC = "/question";

export const URL_AUTH_SVC_LOGIN_USER = URI_GATEWAY + PREFIX_AUTH_SVC + "/login";
export const URL_AUTH_SVC_LOGOUT_USER =
  URI_GATEWAY + PREFIX_AUTH_SVC + "/logout";
export const URL_AUTH_SVC_REFRESH_USER =
  URI_GATEWAY + PREFIX_AUTH_SVC + "/renew";
export const URL_USER_SVC_CREATE_USER =
  URI_GATEWAY + PREFIX_USER_SVC + "/create";
export const URL_USER_SVC_UPDATE_USER =
  URI_GATEWAY + PREFIX_USER_SVC + "/update";
export const URL_USER_SVC_DELETE_USER =
  URI_GATEWAY + PREFIX_USER_SVC + "/delete";
