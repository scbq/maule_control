import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Verifica que la variable de entorno se está leyendo correctamente
if (import.meta.env.VITE_API_URL) {
  console.log("✅ Backend API URL en main.tsx:", import.meta.env.VITE_API_URL);
} else {
  console.error("❌ ERROR: VITE_API_URL no está definida en .env");
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("❌ No se encontró el elemento con id 'root'. Asegúrate de que el HTML tiene un <div id='root'></div>.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
