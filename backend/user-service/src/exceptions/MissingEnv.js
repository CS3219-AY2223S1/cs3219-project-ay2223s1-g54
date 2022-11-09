import * as statusCodes from "../constants/statusCodes.js";

export class MissingEnv extends Error {
  constructor(message) {
    super(message);
    this.name = "MissingEnv";
    this.httpStatusCode = statusCodes.BAD_REQUEST;
  }
}
