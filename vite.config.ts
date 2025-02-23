import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log("⚙️ Cargando configuración VITE...");
console.log("🔹 API_URL antes de procesar:", process.env.VITE_API_URL);

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acceso desde otra IP
    port: 3000,
    strictPort: true,
  },
});
