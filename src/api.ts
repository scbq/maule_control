import axios from "axios";

// 🔹 Verificar si VITE_API_URL se está leyendo correctamente
if (import.meta.env.VITE_API_URL) {
  console.log("✅ Backend API URL en api.ts:", import.meta.env.VITE_API_URL);
} else {
  console.error("❌ ERROR: VITE_API_URL no está definida en .env");
}

// 🔹 Crear la instancia de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5001", // Usa localhost como fallback
});

export default api;
