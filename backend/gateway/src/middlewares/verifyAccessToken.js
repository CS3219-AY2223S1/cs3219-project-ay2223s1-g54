import * as configs from "../configs.js";
import * as responseMessages from "../constants/responseMessages.js";
import * as statusCodes from "../constants/statusCodes.js";
import { CompromisedAccessToken } from "../exceptions/CompromisedAccessToken.js";
import { ExpiredAccessToken } from "../exceptions/ExpiredAccessToken.js";
import { MissingAccessToken } from "../exceptions/MissingAccessToken.js";
import { UnknownError } from "../exceptions/UnknownError.js";
import { getAxios } from "../utils/axios.js";

export const verifyAccessToken = async (req, res, next) => {
  const accessToken = req.get("Authorization")?.split("Bearer ")[1];

  if (!accessToken) {
    throw new MissingAccessToken(responseMessages.MISSING_ACCESS_TOKEN_HEADER);
  }

  try {
    const authAxios = await getAxios(configs.AUTH_SERVICE_URI);
    const resVerify = await authAxios.post("/verify", { accessToken });
    const { userId } = resVerify.data;

    req.body.userId = userId;
    next();
  } catch (err) {
    if (err.response) {
      if (err.response.status === statusCodes.GONE) {
        throw new ExpiredAccessToken(
          responseMessages.EXPIRED_ACCESS_TOKEN_HEADER
        );
      }
      throw new CompromisedAccessToken(
        responseMessages.COMPROMISED_ACCESS_TOKEN_HEADER
      );
    }
    throw new UnknownError(err.message);
  }
};
