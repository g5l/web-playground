import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  plugins: [tailwindcss()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main:               resolve(__dirname, 'src/index.html'),
        'bem-vs-tailwind':  resolve(__dirname, 'src/bem-vs-tailwind/index.html'),
        'variant-prefixes': resolve(__dirname, 'src/variant-prefixes/index.html'),
        'apply-vs-extract': resolve(__dirname, 'src/apply-vs-extract/index.html'),
      },
    },
  },
})
