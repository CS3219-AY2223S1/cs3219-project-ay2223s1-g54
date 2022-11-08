import axios from "axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const usePrivateAxios = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  const axiosPrivate = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 410 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );
  return axiosPrivate;
};

export default usePrivateAxios;
