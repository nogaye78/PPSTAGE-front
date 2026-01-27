import axios from "axios";

// ✅ AJOUT : Détection automatique de l'environnement
const API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://red-product-backend-w5ko.onrender.com'
  : 'http://localhost:8000';

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/hotels/`,  // ✅ CORRIGÉ : /api/hotels/ au lieu de /api/auth/
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ nécessaire si tu utilises des cookies
});

export default API;