import * as statusCodes from "../constants/statusCodes.js";

export class RepositoryFailure extends Error {
  constructor(message) {
    super(message);
    this.name = "RepositoryFailure";
    this.httpStatusCode = statusCodes.INTERNAL_SERVER_ERROR;
  }
}
