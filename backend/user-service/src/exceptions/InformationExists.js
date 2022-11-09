import * as statusCodes from "../constants/statusCodes.js";

export class InformationExists extends Error {
  constructor(message) {
    super(message);
    this.name = "InformationExists";
    this.httpStatusCode = statusCodes.CONFLICT;
  }
}
