import axios from 'axios';
import { toast, TypeOptions } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.API_BASE_URL
});

const showToast = (message: string, type?: TypeOptions): void => {
  toast(message, { type, theme: 'colored', position: 'bottom-center' });
} 

api.interceptors.response.use(
  (response) => {
    showToast(response.statusText, 'success');
    return response
  },
  async (error) => {
    showToast(error.response?.data?.message ?? 'Unknown error', 'error');
    return await Promise.reject(error);
  }
);

export default api;