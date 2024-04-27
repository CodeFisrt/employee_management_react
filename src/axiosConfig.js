// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://freeapi.gerasim.in/api/'
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add authorization token to request headers
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Transform response data if needed
    return response;
  },
  (error) => {
    // Handle errors globally
    return Promise.reject(error);
});

export default instance;
