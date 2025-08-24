// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/clientservice/api', // Base URL up to /api
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
