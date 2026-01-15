import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // autorise toutes les interfaces réseau
    port: 5173,        // vérifie que le port correspond à ton localhost
    strictPort: true,  // échoue si le port est occupé
  },
});
