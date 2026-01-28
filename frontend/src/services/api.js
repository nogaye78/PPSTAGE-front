// api.js ou apiConfig.js
import axios from 'axios';

// Configuration de base
const api = axios.create({
  baseURL: 'https://red-product-backend-w5ko.onrender.com',
  withCredentials: true,  // ✅ CRUCIAL : Permet l'envoi des cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Fonction pour récupérer le CSRF token depuis les cookies
function getCsrfToken() {
  const name = 'csrftoken';
  let cookieValue = null;
  
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  
  return cookieValue;
}

// ✅ Intercepteur pour ajouter le CSRF token à TOUTES les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajouter le CSRF token pour toutes les méthodes sauf GET
    if (config.method !== 'get') {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Fonction pour initialiser le CSRF token (appeler au démarrage de l'app)
export async function initCsrf() {
  try {
    // Faire une requête GET pour obtenir le cookie CSRF
    await api.get('/api/hotels/');
    console.log('✅ CSRF token récupéré');
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du CSRF token:', error);
  }
}

// ✅ Fonctions d'API
export const auth = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/api/hotels/register/', userData);
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/api/hotels/login/', credentials);
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    const response = await api.post('/api/hotels/logout/');
    return response.data;
  },

  // Récupérer l'utilisateur connecté
  me: async () => {
    const response = await api.get('/api/hotels/me/');
    return response.data;
  },
};

// ✅ API Hotels
export const hotels = {
  getAll: async () => {
    const response = await api.get('/api/hotels/');
    return response.data;
  },

  getOne: async (id) => {
    const response = await api.get(`/api/hotels/${id}/`);
    return response.data;
  },

  create: async (hotelData) => {
    const response = await api.post('/api/hotels/', hotelData);
    return response.data;
  },

  update: async (id, hotelData) => {
    const response = await api.put(`/api/hotels/${id}/`, hotelData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/hotels/${id}/`);
    return response.data;
  },
};

export default api;