import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// One static build: / (chooser), /v1/ and /v2/. base './' keeps every URL relative,
// so dist/ can be uploaded to any host or subfolder as-is.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v1: resolve(__dirname, 'v1/index.html'),
        v2: resolve(__dirname, 'v2/index.html'),
      },
    },
  },
})
