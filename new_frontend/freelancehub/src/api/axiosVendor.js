import axios from "axios";

const axiosVendor = axios.create({
  baseURL: "http://localhost:8080/vendorservice/api", // ✅ your backend vendor base URL
});

export default axiosVendor;
