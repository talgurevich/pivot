import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset paths relative so the built site works whether it is
// served from a domain root or a sub-folder on the server.
export default defineConfig({
  base: './',
  plugins: [react()],
});
