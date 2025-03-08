import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Asegurar que corre en el puerto correcto
    esbuild: {
      loader: "jsx", // 🔥 Permitir JSX en archivos .js
    },
  },
});