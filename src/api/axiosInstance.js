// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // 백엔드 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
