import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { PAGES } from './v2/src/site.mjs'

// One static build: / (chooser), /v1/ and /v2/ with all its inner pages.
// base './' keeps every URL relative, so dist/ can be uploaded to any host or subfolder as-is.
// Inner page entries are generated from v2/src/site.mjs by scripts/gen-pages.mjs.
const inner = Object.fromEntries(PAGES.map((p) => ['v2-' + p.path.replace(/\/$/, '').replace(/\//g, '-'), resolve(__dirname, 'v2', p.path, 'index.html')]))

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v1: resolve(__dirname, 'v1/index.html'),
        v2: resolve(__dirname, 'v2/index.html'),
        ...inner,
      },
    },
  },
})
