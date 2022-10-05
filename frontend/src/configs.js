const URI_GATEWAY =
  process.env.REACT_APP_URI_GATEWAY || "http://localhost:8010";

const PREFIX_AUTH_SVC = "/auth";
const PREFIX_USER_SVC = "/user";
const PREFIX_MATCHING_SVC = "/matching";
const PREFIX_QUESTION_SVC = "/question";

export const URL_AUTH_SVC_LOGIN_USER = URI_GATEWAY + PREFIX_AUTH_SVC + "/login";
export const URL_USER_SVC_CREATE_USER = URI_GATEWAY + PREFIX_USER_SVC + "/";

// export const URL_MATCHING_SVC = URI_MATCHING_SVC + PREFIX_MATCHING_SVC;
// export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
