import axios from "axios";
import { API_URL } from "./APIs";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Accept: "application/json",
      // 'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );