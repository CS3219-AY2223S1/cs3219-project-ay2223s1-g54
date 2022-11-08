import axios from "axios";
import { MicroServiceError } from "../exceptions/MicroServiceError.js";
import { UnknownError } from "../exceptions/UnknownError.js";

export const getAxios = async (url) => {
  const instance = axios.create({ baseURL: url });
  return instance;
};

export const axiosDecorator = (func) => {
  return async (...args) => {
    try {
      const result = await func.apply(this, args);
      return result;
    } catch (err) {
      if (err.response.status && err.response.data) {
        const { name, message } = err.response.data.error;
        throw new MicroServiceError(
          err.response.status,
          `[${name}] ${message}`
        );
      }
      throw new UnknownError(err.message);
    }
  };
};
