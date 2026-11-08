// Builds seed/import.ndjson: the site's current news stories and training courses, ready to load
// into an empty Sanity dataset with `npm run import` (run once, after `npx sanity login`).
// Photos are copied into Sanity from the live site during the import.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const site = resolve(here, '../..')
const news = JSON.parse(readFileSync(resolve(site, 'v2/src/content/news.json'), 'utf8'))
const training = JSON.parse(readFileSync(resolve(site, 'v2/src/content/training.local.json'), 'utf8'))
let k = 0
const key = () => `k${(k++).toString(36)}`

// "[text](https://…)" inside a paragraph → a Sanity block with a link
function block(text) {
  const children = [], markDefs = []
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0, m
  while ((m = re.exec(text))) {
    if (m.index > last) children.push({ _type: 'span', _key: key(), text: text.slice(last, m.index), marks: [] })
    const mk = key(); markDefs.push({ _type: 'link', _key: mk, href: m[2] })
    children.push({ _type: 'span', _key: key(), text: m[1], marks: [mk] })
    last = re.lastIndex
  }
  if (last < text.length) children.push({ _type: 'span', _key: key(), text: text.slice(last), marks: [] })
  return { _type: 'block', _key: key(), style: 'normal', markDefs, children }
}

const docs = []
for (const n of news) {
  const date = /^\d{4}$/.test(n.date) ? `${n.date}-01-01` : /^\d{4}-\d{2}$/.test(n.date) ? `${n.date}-01` : n.date
  // photos are fetched from the live site during the import (they are already published there)
  const photo = n.imageKey && resolve(site, `public/shared/images/site/${n.imageKey}.jpg`)
  const photoUrl = `https://castleshaw.vercel.app/shared/images/site/${n.imageKey}.jpg`
  docs.push({
    _id: `news-${n.slug}`, _type: 'newsStory', title: n.title, slug: { _type: 'slug', current: n.slug },
    date, dateShows: /^\d{4}$/.test(n.date) ? 'year' : /^\d{4}-\d{2}$/.test(n.date) ? 'month' : 'day',
    ...(photo && existsSync(photo) ? { image: { _type: 'image', _sanityAsset: `image@${photoUrl}`, alt: n.alt } } : {}),
    body: n.body.map(block),
  })
}
training.courses.forEach((c, i) => docs.push({
  _id: `course-${c.id}`, _type: 'trainingCourse', name: c.name, slug: { _type: 'slug', current: c.id },
  length: c.length, audience: c.who, description: c.text, order: i + 1, featured: !!c.featured,
}))
writeFileSync(resolve(here, 'import.ndjson'), docs.map((d) => JSON.stringify(d)).join('\n') + '\n')
console.log(`seed/import.ndjson: ${docs.length} documents (${news.length} stories, ${training.courses.length} courses)`)
