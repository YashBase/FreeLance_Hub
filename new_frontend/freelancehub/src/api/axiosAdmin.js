// src/API/axiosAdmin.js
import axios from "axios";

const axiosAdmin = axios.create({
    baseURL: "https://localhost:8084/api/Admin", // Your controller base URL
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosAdmin;
