import * as statusCodes from "../constants/statusCodes.js";

export class CompromisedAccessToken extends Error {
  constructor(message) {
    super(message);
    this.name = "CompromisedAccessToken";
    this.httpStatusCode = statusCodes.FORBIDDEN;
  }
}
