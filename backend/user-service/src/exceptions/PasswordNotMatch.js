import * as statusCodes from "../constants/statusCodes.js";

export class PasswordNotMatch extends Error {
  constructor(message) {
    super(message);
    this.name = "PasswordNotMatch";
    this.httpStatusCode = statusCodes.FORBIDDEN;
  }
}
