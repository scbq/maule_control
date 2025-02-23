// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001", // Asegúrate de usar el puerto correcto
});

export default api;
