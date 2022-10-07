import * as statusCodes from "../constants/statusCodes.js";

export class MalformedRequest extends Error {
  constructor(message) {
    super(message);
    this.name = "MalformedRequest";
    this.httpStatusCode = statusCodes.BAD_REQUEST;
  }
}
