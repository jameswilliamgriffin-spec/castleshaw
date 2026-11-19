// Building blocks for the v2 inner pages. Calm by design: no scroll effects,
// only hover feedback. Shared look with the homepage: Bricolage + Literata,
// the logo palette, arch-shaped photos and a Pennine ridge line.
import { useEffect, useMemo, useRef, useState } from 'react'
import { PAGES } from '../../site.mjs'
import { href, PHONE, PHONE_HREF, EMAIL, CONTACT } from '../../data'
import { ROOT, HOME, ridge } from '../../lib'
import { sendForm, pageName } from '../../send'
import { track } from '../../track'
import { Picture, slot, Photo } from './Slot'
import M from '../../content/imagery.json'
import { Squiggle, Contours, useReveal } from '../Squiggle'
import ScrollCue from '../ScrollCue'
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
// AI-generated documentary photos (placeholders until real photography; see generated/README.md).
export const gen = (name) => `${ROOT}shared/images/generated/${name}.webp`
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

// how wide the hero photo shows: two-thirds of a phone screen, 17rem on small tablets, about a third of a desktop
export const HERO_SIZES = '(max-width: 599px) 66vw, (max-width: 899px) 17rem, 34vw'

export function Hero({ path, title, lead, children, image, illustration, tone = 'sky', actions, seed = 2.1 }) {
  const d = useMemo(() => ridge(seed, { h: 140, base: 0.55, amp: 0.22 }), [seed])
  // image.slot: a manifest image (content/imagery.json). image.key keeps the shape picked for the image it replaced.
  const pic = image?.slot ? slot(image.slot) : undefined
  const key = image && (image.key || image.src || pic?.src)
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
          <ShapedImage className="ph-art ph-shp ph-shp-soft" src={image.src} picture={pic} alt={image.alt} shape="soft" aspect="4/3" shadow priority pos={image.pos} sizes={HERO_SIZES} />
        ) : (
          <ShapedImage
            className="ph-art ph-shp" src={image.src} picture={pic} alt={image.alt} priority shadow sizes={HERO_SIZES}
            shape={image.shape || pick(key, HERO_SHAPES)} backdrop="offset"
            accent={image.accent || pick(key, ACCENTS, 7)} offset={pick(key, ['br', 'bl'], 3)}
            float={pick(key, ['circle', 'squiggle', 'blob'], 11)} aspect="4/4.4" pos={image.pos || '50% 35%'}
          />
        ))}
        {illustration && (
          <figure className="ph-art ph-art-ill">
            <img src={illustration.src} alt={illustration.alt || ''} width="1536" height="1024" fetchPriority="high" />
          </figure>
        )}
      </div>
      <svg className="ph-ridge" viewBox="0 0 1600 140" preserveAspectRatio="none" aria-hidden="true"><path d={d} /></svg>
      <ScrollCue className="cue-ph" label="Keep scrolling" />
    </header>
  )
}

/* ---------- layout ---------- */
// A section of the page. Its contents rise in once, the first time it scrolls into view.
// backdrop: an imagery slot shown behind the band under a navy scrim (navy quote bands only).
export function Band({ tone = 'chalk', id, children, className = '', narrow, backdrop }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect() } }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section ref={ref} id={id} className={`band band-${tone}${narrow ? ' band-narrow' : ''}${backdrop ? ' band-bg' : ''} ${className}`}>
      {children}
      {backdrop && <Picture slot={backdrop} sizes="100vw" imgClassName="band-bg-img" />}
    </section>
  )
}

// A full-width image between two sections (or a row of them, when the slot lists several). Reveals once.
export function ImageBreak({ slot: id }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect() } }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const n = M.slots[id].images?.length || 1
  return (
    <div ref={ref} className={`ibreak${n > 1 ? ' ibreak-row' : ''}`}>
      {Array.from({ length: n }, (_, i) => <Picture key={i} slot={id} n={i} sizes={n > 1 ? `${Math.ceil(100 / n)}vw` : '100vw'} imgClassName="ibreak-img" />)}
    </div>
  )
}

// A section's heading block: optional eyebrow, the h2, an optional lead.
export function SectionHead({ eyebrow, title, children, id }) {
  return (
    <div className="shead">
      {eyebrow && <p className="shead-eyebrow">{eyebrow}</p>}
      <h2 className="h2i" id={id}>{title}</h2>
      {children && <div className="shead-lead">{children}</div>}
    </div>
  )
}

