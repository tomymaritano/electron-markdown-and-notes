import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths"; // 🔥 Permitir alias de TypeScript

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@chakra-ui/react": "@chakra-ui/react", // ✅ Alias Correcto (Evita alias incorrectos)
    },
  },
});