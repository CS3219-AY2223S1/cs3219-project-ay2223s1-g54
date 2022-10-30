import * as statusCodes from "../constants/statusCodes.js";

export class TokenNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenNotFound";
    this.httpStatusCode = statusCodes.NOT_FOUND;
  }
}
