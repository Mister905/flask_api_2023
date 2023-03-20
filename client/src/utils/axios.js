import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3000/api" });

instance.interceptors.request.use(
  function (config) {
    if (localStorage.token) {
      config.headers["Authorization"] = `Bearer ${localStorage.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
