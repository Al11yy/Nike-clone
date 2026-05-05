import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// ==========================================
// GANTI 192.168.X.X PAKE IP WIFI LAPTOP LU!
// ==========================================
const baseURL = 'http://192.168.0.114/Nike_Clone_Web_App/public/api'; 

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Fitur otomatis nyelipin Token Login (Sanctum) kalau user udah login
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;