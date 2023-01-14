import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3000/api" });

instance.interceptors.request.use(
  function (req) {
    if (localStorage.token) {
      req.headers.common["Authorization"] = "Bearer " + localStorage.token;
    }

    return req;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
