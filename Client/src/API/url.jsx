import axios from 'axios';

// Utiliser HTTPS pour le développement local si nécessaire
const API_BASE = (import.meta.env.VITE_API_URL || 'https://127.0.0.1:8000').replace(/\/$/, '');

const api = axios.create({
  baseURL: API_BASE,
  // Activez ceci si vous utilisez des cookies/sessions côté API
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;