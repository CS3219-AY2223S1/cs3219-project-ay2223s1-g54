const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000'

const PREFIX_USER_SVC = '/api/user'
const CREATE_USER = '/signup'
const SIGN_IN_USER = '/login'

export const URL_USER_SVC_CREATE_USER = URI_USER_SVC + PREFIX_USER_SVC + CREATE_USER
export const URL_USER_SVC_SIGN_IN_USER = URI_USER_SVC + PREFIX_USER_SVC + SIGN_IN_USER
