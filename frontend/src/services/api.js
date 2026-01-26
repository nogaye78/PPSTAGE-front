import axios from "axios";

// ✅ Utilise import.meta.env si tu es sur Vite, sinon garde la chaîne brute.
// ✅ On s'assure qu'il n'y a pas de slash à la fin pour éviter les erreurs 404.
const BASE_URL = import.meta.env?.VITE_API_URL || "https://red-product-backend-w5ko.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  // ✅ On récupère le token 'access' comme prévu
  const token = localStorage.getItem("access");
  
  // ✅ Vérification des routes publiques
  const isAuthRoute = req.url.includes("login") || req.url.includes("register");

  if (token && !isAuthRoute) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

export default API;