// A key text link with the hand-drawn underline and a nudging arrow.
export function SqLink({ href: h, children, i = 0, rel }) {
  return <a className="sql sq-host" href={h} rel={rel}><span className="sql-t">{children}<Squiggle i={i} /></span><span className="sql-arr" aria-hidden="true">&rarr;</span></a>
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
          <Photo src={image.src} sizes="(max-width: 899px) 92vw, 45vw" alt={image.alt} loading="lazy" width="1200" height="900" />
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
            <span className="tile-img"><Photo src={t.img} sizes="(max-width: 599px) 92vw, (max-width: 1099px) 45vw, 30vw" alt="" width="800" height="500" loading="lazy" decoding="async" /></span>
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
  // on phones the gallery is a swipe row; while it scrolls sideways it can take keyboard focus
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const sync = () => { if (el.scrollWidth > el.clientWidth + 1) { el.tabIndex = 0; el.setAttribute('aria-label', 'Photos (scroll sideways)') } else { el.removeAttribute('tabindex'); el.removeAttribute('aria-label') } }
    sync()
    const ro = new ResizeObserver(sync); ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <ul className="gallery" id={id} ref={ref}>
      {images.map((g) => (
        <li key={g.src}><figure><Photo src={g.src} sizes="(max-width: 599px) 72vw, (max-width: 899px) 45vw, 30vw" alt={g.alt} loading="lazy" className={g.fit === 'contain' ? 'fit-contain' : undefined} style={g.pos ? { objectPosition: g.pos } : undefined} />{g.caption && <figcaption>{g.caption}</figcaption>}</figure></li>
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
            ? <ShapedImage className="people-img" src={p.img} alt={p.alt || p.name} shape={BLOBS[(i * 2 + 5) % BLOBS.length]} aspect="4/5" width={800} height={1000} pos={p.pos || '50% 25%'} />
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
            {e.images && <div className="tl-imgs">{e.images.map((g) => <figure key={g.src}><Photo src={g.src} sizes="(max-width: 599px) 45vw, 22vw" alt={g.alt} loading="lazy" className={g.fit === 'contain' ? 'fit-contain' : undefined} style={g.pos ? { objectPosition: g.pos } : undefined} />{g.caption && <figcaption>{g.caption}</figcaption>}</figure>)}</div>}
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

// A kit list. On phones each list is a tap-to-open section (closed to start, so the page stays short);
// on wider screens it is always open. Arriving at #what-to-bring opens them all.
const wide = () => typeof window === 'undefined' || matchMedia('(min-width: 900px)').matches
export function Kit({ title, bring, avoid, note }) {
  const [open, setOpen] = useState(() => wide() || (typeof location !== 'undefined' && location.hash === '#what-to-bring'))
  useEffect(() => {
    const onHash = () => { if (location.hash === '#what-to-bring') setOpen(true) }
    addEventListener('hashchange', onHash)
    return () => removeEventListener('hashchange', onHash)
  }, [])
  return (
    <details className="kit" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary onClick={(e) => { if (wide()) e.preventDefault() }}><h3>{title}</h3></summary>
      <ul className="kit-bring">{bring.map((b) => <li key={b}>{b}</li>)}</ul>
      {note && <p className="kit-note">{note}</p>}
      {avoid && <><h4>Please don&rsquo;t bring</h4><ul className="kit-avoid">{avoid.map((b) => <li key={b}>{b}</li>)}</ul></>}
    </details>
  )
}

// A topic card that is tap-to-open on phones (closed to start unless `open`), always open on wider
// screens. Arriving at its section's anchor (for example #primary-science) opens every card in it.
export function TopicCard({ id, title, open: keep = false, children }) {
  const ref = useRef(null)
  const [open, setOpen] = useState(() => keep || wide())
  useEffect(() => {
    // a link to the card itself, or to its section, opens it
    const sec = ref.current?.parentElement?.closest('[id]')
    const check = () => { const h = location.hash; if ((id && h === `#${id}`) || (sec && h === `#${sec.id}`)) setOpen(true) }
    check()
    addEventListener('hashchange', check)
    return () => removeEventListener('hashchange', check)
  }, [])
  return (
    <details ref={ref} id={id} className="icard tcard" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary onClick={(e) => { if (wide()) e.preventDefault() }}><h3>{title}</h3></summary>
      {children}
    </details>
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

// A pointer to the educational visits advice service, for pages where teachers are planning trips.
export function AdviceNote() {
  return (
    <aside className="adv-note" aria-label="Educational visits advice">
      <div className="adv-note-in">
        <p><strong>Planning a visit somewhere else?</strong> Oldham Council&rsquo;s educational visits advisers, based here at Castleshaw, check and sign off visits anywhere, and run a 24/7 critical incident line.</p>
        <a className="adv-note-link" href={`${href('advice-and-guidance/')}`}>Educational visits advice <span aria-hidden="true">&rarr;</span></a>
      </div>
    </aside>
  )
}

// The enquiry form on inner pages: emailed to the centre through Web3Forms (send.js).
// A hidden "botcheck" box catches most spam bots; Web3Forms drops anything with it ticked.
export function EnquiryForm({ title = 'Send an enquiry', fields, submit = 'Send enquiry', note }) {
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('botcheck')) { setState('sent'); return }
    setState('sending')
    try {
      await sendForm({
        ...Object.fromEntries(fields.map((f) => [f.label, data.get(f.name)])),
        'Sent from': pageName(),
      }, { subject: `Website enquiry: ${data.get('about') || title}${data.get('name') ? ' from ' + data.get('name') : ''}`, replyTo: data.get('email') })
      setState('sent')
      track('Enquiry sent', { source: location.pathname })
    } catch {
      setState('error')
      track('Enquiry failed', { source: location.pathname })
    }
  }
  if (state === 'sent') {
    return (
      <div className="form form-sent" role="status">
        <h3>Thank you. We&rsquo;ve got your enquiry.</h3>
        <p>We usually reply within a few working days. For anything urgent, call <a href={PHONE_HREF}>{PHONE}</a>.</p>
        <button type="button" className="txt" onClick={() => setState('idle')}>Send another enquiry</button>
      </div>
    )
  }
  return (
    <form className="form" onSubmit={onSubmit}>
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
            <input enterKeyHint="next" name={f.name} type={f.type || 'text'} autoComplete={f.auto} placeholder={f.placeholder} required={!f.optional} />
          )}
        </label>
      ))}
      <input type="checkbox" name="botcheck" className="form-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {state === 'error' && <p className="form-fail" role="alert">Sorry, your enquiry didn&rsquo;t send. Please try again, or call <a href={PHONE_HREF}>{PHONE}</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
      <button type="submit" className="ib ib-moss" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : submit}</button>
      {note && <p className="form-note">{note}</p>}
    </form>
  )
}

// Hero plus the section's page list, the top of every inner page.
// subnav={false}: a page whose hero already carries the section's links leaves the link bar out.
export function PageTop(props) {
  return <><Hero {...props} />{props.subnav !== false && <SubNav path={props.path} />}</>
}
