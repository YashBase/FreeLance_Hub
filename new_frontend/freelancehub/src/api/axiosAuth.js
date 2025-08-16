// src/api/axiosAuth.js
import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: 'http://localhost:8081/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosAuth;
