import * as statusCodes from "../constants/statusCodes.js";

export class ExpiredAccessToken extends Error {
  constructor(message) {
    super(message);
    this.name = "ExpiredAccessToken";
    this.httpStatusCode = statusCodes.GONE;
  }
}
