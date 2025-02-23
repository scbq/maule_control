// 🔹 Verificar si la variable de entorno se está leyendo correctamente
if (import.meta.env.VITE_API_URL) {
  console.log("✅ Backend API URL en main.ts:", import.meta.env.VITE_API_URL);
} else {
  console.error("❌ ERROR: VITE_API_URL no está definida en .env");
}
