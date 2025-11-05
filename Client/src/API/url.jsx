import axios from 'axios';

// Utiliser HTTP pour le développement local
const API_BASE = import.meta.env.VITE_API_URL + 'api/' ; 

const api = axios.create({
  baseURL: API_BASE,
  // Activez ceci si vous utilisez des cookies/sessions côté API
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;