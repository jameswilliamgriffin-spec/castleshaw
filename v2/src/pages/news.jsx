// News: the list of stories, and one page per story. The stories are plain files in
// content/news/ (see the README there); scripts/news.mjs turns them into content/news.json.
import { PageTop, Band, SectionHead, img } from '../ui/inner/blocks'
import { NEWS } from '../site.mjs'
import { href, FACEBOOK } from '../data'

const storyHref = (n) => href(`news/${n.slug}/`)
// a photo from Sanity (a full address), or one of the site's own photos (a name)
const photo = (n) => n.imageUrl || (n.imageKey ? img(n.imageKey) : null)

// A paragraph of a story: plain text, with [links](https://…) turned into links.
function Para({ text }) {
  const parts = []
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g
  let last = 0, m
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const external = /^https?:/.test(m[2])
    parts.push(<a key={m.index} href={external ? m[2] : href(m[2].replace(/^\//, ''))} rel={external ? 'noopener' : undefined}>{m[1]}</a>)
    last = re.lastIndex
  }
  parts.push(text.slice(last))
  return <p>{parts}</p>
}

function Card({ n, level = 'h2' }) {
  const H = level
  return (
    <li>
      <a className="post-card" href={storyHref(n)}>
        {photo(n)
          ? <img src={photo(n)} alt="" width="800" height="600" loading="lazy" />
          : <span className="post-card-none" aria-hidden="true" />}
        <time dateTime={n.date}>{n.when}</time>
        <H className="post-card-h">{n.title}</H>
        <p>{n.summary}</p>
      </a>
    </li>
  )
}

export function Index({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="News"
        lead="People, projects and what has been happening at Castleshaw."
        actions={<a className="ib ib-ink" href={FACEBOOK} rel="noopener">Latest on Facebook</a>}
      />
      <Band>
        <ul className="posts">
          {NEWS.map((n) => <Card key={n.slug} n={n} />)}
        </ul>
      </Band>
    </>
  )
}

export function Post({ path }) {
  const slug = path.split('/').filter(Boolean).pop()
  const i = NEWS.findIndex((n) => n.slug === slug)
  const n = NEWS[i]
  if (!n) return null
  // the next stories along, newest first, wrapping round
  const more = [1, 2, 3].map((k) => NEWS[(i + k) % NEWS.length]).filter((x) => x && x !== n)
  return (
    <>
      <PageTop
        path={path}
        title={n.title}
        image={photo(n) ? { src: photo(n), alt: n.alt } : undefined}
      >
        <p className="post-when"><time dateTime={n.date}>{n.when}</time></p>
      </PageTop>
      <Band narrow>
        <div className="post-body">
          {n.body.map((t, k) => <Para key={k} text={t} />)}
        </div>
        <p className="post-back"><a href={href('news/')}>All news</a></p>
      </Band>
      {more.length > 0 && (
        <Band tone="sky">
          <SectionHead title="More news" />
          <ul className="posts posts-more">
            {more.map((x) => <Card key={x.slug} n={x} level="h3" />)}
          </ul>
        </Band>
      )}
    </>
  )
}
