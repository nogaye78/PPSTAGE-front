import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://red-product-backend-w5ko.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
