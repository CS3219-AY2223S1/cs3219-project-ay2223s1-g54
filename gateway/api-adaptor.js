import axios from "axios";

const getAxios = async (url) => {
  const instance = axios.create({ baseURL: url });
  return instance;
};

export default getAxios;
