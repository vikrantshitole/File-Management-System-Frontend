import axios from 'axios';
import { showErrorToast } from '../utils/toast';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Handle errors globally
    console.error('API Error:', error.response);
    showErrorToast(error?.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default instance;
