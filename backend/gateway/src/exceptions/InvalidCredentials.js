import * as statusCodes from "../constants/statusCodes.js";

export class InvalidCredentials extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCredentials";
    this.httpStatusCode = statusCodes.UNAUTHORIZED;
  }
}
