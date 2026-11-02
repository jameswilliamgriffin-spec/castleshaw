// Building blocks for the v2 inner pages. Calm by design: no scroll effects,
// only hover feedback. Shared look with the homepage: Bricolage + Literata,
// the logo palette, arch-shaped photos and a Pennine ridge line.
import { useMemo, useState } from 'react'
import { PAGES } from '../../site.mjs'
import { href, PHONE, PHONE_HREF, EMAIL, CONTACT } from '../../data'
import { ROOT, HOME, ridge } from '../../lib'
import { Squiggle, Contours, useReveal } from '../Squiggle'
import ShapedImage from '../shape/ShapedImage'
import { BLOBS, pick } from '../shape/shapes'

// Shapes are chosen per photo, so a page always looks the same, and hero and split
// shapes come from different sets so neighbours never match. Set image.shape to override.
const HERO_SHAPES = ['blob-2', 'blob-5', 'blob-7', 'blob-9', 'blob-1']
const SPLIT_SHAPES = ['blob-3', 'blob-4', 'blob-6', 'blob-8']
const ACCENTS = ['lime', 'pale-blue', 'navy']

export const img = (name) => `${ROOT}shared/images/site/${name}.jpg`
export const ill = (name) => `${ROOT}shared/images/illustrations/${name}.jpg`
export const gal = (name) => `${ROOT}shared/images/gallery/${name}.jpg`
export const shared = (name) => `${ROOT}shared/images/${name}.jpg`
export const OLD = 'https://www.castleshawcentre.com/uploads/2/5/9/4/25941639/'

/* ---------- "To confirm" marker: an honest blank, with what belongs there ---------- */
export function TBC({ children, block }) {
  if (block) {
    return (
      <div className="tbc-block" role="note">
        <span className="tbc-tag">To confirm</span>
        <p>{children}</p>
      </div>
    )
  }
  return <span className="tbc" role="note" title="Waiting for the centre to confirm"><span className="tbc-tag">To confirm</span>{children}</span>
}

/* ---------- page frame ---------- */
function crumbs(path) {
  const page = PAGES.find((p) => p.path === path)
  if (!page) return []
  const out = [{ title: 'Home', href: HOME }]
  const hub = PAGES.find((p) => p.hub && p.section === page.section)
  if (hub && hub.path !== path) out.push({ title: hub.long, href: href(hub.path) })
  if (page.parent) {
    const parent = PAGES.find((p) => p.key === page.parent)
    if (parent) out.push({ title: parent.title, href: href(parent.path) })
  }
  return out
}

export function Breadcrumbs({ path }) {
  const c = crumbs(path)
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>{c.map((x) => <li key={x.href}><a href={x.href}>{x.title}</a></li>)}</ol>
    </nav>
  )
}

