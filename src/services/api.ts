import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dummy.restapiexample.com/api/v1/',
});

export default api;