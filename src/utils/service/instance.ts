import axios from "axios";
import { getToken } from "../cookie";

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
  }
  return config;
});
