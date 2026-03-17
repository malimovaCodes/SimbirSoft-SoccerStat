import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'X-Auth-Token': import.meta.env.VITE_API_KEY.trim()
  }
});

export default api;