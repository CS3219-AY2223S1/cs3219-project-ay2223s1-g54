import * as configs from "../configs.js";
import * as statusCodes from "../constants/statusCodes.js";
import { getAxios } from "../utils/axios.js";

export const verifyAccessToken = async (req, res, next) => {
  const accessToken = req.get("Authorization")?.split("Bearer ")[1];

  if (!accessToken) {
    return res.sendStatus(statusCodes.BAD_REQUEST);
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
        return res.sendStatus(statusCodes.GONE);
      }
    }
    return res.sendStatus(statusCodes.FORBIDDEN);
  }
};
