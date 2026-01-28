// utils/api.js ou votre fichier d'API
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://red-product-backend-w5ko.onrender.com',
  withCredentials: true,  // ✅ Important pour les cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

// ✅ Ajouter automatiquement le CSRF token à chaque requête
api.interceptors.request.use((config) => {
  // Récupérer le CSRF token depuis les cookies
  const csrfToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }
  
  return config;
});

// Fonction de login
export const login = async (credentials) => {
  const response = await api.post('/api/hotels/login/', credentials);
  return response.data;
};

// Fonction de register
export const register = async (userData) => {
  const response = await api.post('/api/hotels/register/', userData);
  return response.data;
};