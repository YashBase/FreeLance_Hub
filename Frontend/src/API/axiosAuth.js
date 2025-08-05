import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "http://localhost:8080/api", // Auth service
});

export default axiosAuth;
