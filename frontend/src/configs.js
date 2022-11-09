export const URI_GATEWAY =
  process.env.REACT_APP_URI_GATEWAY || "http://localhost:8000";

export const PREFIX_AUTH_SVC = "/auth";
export const PREFIX_USER_SVC = "/user";
export const PREFIX_MATCHING_SVC = "/matching";
export const PREFIX_QUESTION_SVC = "/question";
export const PREFIX_JUDGE_SVC = "/judge";
export const PREFIX_HISTORY_SVC = "/history";

export const URL_AUTH_SVC_LOGIN_USER = URI_GATEWAY + PREFIX_AUTH_SVC + "/login";
export const URL_AUTH_SVC_LOGOUT_USER =
  URI_GATEWAY + PREFIX_AUTH_SVC + "/logout";
export const URL_AUTH_SVC_REFRESH_USER =
  URI_GATEWAY + PREFIX_AUTH_SVC + "/renew";
export const URL_USER_SVC_CREATE_USER =
  URI_GATEWAY + PREFIX_USER_SVC + "/create";
export const URL_USER_SVC_EMAIl_VERIFY_USER =
  URI_GATEWAY + PREFIX_USER_SVC + "/confirm";
export const URL_USER_SVC_UPDATE_USER =
  URI_GATEWAY + PREFIX_USER_SVC + "/update";
export const URL_USER_RESET_PASSWORD =
  URI_GATEWAY + PREFIX_USER_SVC + "/passwordReset";
export const URL_USER_SVC_DELETE_USER =
  URI_GATEWAY + PREFIX_USER_SVC + "/delete";
export const URL_JUDGE_SVC_SUBMISSION =
  URI_GATEWAY + PREFIX_JUDGE_SVC + "/submissions";
export const URL_QUESTION_SVC_GET_ALL_QUESTION =
  URI_GATEWAY + PREFIX_QUESTION_SVC + "/all";
export const URL_QUESTION_SVC_GET_QUESTION_BY_ID =
  URI_GATEWAY + PREFIX_QUESTION_SVC + "/id";
export const URL_HISTORY_SVC_USER_SUBMISSIONS =
  URI_GATEWAY + PREFIX_HISTORY_SVC + "/submissions";
