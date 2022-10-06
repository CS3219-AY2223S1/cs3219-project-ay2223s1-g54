import * as statusCodes from "../constants/statusCodes.js";

export class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnknownError";
    this.httpStatusCode = statusCodes.INTERNAL_SERVER_ERROR;
  }
}
