import axios from "axios";
import { useAuth } from "./useAuth";
import { URL_AUTH_SVC_REFRESH_USER } from "../configs";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    // Refresh endpoint need to check
    const axiosInstance = axios.create({
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    const response = await axiosInstance.post(URL_AUTH_SVC_REFRESH_USER);
    auth.accessToken = response.data.accessToken;

    setAuth(auth);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
