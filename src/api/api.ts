import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
