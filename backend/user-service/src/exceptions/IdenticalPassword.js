import * as statusCodes from "../constants/statusCodes.js";

export class IdenticalPassword extends Error {
  constructor(message) {
    super(message);
    this.name = "IdenticalPassword";
    this.httpStatusCode = statusCodes.CONFLICT;
  }
}
