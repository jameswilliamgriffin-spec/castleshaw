import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, relative, dirname } from 'node:path'
import { PAGES } from './v2/src/site.mjs'

// One static build of the site, served from the root: the homepage at /, inner pages at /<section>/…
// The source lives in v2/, which is Vite's root; public/ and the output folder sit beside it.
// base './' keeps every URL relative, so dist/ can be uploaded to any host or subfolder as-is.
// Inner page entries are generated from v2/src/site.mjs by scripts/gen-pages.mjs.
// (Version 1 and the version chooser are retired; v1/ is kept for reference and not built.)
const SRC = resolve(__dirname, 'v2')
const inner = Object.fromEntries(PAGES.map((p) => ['page-' + p.path.replace(/\/$/, '').replace(/\//g, '-'), resolve(SRC, p.path, 'index.html')]))

// Preload the two Latin font files on every page, so headings don't reflow when the
// web font replaces the fallback (the variable width axis can't be matched by Arial).
const FONTS = [/bricolage-grotesque-latin-wght-normal-.*\.woff2$/, /literata-latin-wght-normal-.*\.woff2$/]
const preloadFonts = () => ({
  name: 'preload-fonts',
  enforce: 'post',
  transformIndexHtml(html, ctx) {
    if (!ctx.bundle) return html
    const files = Object.keys(ctx.bundle).filter((f) => FONTS.some((re) => re.test(f)))
    const from = dirname(relative(SRC, ctx.filename))
    const tags = files.map((f) => `<link rel="preload" as="font" type="font/woff2" crossorigin href="${relative(from, f) || f}">`).join('')
    return html.replace('</title>', `</title>${tags}`)
  },
})

export default defineConfig({
  root: SRC,
  base: './',
  publicDir: resolve(__dirname, 'public'),
  envDir: __dirname,
  plugins: [react(), preloadFonts()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(SRC, 'index.html'),
        ...inner,
      },
    },
  },
})
