import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'X-Auth-Token': import.meta.env.VITE_API_KEY.trim()
  }
});

export default api;