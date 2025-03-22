import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // Assuming your server runs on port 5000
});

// Add a request interceptor to automatically include token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
