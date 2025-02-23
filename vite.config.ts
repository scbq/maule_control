import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Exportar configuración
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Permite acceder desde otra IP
    port: 3000,
    strictPort: true,
  },
});
