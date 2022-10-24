import { decodeToken } from "react-jwt";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "./useAuth";
import { URI_GATEWAY, URL_AUTH_SVC_REFRESH_USER } from "../configs";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    // Refresh endpoint need to check
    const axiosInstance = axios.create({
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    const response = await axiosInstance.post(URL_AUTH_SVC_REFRESH_USER);

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
