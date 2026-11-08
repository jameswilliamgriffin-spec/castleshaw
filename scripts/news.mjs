// Reads the news stories (v2/src/content/news/*.md) and writes v2/src/content/news.json,
// newest first, which the site map (site.mjs) and the news pages read.
// Run by scripts/gen-pages.mjs, so before every `npm run dev` and `npm run build`.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// "2024-03-14" → "14 March 2024", "2024-03" → "March 2024", "2021" → "2021"
export function when(date) {
  const [y, m, d] = String(date).split('-').map(Number)
  return [d, m && MONTHS[m - 1], y].filter(Boolean).join(' ')
}

function parse(file, text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error(`news: ${file} needs a front matter block between --- lines`)
  const meta = Object.fromEntries(m[1].split('\n').filter((l) => l.includes(':')).map((l) => {
    const i = l.indexOf(':')
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  }))
  for (const k of ['title', 'date']) if (!meta[k]) throw new Error(`news: ${file} is missing "${k}"`)
  const body = m[2].trim().split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)
  const plain = body[0].replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  const summary = meta.summary || (plain.match(/^.*?[.!?](?=\s|$)/) || [plain])[0]
  return { slug: file.replace(/\.md$/, ''), title: meta.title, date: meta.date, when: when(meta.date), image: meta.image || null, alt: meta.alt || '', summary, body }
}

export function buildNews(v2) {
  const dir = resolve(v2, 'src/content/news')
  const posts = readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => parse(f, readFileSync(resolve(dir, f), 'utf8')))
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
  writeFileSync(resolve(v2, 'src/content/news.json'), JSON.stringify(posts, null, 2) + '\n')
  return posts
}
