const URI_USER_SVC = process.env.REACT_APP_URI_USER_SVC || 'http://localhost:8000'
export const URI_MATCHING_SVC = process.env.REACT_APP_URI_MATCHING_SVC || 'http://localhost:8001'

const PREFIX_USER_SVC = '/api/user'
const PREFIX_MATCHING_SVC = '/api/matching'

const CREATE_USER = '/signup'
const SIGN_IN_USER = '/login'

export const URL_USER_SVC_CREATE_USER = URI_USER_SVC + PREFIX_USER_SVC + CREATE_USER
export const URL_USER_SVC_SIGN_IN_USER = URI_USER_SVC + PREFIX_USER_SVC + SIGN_IN_USER
export const URL_MATCHING_SVC = URI_MATCHING_SVC + PREFIX_MATCHING_SVC
export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
