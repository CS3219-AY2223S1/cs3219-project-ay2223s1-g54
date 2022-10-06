import * as statusCodes from "../constants/statusCodes.js";

export class TokenGenerationFailure extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenGenerationFailure";
    this.httpStatusCode = statusCodes.INTERNAL_SERVER_ERROR;
  }
}
