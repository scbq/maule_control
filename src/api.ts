import axios from "axios";

console.log("✅ Backend API URL en api.ts:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001", // Usa localhost si no encuentra la variable
});

export default api;
