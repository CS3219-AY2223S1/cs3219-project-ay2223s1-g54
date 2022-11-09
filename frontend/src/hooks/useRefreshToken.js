import { decodeToken } from "react-jwt";
import { io } from "socket.io-client";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import { URI_GATEWAY, URL_AUTH_SVC_REFRESH_USER } from "../configs";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const axiosPublic = useAxiosPublic();

  const refresh = async () => {
    // Refresh endpoint need to check
    const response = await axiosPublic.post(URL_AUTH_SVC_REFRESH_USER);

    const { accessToken } = response.data;
    const { userId, username } = decodeToken(accessToken);

    const socket = io(URI_GATEWAY);
    socket.on("connect", () => {
      socket.emit("clientConnected", { socketId: socket.id, userId });
    });

    setAuth((prev) => {
      return {
        ...prev,
        accessToken,
        userId,
        username,
        socket,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
