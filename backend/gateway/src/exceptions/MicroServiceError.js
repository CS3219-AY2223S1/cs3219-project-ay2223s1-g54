import * as statusCodes from "../constants/statusCodes.js";

export class MicroServiceError extends Error {
  constructor(httpStatusCode, message) {
    super(message);
    this.name = "MicroServiceError";
    this.httpStatusCode = httpStatusCode;
  }
}
