import axios from 'axios';

import { getToken } from './auth/store';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Accept = 'application/json';

  const token = getToken() ?? process.env.NEXT_PUBLIC_API_TOKEN;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
