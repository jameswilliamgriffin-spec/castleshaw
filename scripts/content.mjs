// The site's editable content: news stories and training courses and dates.
// With SANITY_PROJECT_ID set (in Vercel, or a local .env), it is read from Sanity at build time;
// otherwise from the files in the repository (v2/src/content/news/*.md and training.local.json).
// Either way it is written to v2/src/content/news.json and training.json, which the site reads.
// Run by scripts/gen-pages.mjs, so before every `npm run dev` and `npm run build`.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// "2024-03-14" → "14 March 2024"; with show "month" → "March 2024", "year" → "2024". "2024-03" and "2021" work too.
export function when(date, show) {
  const [y, m, d] = String(date).split('-').map(Number)
  if (show === 'year') return String(y)
  if (show === 'month') return [m && MONTHS[m - 1], y].filter(Boolean).join(' ')
  return [d, m && MONTHS[m - 1], y].filter(Boolean).join(' ')
}
const firstSentence = (t) => (t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').match(/^.*?[.!?](?=\s|$)/) || [t])[0]

/* ---------- from the repository ---------- */
function parseStory(file, text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error(`news: ${file} needs a front matter block between --- lines`)
  const meta = Object.fromEntries(m[1].split('\n').filter((l) => l.includes(':')).map((l) => {
    const i = l.indexOf(':')
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  }))
  for (const k of ['title', 'date']) if (!meta[k]) throw new Error(`news: ${file} is missing "${k}"`)
  const body = m[2].trim().split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)
  return { slug: file.replace(/\.md$/, ''), title: meta.title, date: meta.date, when: when(meta.date), imageKey: meta.image || null, imageUrl: null, alt: meta.alt || '', summary: meta.summary || firstSentence(body[0]), body }
}
function localNews(v2) {
  const dir = resolve(v2, 'src/content/news')
  return readdirSync(dir).filter((f) => f.endsWith('.md') && f !== 'README.md').map((f) => parseStory(f, readFileSync(resolve(dir, f), 'utf8')))
}
const localTraining = (v2) => JSON.parse(readFileSync(resolve(v2, 'src/content/training.local.json'), 'utf8'))

/* ---------- from Sanity ---------- */
async function groq(query, params = {}) {
  const id = process.env.SANITY_PROJECT_ID, ds = process.env.SANITY_DATASET || 'production'
  const q = new URLSearchParams({ query })
  for (const [k, v] of Object.entries(params)) q.set('$' + k, JSON.stringify(v))
  // the live API, not the cached CDN: a build runs straight after someone publishes, and must see the change
  const res = await fetch(`https://${id}.api.sanity.io/v2025-02-19/data/query/${ds}?${q}`)
  if (!res.ok) throw new Error(`Sanity answered ${res.status}`)
  return (await res.json()).result
}
// Sanity's rich text → plain paragraphs, with links written [like this](https://…) for the site to render.
const paragraphs = (blocks = []) => blocks.filter((b) => b._type === 'block').map((b) => {
  const links = Object.fromEntries((b.markDefs || []).filter((d) => d._type === 'link').map((d) => [d._key, d.href]))
  return (b.children || []).map((c) => {
    const href = (c.marks || []).map((k) => links[k]).find(Boolean)
    return href ? `[${c.text}](${href})` : c.text
  }).join('').trim()
}).filter(Boolean)

async function sanityNews() {
  const rows = await groq(`*[_type == "newsStory" && defined(slug.current) && !(_id in path("drafts.**"))] | order(date desc) {
    "slug": slug.current, title, date, dateShows, "imageUrl": image.asset->url, "alt": image.alt, summary, body }`)
  return rows.map((r) => {
    const body = paragraphs(r.body)
    return { slug: r.slug, title: r.title, date: r.date, when: when(r.date, r.dateShows || 'month'), imageKey: null, imageUrl: r.imageUrl ? `${r.imageUrl}?w=1400&fit=max&auto=format&q=75` : null, alt: r.alt || '', summary: r.summary || firstSentence(body[0] || ''), body }
  })
}
async function sanityTraining() {
  const today = new Date().toISOString().slice(0, 10)
  return groq(`{
    "courses": *[_type == "trainingCourse" && !(_id in path("drafts.**"))] | order(order asc) { "id": slug.current, name, length, "who": audience, "text": description, featured },
    "dates": *[_type == "trainingDate" && date >= $today && !(_id in path("drafts.**"))] | order(date asc) { date, time, venue, priceMember, priceStandard, status, "course": course->name, "courseId": course->slug.current }
  }`, { today })
}

/* ---------- write what the site reads ---------- */
export async function buildContent(v2) {
  let news, training, source = 'repository files'
  if (process.env.SANITY_PROJECT_ID) {
    try {
      ;[news, training] = await Promise.all([sanityNews(), sanityTraining()])
      source = `Sanity (${process.env.SANITY_PROJECT_ID})`
      // an empty project (before the content is imported) must not empty the live site
      if (!news.length && !training.courses.length) {
        console.warn('\n!! content: Sanity has no stories or courses yet. Building from the repository files instead.\n')
        news = training = undefined
        source = 'repository files'
      }
    } catch (e) {
      // the site still builds, from the repository's copy, but say so loudly in the build log
      console.warn(`\n!! content: could not read from Sanity (${e.message}). Building from the repository files instead.\n`)
    }
  }
  news ||= localNews(v2)
  training ||= localTraining(v2)
  news.sort((a, b) => String(b.date).localeCompare(String(a.date)))
  training.dates = (training.dates || []).map((d) => ({ ...d, when: when(d.date) }))
  writeFileSync(resolve(v2, 'src/content/news.json'), JSON.stringify(news, null, 2) + '\n')
  writeFileSync(resolve(v2, 'src/content/training.json'), JSON.stringify(training, null, 2) + '\n')
  console.log(`content: ${news.length} news stories, ${training.courses.length} courses, ${training.dates.length} course dates, from ${source}`)
  return news
}
