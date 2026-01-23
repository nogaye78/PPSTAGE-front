import axios from "axios";

// L'URL de base contient déjà le préfixe API
const BASE_URL = "https://red-product-backend-w5ko.onrender.com/api/"; 

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access") || sessionStorage.getItem("access");
  
  // On ne joint pas le token pour login et register
  const isAuthRoute = req.url.includes("login") || req.url.includes("register");

  if (token && !isAuthRoute) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;