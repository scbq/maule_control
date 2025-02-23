import axios from "axios";

// Verificar si la variable de entorno se está leyendo correctamente
console.log("Backend API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001", // Usa localhost si no encuentra la variable
});

export default api;
