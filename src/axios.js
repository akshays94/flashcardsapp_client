import axios from "axios";

export const withoutAuthAxios = axios.create({
  baseURL: `${process.env.VUE_APP_API_HOST}${process.env.VUE_APP_API_URL}`,
});

export const withAuthAxios = axios.create({
  baseURL: `${process.env.VUE_APP_API_HOST}${process.env.VUE_APP_API_URL}`,
});

withAuthAxios.interceptors.request.use(
  function(config) {
    config.headers["Authorization"] = `Bearer ${localStorage.token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
