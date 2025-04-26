import axios from 'axios';
import { showErrorToast } from '../utils/toast';
import authService from './auth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(config => {
  config.headers['X-API-KEY'] = import.meta.env.VITE_API_KEY;

  // Add auth token if available
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle errors globally
    console.error('API Error:', error.response);
    if (
      error &&
      error.response &&
      error.response.data &&
      (error.response.data.statusCode === 401 || error.response.data.status === 403)
    ) {
      authService.removeToken();
      throw error.response.data;
    }
    showErrorToast(error?.response?.data?.message || error.message);
    throw error?.response.data;
  }
);

export default instance;
