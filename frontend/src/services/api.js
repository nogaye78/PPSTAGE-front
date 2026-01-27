import axios from 'axios';

// Détection automatique de l'environnement
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://red-product-backend-w5ko.onrender.com'
  : 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  // ✅ Important pour les cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // 10 secondes
});

// Intercepteur pour gérer les erreurs globalement
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Non authentifié - redirection nécessaire');
      // Vous pouvez rediriger vers /login ici
    }
    return Promise.reject(error);
  }
);

export default api;