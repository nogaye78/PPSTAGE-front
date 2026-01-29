import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Axios instance pour inscription / login (pas besoin de token)
export const authAPI = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Axios instance pour toutes les requêtes protégées avec JWT
export const API = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
