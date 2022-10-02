import * as statusCodes from "../enums/statusCodes.js";

export class NoQuestionEntries extends Error {
  constructor(message) {
    super(message);
    this.name = "NoQuestionEnties";
    this.httpStatusCode = statusCodes.NOT_FOUND;
  }
}
