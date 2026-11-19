// The site's editable content: news stories, training courses and dates, the staff team, and the accreditation numbers.
// With SANITY_PROJECT_ID set (in Vercel, or a local .env), it is read from Sanity at build time;
// otherwise from the files in the repository (v2/src/content/news/*.md, training.local.json, staff.local.json).
// Either way it is written to v2/src/content/news.json, training.json and staff.json, which the site reads.
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
// photo: a path under public/ (the page adds the way back to the site root)
const localAccreditation = (v2) => JSON.parse(readFileSync(resolve(v2, 'src/content/accreditation.local.json'), 'utf8'))
const localStaff = (v2) => JSON.parse(readFileSync(resolve(v2, 'src/content/staff.local.json'), 'utf8'))
  .map((p) => ({ name: p.name, role: p.role || '', group: p.group || 'team', src: p.photo || null, alt: p.alt || '', pos: p.pos || '', about: p.about || '' }))

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

// Staff, in page order. A photo's crop is applied by Sanity's image service, and its hotspot
// (the face) becomes the point the site keeps in view when it cuts the oval.
async function sanityStaff() {
  const rows = await groq(`*[_type == "staffMember" && !(_id in path("drafts.**"))] | order(order asc, name asc) {
    name, role, group, about, "url": photo.asset->url, "dims": photo.asset->metadata.dimensions, "crop": photo.crop, "hotspot": photo.hotspot, "alt": photo.alt }`)
  const pct = (n) => `${Math.round(Math.min(1, Math.max(0, n)) * 100)}%`
  return rows.map((r) => {
    let src = null, pos = ''
    if (r.url) {
      const c = { top: 0, bottom: 0, left: 0, right: 0, ...(r.crop || {}) }
      const q = new URLSearchParams({ w: '900', fit: 'max', auto: 'format', q: '75' })
      if (r.dims && (c.top || c.bottom || c.left || c.right)) {
        const { width: w, height: h } = r.dims
        q.set('rect', [c.left * w, c.top * h, (1 - c.left - c.right) * w, (1 - c.top - c.bottom) * h].map(Math.round).join(','))
      }
      src = `${r.url}?${q}`
      if (r.hotspot) {
        const cw = 1 - c.left - c.right, ch = 1 - c.top - c.bottom
        pos = `${pct((r.hotspot.x - c.left) / cw)} ${pct((r.hotspot.y - c.top) / ch)}`
      }
    }
    return { name: r.name, role: r.role || '', group: r.group || 'team', src, alt: r.alt || '', pos, about: r.about || '' }
  })
}

// The licence and badge numbers: one record, with a fixed id.
const sanityAccreditation = () => groq(`*[_id == "accreditation"][0]{ aala, aalaCovers, lotc }`)

/* ---------- write what the site reads ---------- */
export async function buildContent(v2) {
  let news, training, staff, source = 'repository files', staffSource = 'repository files'
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
    // staff on its own: a project set up before staff moved to Sanity has stories but no staff yet
    try {
      staff = await sanityStaff()
      staffSource = `Sanity (${process.env.SANITY_PROJECT_ID})`
      if (!staff.length) {
        console.warn('\n!! content: Sanity has no staff yet. Building the team from the repository files instead.\n')
        staff = undefined
        staffSource = 'repository files'
      }
    } catch (e) {
      console.warn(`\n!! content: could not read staff from Sanity (${e.message}). Building the team from the repository files instead.\n`)
    }
  }
  staff ||= localStaff(v2)
  // accreditation: any field missing in Sanity keeps the repository's value
  let acc = localAccreditation(v2), accSource = 'repository files'
  if (process.env.SANITY_PROJECT_ID) {
    try {
      const row = await sanityAccreditation()
      if (row) { acc = { ...acc, ...Object.fromEntries(Object.entries(row).filter(([, v]) => v)) }; accSource = `Sanity (${process.env.SANITY_PROJECT_ID})` }
    } catch (e) { console.warn(`\n!! content: could not read accreditation from Sanity (${e.message}). Using the repository's numbers.\n`) }
  }
  writeFileSync(resolve(v2, 'src/content/accreditation.json'), JSON.stringify(acc, null, 2) + '\n')
  news ||= localNews(v2)
  training ||= localTraining(v2)
  news.sort((a, b) => String(b.date).localeCompare(String(a.date)))
  training.dates = (training.dates || []).map((d) => ({ ...d, when: when(d.date) }))
  writeFileSync(resolve(v2, 'src/content/news.json'), JSON.stringify(news, null, 2) + '\n')
  writeFileSync(resolve(v2, 'src/content/training.json'), JSON.stringify(training, null, 2) + '\n')
  // fromSanity: the team list is the centre's own, so the page drops its "To confirm" note
  writeFileSync(resolve(v2, 'src/content/staff.json'), JSON.stringify({ fromSanity: staffSource !== 'repository files', people: staff }, null, 2) + '\n')
  console.log(`content: ${news.length} news stories, ${training.courses.length} courses, ${training.dates.length} course dates, from ${source}; ${staff.length} staff, from ${staffSource}; accreditation from ${accSource}`)
  return news
}
