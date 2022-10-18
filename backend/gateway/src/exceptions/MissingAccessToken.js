import * as statusCodes from "../constants/statusCodes.js";

export class MissingAccessToken extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingAccessToken";
    this.httpStatusCode = statusCodes.UNAUTHORIZED;
  }
}
