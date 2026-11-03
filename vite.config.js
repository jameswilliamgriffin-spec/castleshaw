import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, relative, dirname } from 'node:path'
import { PAGES } from './v2/src/site.mjs'

// One static build: /v2/ with all its inner pages, and / redirecting there (v1 and the chooser are retired).
// base './' keeps every URL relative, so dist/ can be uploaded to any host or subfolder as-is.
// Inner page entries are generated from v2/src/site.mjs by scripts/gen-pages.mjs.
const inner = Object.fromEntries(PAGES.map((p) => ['v2-' + p.path.replace(/\/$/, '').replace(/\//g, '-'), resolve(__dirname, 'v2', p.path, 'index.html')]))

// Preload the two Latin font files on every page, so headings don't reflow when the
// web font replaces the fallback (the variable width axis can't be matched by Arial).
const FONTS = [/bricolage-grotesque-latin-wght-normal-.*\.woff2$/, /literata-latin-wght-normal-.*\.woff2$/]
const preloadFonts = () => ({
  name: 'preload-fonts',
  enforce: 'post',
  transformIndexHtml(html, ctx) {
    if (!ctx.bundle || !relative(__dirname, ctx.filename).startsWith('v2/')) return html
    const files = Object.keys(ctx.bundle).filter((f) => FONTS.some((re) => re.test(f)))
    const from = dirname(relative(__dirname, ctx.filename))
    const tags = files.map((f) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${relative(from, f) || f}">`).join('')
    return html.replace('</title>', `</title>${tags}`)
  },
})

export default defineConfig({
  base: './',
  plugins: [react(), preloadFonts()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v2: resolve(__dirname, 'v2/index.html'),
        ...inner,
      },
    },
  },
})
