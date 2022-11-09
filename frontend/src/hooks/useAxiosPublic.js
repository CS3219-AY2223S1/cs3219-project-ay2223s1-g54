import axios from "axios";

const usePublicAxios = () => {
  return axios.create({
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
};

export default usePublicAxios;
