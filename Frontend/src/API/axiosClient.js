import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8081/api/client", // Client dashboard service
});

export default axiosClient;
