import axios from "axios";

export const BASE_URL = "http://localhost:3100";

export function axiosClient() {
  let defaultOptions = {
    baseURL: BASE_URL,
  };
  let instance = axios.create(defaultOptions);
  instance.interceptors.request.use(function (config) {
    config.headers.common = {
      "x-auth-token": `${localStorage.getItem("token")}`,
    };
    return config;
  });
  return instance;
}
export default axiosClient;
