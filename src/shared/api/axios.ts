import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
  return config;
});