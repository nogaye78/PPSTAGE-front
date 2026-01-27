import axios from "axios";

// Détection automatique de l'environnement
const API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://red-product-backend-w5ko.onrender.com'  // ✅ Production
  : 'http://localhost:8000';  // ✅ Dev local

const API = axios.create({
  baseURL: `${API_BASE_URL}/api/hotels/`,  // ✅ Corrigé : pointe vers /api/hotels/
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  // ✅ Important pour les cookies de session
  timeout: 15000,  // 15 secondes
});

// Intercepteur pour gérer les erreurs
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('❌ Non authentifié');
      // Rediriger vers login si nécessaire
      // window.location.href = '/login';
    }
    
    if (error.response?.status === 403) {
      console.error('❌ Accès refusé');
    }
    
    return Promise.reject(error);
  }
);

export default API;