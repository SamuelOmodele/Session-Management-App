import axios from "axios";
import { getAccessToken } from "../helpers/token";

// Constants for configuration
const APP_KEY = "7ey11nw9zdsd33232Ldlfo6j6V4bZQ4594";
const DEVELOPMENT_HEADERS = {
  "ngrok-skip-browser-warning": ",", // Any value works for ngrok
};

export default function createAxiosInstance(instanceType) {
  // Define base headers
  const headers = {
    "X-APP-KEY": APP_KEY,
    ...(process.env.NODE_ENV === "development" && DEVELOPMENT_HEADERS), // Conditionally add dev headers
  };

  // Create Axios instance
  const axiosInstance = axios.create({
    baseURL: "https://a052-154-68-194-194.ngrok-free.app/",
    headers,
    validateStatus: (status) => status < 500, // Allow all status codes below 500
  });

  // Request interceptor to add Authorization header
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor to handle 401 unauthorized errors
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("userProfile");
        window.location.href = "/login/"; // Redirect to login routes
      }
      return Promise.reject(error); // Propagate the error
    }
  );

  return axiosInstance;
}
