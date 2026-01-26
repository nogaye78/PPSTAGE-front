import axios from "axios";

// Retirer le dernier slash ici pour éviter les doubles slashs plus tard
const BASE_URL = "https://red-product-backend-w5ko.onrender.com/api"; 

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  // ✅ Harmonise le nom de la clé avec HotelModal (ex: 'access')
  const token = localStorage.getItem("access");
  
  const isAuthRoute = req.url.includes("login") || req.url.includes("register");

  if (token && !isAuthRoute) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;