import * as statusCodes from "../constants/statusCodes.js";

export class UserNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFound";
    this.httpStatusCode = statusCodes.NOT_FOUND;
  }
}
