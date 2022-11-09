import * as statusCodes from "../constants/statusCodes.js";

export class UserAlreadyEmailVerified extends Error {
  constructor(message) {
    super(message);
    this.name = "UserAlreadyEmailVerified";
    this.httpStatusCode = statusCodes.CONFLICT;
  }
}
