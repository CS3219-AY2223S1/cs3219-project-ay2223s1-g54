import * as statusCodes from "../constants/statusCodes.js";

export const catchAllErrorHandler = async (err, req, res, next) => {
  if (!err) {
    return next();
  }

  let statusCode = statusCodes.INTERNAL_SERVER_ERROR;
  if (err?.httpStatusCode) {
    statusCode = err.httpStatusCode;
  }

  const responseData = {
    error: {
      name: err.name,
      message: err.message,
    },
  };
  return res.status(statusCode).json(responseData);
};
