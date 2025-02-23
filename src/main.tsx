import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Verifica que la variable de entorno se está leyendo correctamente
console.log("Backend API URL en main.tsx:", import.meta.env.VITE_API_URL);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root'. Asegúrate de que el HTML tiene un elemento <div id='root'></div>.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
