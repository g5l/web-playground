import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'Inferno.createElement',
    jsxFragment: 'Inferno.Fragment'
  },
  server: {
    port: 5173
  }
});