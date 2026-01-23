import axios from "axios";

// 1. Remplace l'URL ci-dessous par ton URL Render réelle
const BASE_URL = "https://red-product-backend.onrender.com/api/"; 

const API = axios.create({
  baseURL: BASE_URL,
});

// Intercepteur pour ajouter le token JWT automatiquement
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;