export function SubNav({ path }) {
  const page = PAGES.find((p) => p.path === path)
  if (!page) return null
  const hub = PAGES.find((p) => p.hub && p.section === page.section)
  if (!hub || !hub.children?.length) return null
  const items = [{ title: 'Overview', path: hub.path }, ...hub.children]
  return (
    <nav className="subnav" aria-label={`${hub.long}: pages`}>
      <ul>
        {items.map((x) => (
          <li key={x.path} className={x.parent ? 'sub' : ''}>
            <a href={href(x.path)} aria-current={x.path === path ? 'page' : undefined}>{x.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Hero({ path, title, lead, children, image, illustration, tone = 'sky', actions, seed = 2.1 }) {
  const d = useMemo(() => ridge(seed, { h: 140, base: 0.55, amp: 0.22 }), [seed])
  return (
    <header className={`ph ph-${tone}${illustration ? ' ph-ill' : ''}`}>
      <div className="ph-inner">
        <div className="ph-copy">
          <Breadcrumbs path={path} />
          <h1 className="ph-h1">{title}</h1>
          {lead && <p className="ph-lead">{lead}</p>}
          {children}
          {actions && <div className="ph-actions">{actions}</div>}
        </div>
        {image && (image.shape === 'soft' ? (
          <ShapedImage className="ph-art ph-shp ph-shp-soft" src={image.src} alt={image.alt} shape="soft" aspect="4/3" shadow priority pos={image.pos} />
        ) : (
          <ShapedImage
            className="ph-art ph-shp" src={image.src} alt={image.alt} priority shadow
            shape={image.shape || pick(image.src, HERO_SHAPES)} backdrop="offset"
            accent={image.accent || pick(image.src, ACCENTS, 7)} offset={pick(image.src, ['br', 'bl'], 3)}
            float={pick(image.src, ['circle', 'squiggle', 'blob'], 11)} aspect="4/4.4" pos={image.pos || '50% 35%'}
          />
        ))}
        {illustration && (
          <figure className="ph-art ph-art-ill">
            <img src={illustration.src} alt={illustration.alt || ''} width="1536" height="1024" fetchPriority="high" />
          </figure>
        )}
      </div>
      <svg className="ph-ridge" viewBox="0 0 1600 140" preserveAspectRatio="none" aria-hidden="true"><path d={d} /></svg>
    </header>
  )
}

/* ---------- layout ---------- */
export function Band({ tone = 'chalk', id, children, className = '', narrow }) {
  return <section id={id} className={`band band-${tone}${narrow ? ' band-narrow' : ''} ${className}`}>{children}</section>
}

export function Intro({ heading, children, aside }) {
  return (
    <div className="intro">
      <h2 className="h2i">{heading}</h2>
      <div className="intro-body">{children}</div>
      {aside && <div className="intro-aside">{aside}</div>}
    </div>
  )
}

export function Split({ image, reverse, heading, children, shape = 'arch', caption }) {
  return (
    <div className={`split${reverse ? ' split-rev' : ''}`}>
      {shape === 'ill' ? (
        <figure className="split-art split-ill">
          <img src={image.src} alt={image.alt} loading="lazy" width="1200" height="900" />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      ) : shape === 'soft' ? (
        <ShapedImage className="split-art" src={image.src} alt={image.alt} shape="soft" aspect="4/3" pos={image.pos} caption={caption} />
      ) : (
        <ShapedImage
          className="split-art" src={image.src} alt={image.alt} caption={caption} pos={image.pos || '50% 35%'}
          shape={image.shape || (shape !== 'arch' ? shape : pick(image.src, SPLIT_SHAPES))}
          backdrop={image.backdrop || pick(image.src, ['ring', 'none', 'dots', 'offset'], 5)}
          accent={pick(image.src, ACCENTS, 13)} offset={reverse ? 'bl' : 'br'} aspect="4/4.4"
        />
      )}
      <div className="split-copy">
        {heading && <h2 className="h2i">{heading}</h2>}
        {children}
      </div>
    </div>
  )
}

/* ---------- content ---------- */
export function Ticks({ items, cols }) {
  return <ul className={`ticks${cols ? ' ticks-cols' : ''}`}>{items.map((t, i) => <li key={i}>{t}</li>)}</ul>
}

export function Ledger({ items }) {
  return (
    <dl className="ledger">
      {items.map(([big, small]) => <div key={big}><dt>{big}</dt><dd>{small}</dd></div>)}
    </dl>
  )
}

// Numbered only because these are genuinely steps in order.
export function Steps({ items }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={s.title}><span className="steps-n" aria-hidden="true">{i + 1}</span><div><h3>{s.title}</h3>{typeof s.body === 'string' ? <p>{s.body}</p> : s.body}</div></li>
      ))}
    </ol>
  )
}

// Linked pages with a photo; the first item is given more room.
export function TileLinks({ items, feature = true }) {
  return (
    <ul className={`tiles${feature ? ' tiles-feature' : ''}`}>
      {items.map((t) => (
        <li key={t.href}>
          <a href={t.href} className="tile">
            <span className="tile-img"><img src={t.img} alt="" loading="lazy" /></span>
            <span className="tile-txt"><strong>{t.title}</strong>{t.text && <span>{t.text}</span>}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

// A photo-led list of individual activities on an activity page.
export function ActivityList({ items }) {
  return (
    <ul className="alist">
      {items.map((a, i) => (
        <li key={a.name} className="aitem">
          {a.img && <ShapedImage className="aitem-img" src={a.img} alt={a.alt || ''} shape={BLOBS[(i * 4 + 2) % BLOBS.length]} aspect="1/1" width={600} height={600} />}
          <div><h3>{a.name}</h3><p>{a.text}</p></div>
        </li>
      ))}
    </ul>
  )
}

export function Gallery({ images, id }) {
  return (
    <ul className="gallery" id={id}>
      {images.map((g) => (
        <li key={g.src}><figure><img src={g.src} alt={g.alt} loading="lazy" />{g.caption && <figcaption>{g.caption}</figcaption>}</figure></li>
      ))}
    </ul>
  )
}

export function Quote({ text, by, big }) {
  return (
    <figure className={`q${big ? ' q-big' : ''}`}>
      <blockquote><p>{text}</p></blockquote>
      {by && <figcaption>{by}</figcaption>}
    </figure>
  )
}

export function Quotes({ items }) {
  return <div className="qs">{items.map((q) => <Quote key={q.text} {...q} />)}</div>
}

export function People({ items }) {
  return (
    <ul className="people">
      {items.map((p, i) => (
        <li key={p.name}>
          {p.img
            ? <ShapedImage className="people-img" src={p.img} alt={p.alt || p.name} shape={BLOBS[(i * 2 + 5) % BLOBS.length]} aspect="4/5" width={800} height={1000} pos="50% 25%" />
            : <span className="people-img people-none" aria-hidden="true" />}
          <strong>{p.name}</strong>
          {p.role && <span className="people-role">{p.role}</span>}
          {p.extra && <span className="people-extra">{p.extra}</span>}
        </li>
      ))}
    </ul>
  )
}

export function Timeline({ items }) {
  return (
    <ol className="tl">
      {items.map((e) => (
        <li key={e.years} className="tl-item">
          <div className="tl-when"><span>{e.years}</span></div>
          <div className="tl-body">
            <h3>{e.title}</h3>
            {e.body}
            {e.images && <div className="tl-imgs">{e.images.map((g) => <figure key={g.src}><img src={g.src} alt={g.alt} loading="lazy" />{g.caption && <figcaption>{g.caption}</figcaption>}</figure>)}</div>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary><span>{f.q}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg></summary>
          <div className="faq-a">{typeof f.a === 'string' ? <p>{f.a}</p> : f.a}</div>
        </details>
      ))}
    </div>
  )
}

export function Downloads({ items }) {
  return (
    <ul className="dl">
      {items.map((d) => (
        <li key={d.title}>
          <a href={d.href} rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
            <span><strong>{d.title}</strong>{d.meta && <small>{d.meta}</small>}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function LinkList({ items }) {
  return (
    <ul className="links">
      {items.map((l) => (
        <li key={l.href}><a href={l.href} rel="noopener"><strong>{l.title}</strong>{l.text && <span>{l.text}</span>}</a></li>
      ))}
    </ul>
  )
}

export function Facilities({ items }) {
  return <ul className="facil">{items.map((f) => <li key={f}>{f}</li>)}</ul>
}

export function Kit({ title, bring, avoid, note }) {
  return (
    <div className="kit">
      <h3>{title}</h3>
      <ul className="kit-bring">{bring.map((b) => <li key={b}>{b}</li>)}</ul>
      {note && <p className="kit-note">{note}</p>}
      {avoid && <><h4>Please don&rsquo;t bring</h4><ul className="kit-avoid">{avoid.map((b) => <li key={b}>{b}</li>)}</ul></>}
    </div>
  )
}

export function Callout({ title, children, tone = 'sage' }) {
  return <aside className={`callout callout-${tone}`}><h3>{title}</h3>{children}</aside>
}

/* ---------- calls to action ---------- */
export function Btn({ href: h, children, tone = 'ink', onClick }) {
  return <a className={`ib ib-${tone}`} href={h} onClick={onClick}>{children}</a>
}

// The closing call to action on inner pages: the phone is the hero, enquiry and email beside it.
export function CtaBand({ title = 'Talk to us about your visit', text, primary, secondary }) {
  const ref = useReveal()
  return (
    <section className="cta" ref={ref}>
      <Contours flip />
      <div className="cta-inner">
        <div className="cta-copy rv">
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="cta-act rv" style={{ '--k': 3 }}>
          <a className="cta-tel" href={PHONE_HREF}>{PHONE}</a>
          <div className="cta-row">
            <span className="cta-or">or</span>
            {primary || <Btn href={CONTACT} tone="moss">Send an enquiry</Btn>}
            {secondary}
          </div>
          <p className="cta-mail">Email <a className="sq-host" href={`mailto:${EMAIL}`}>{EMAIL}<Squiggle i={2} /></a></p>
        </div>
      </div>
    </section>
  )
}

// A concept form: shows the layout and fields, sends nothing.
export function EnquiryForm({ title = 'Send an enquiry', fields, submit = 'Send enquiry', note }) {
  const [sent, setSent] = useState(false)
  if (sent) {
    return (
      <div className="form form-sent" role="status">
        <h3>Thanks, your enquiry is ready.</h3>
        <p>This website is a design concept, so nothing was sent. To get in touch today, call <a href={PHONE_HREF}>{PHONE}</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
        <button type="button" className="txt" onClick={() => setSent(false)}>Back to the form</button>
      </div>
    )
  }
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
      <h3>{title}</h3>
      {fields.map((f) => (
        <label key={f.name} className={f.half ? 'half' : ''}>
          <span>{f.label}{f.optional && <em> (optional)</em>}</span>
          {f.type === 'select' ? (
            <select name={f.name} defaultValue="" required={!f.optional}>
              <option value="" disabled>Choose one</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : f.type === 'textarea' ? (
            <textarea name={f.name} rows={f.rows || 4} placeholder={f.placeholder} required={!f.optional} />
          ) : (
            <input name={f.name} type={f.type || 'text'} autoComplete={f.auto} placeholder={f.placeholder} required={!f.optional} />
          )}
        </label>
      ))}
      <button type="submit" className="ib ib-moss">{submit}</button>
      {note && <p className="form-note">{note}</p>}
    </form>
  )
}

// Hero plus the section's page list, the top of every inner page.
export function PageTop(props) {
  return <><Hero {...props} /><SubNav path={props.path} /></>
}
