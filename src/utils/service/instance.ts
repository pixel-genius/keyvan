import { getToken } from "../cookie";
import axios from "axios";

export const coreApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const coreJsonApi = coreApi.create({
  headers: {
    "Content-Type": "application/json",
  },
});

coreApi.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
  }

  return config;
});

coreApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      window.location.pathname = "/auth/authenticate";
    }
    return Promise.reject(error);
  },
);
