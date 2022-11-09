import * as statusCodes from "../constants/statusCodes.js";

export class FieldValidationFailure extends Error {
  constructor(message) {
    super(message);
    this.name = "FieldValidationFailure";
    this.httpStatusCode = statusCodes.BAD_REQUEST;
  }
}
