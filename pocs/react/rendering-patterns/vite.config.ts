import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@templates': fileURLToPath(new URL('./src/templates', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@patterns': fileURLToPath(new URL('./src/patterns', import.meta.url)),
      '@antipatterns': fileURLToPath(new URL('./src/anti-patterns', import.meta.url))
    }
  }
});
