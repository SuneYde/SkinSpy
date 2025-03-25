import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Assuming your server runs on port 5000
});
