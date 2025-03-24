import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Assuming your server runs on port 5000
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
