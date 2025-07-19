import axios from "axios";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.defaults.withCredentials = true;

export default axiosInstance;
