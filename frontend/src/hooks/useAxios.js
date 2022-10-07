import axios from "axios";
import { useAuth } from "./useAuth";

const usePublicAxios = () => {
  return axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};

const usePrivateAxios = () => {
  const { auth } = useAuth();
  return axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.accessToken}`,
    },
  });
};

export { usePublicAxios, usePrivateAxios };
