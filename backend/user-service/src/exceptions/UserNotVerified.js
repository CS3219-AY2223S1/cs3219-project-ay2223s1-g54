import * as statusCodes from "../constants/statusCodes.js";

export class UserNotVerified extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotVerified";
    this.httpStatusCode = statusCodes.UNAUTHORIZED;
  }
}
