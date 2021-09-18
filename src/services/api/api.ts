import axios from 'axios';
import { errorMessageResponseInterceptor, successMessageResponseInterceptor } from './interceptors';

const api = axios.create({
  baseURL: process.env.API_BASE_URL
});

api.interceptors.response.use(
  successMessageResponseInterceptor,
  errorMessageResponseInterceptor
);

export default api;