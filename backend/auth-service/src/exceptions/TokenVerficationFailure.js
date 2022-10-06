import * as statusCodes from "../constants/statusCodes.js";

export class TokenVerficationFailure extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenVerficationFailure";
    this.httpStatusCode = statusCodes.UNAUTHORIZED;
  }
}
