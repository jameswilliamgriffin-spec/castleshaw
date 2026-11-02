import { Fragment, useEffect, useRef, useState } from 'react'
import { NAV_SECTIONS, PHONE, PHONE_HREF, FACEBOOK, PRIVACY, CONTACT, ADDRESS } from '../data'
import { goTo, reduced } from '../lib'
import './menu.css'

// Three loose, hand-drawn underlines, handed out in turn so neighbours never match.
const SQUIGGLES = [
  'M2 9 C 35 2, 65 13, 105 7 S 180 3, 220 9 S 280 11, 298 5',
  'M2 6 C 28 12, 72 2, 112 8 S 176 12, 214 6 S 274 3, 298 9',
  'M2 10 C 44 4, 70 5, 108 9 S 168 13, 206 7 S 262 2, 298 7',
]

// Faint contour lines, a nod to the valley. Drawn once.
const CONTOURS = Array.from({ length: 9 }, (_, k) => {
  const pts = []
  for (let x = -40; x <= 1480; x += 40) {
    const y = 470 + k * 52 - 150 * Math.sin((x / 1440) * Math.PI * 0.95 + k * 0.16) * (1 - k * 0.07) + 18 * Math.sin(x / 110 + k * 1.3)
    pts.push(`${x} ${y.toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
})

const NARROW = '(max-width: 899px)'
const FOCUSABLE = 'a[href], button:not([disabled])'

function useNarrow() {
  const [narrow, setNarrow] = useState(() => matchMedia(NARROW).matches)
  useEffect(() => {
    const m = matchMedia(NARROW)
    const on = () => setNarrow(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return narrow
}

// Child pages with any nested ones kept under their parent ("Around the valley" under "Where we are").
const tree = (children) => children.filter((c) => !c.parent).map((c) => ({ ...c, kids: children.filter((k) => k.parent === c.key) }))

const Squiggle = ({ i }) => (
  <svg className="mn-sq" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
    <path d={SQUIGGLES[i % SQUIGGLES.length]} pathLength="1" vectorEffect="non-scaling-stroke" />
  </svg>
)

const Arrow = () => (
  <svg className="mn-arr" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17M13 1.5 18 6l-5 4.5" /></svg>
)

export default function Menu({ open, close, current }) {
  const ref = useRef(null)
  const narrow = useNarrow()
  const [active, setActive] = useState(0) // desktop: the item whose pages show on the right
  const [expanded, setExpanded] = useState(-1) // phones: the one open accordion
  const [settled, setSettled] = useState(false) // the reveal has finished, so underlines can draw

  useEffect(() => {
    if (!open) { setSettled(false); return }
    setActive(0)
    setExpanded(-1)
    const burger = document.querySelector('.hd-menu')
    const settle = setTimeout(() => setSettled(true), reduced() ? 0 : 620)
    const first = setTimeout(() => ref.current?.querySelector('.mn-link')?.focus({ preventScroll: true }), 80)

    // Hold the page still behind the menu.
    const html = document.documentElement
    const bar = innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    if (bar) document.body.style.paddingRight = `${bar}px`
    window.__lenis?.stop()

    // Keep focus inside the header and the menu while it is open.
    const focusables = () => [...document.querySelectorAll('.hd, #menu')]
      .flatMap((root) => [...root.querySelectorAll(FOCUSABLE)])
      .filter((el) => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden')
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close(); return }
      if (e.key !== 'Tab') return
      const list = focusables()
      if (!list.length) return
      const at = list.indexOf(document.activeElement)
      if (at === -1) { e.preventDefault(); list[0].focus() }
      else if (e.shiftKey && at === 0) { e.preventDefault(); list[list.length - 1].focus() }
      else if (!e.shiftKey && at === list.length - 1) { e.preventDefault(); list[0].focus() }
    }
    addEventListener('keydown', onKey)

    return () => {
      clearTimeout(settle)
      clearTimeout(first)
      removeEventListener('keydown', onKey)
      html.style.overflow = ''
      document.body.style.paddingRight = ''
      window.__lenis?.start()
      burger?.focus({ preventScroll: true })
    }
  }, [open, close])

  const enquire = (e) => {
    close()
    if (document.getElementById('contact')) { e.preventDefault(); setTimeout(() => goTo('contact'), 400) }
  }

  return (
    <div
      id="menu" ref={ref} className={`mn${open ? ' mn-open' : ''}${settled ? ' mn-settled' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu" inert={!open}
      onScroll={(e) => e.currentTarget.classList.toggle('mn-scrolled', e.currentTarget.scrollTop > 8)}
    >
      <div className="mn-cap" aria-hidden="true" />
      <svg className="mn-contours" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {CONTOURS.map((d) => <path key={d} d={d} />)}
      </svg>

      <nav className="mn-nav" aria-label="Site sections">
        {NAV_SECTIONS.map((s, i) => {
          const hasKids = s.children.length > 0
          const on = narrow ? expanded === i : active === i
          const here = current === s.key
          const panelId = `mn-panel-${s.key}`
          const word = <span className="mn-word">{s.title}<Squiggle i={i} /></span>
          const kids = tree(s.children)
          return (
            <Fragment key={s.key}>
              <div className={`mn-item${on ? ' is-on' : ''}${here ? ' is-current' : ''}`} style={{ '--i': i, '--row': i + 1 }}>
                <span className="mn-idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="mn-mask">
                  {narrow && hasKids ? (
                    <button type="button" className="mn-link" aria-expanded={on} aria-controls={panelId} onClick={() => setExpanded(on ? -1 : i)}>
                      {word}<span className="mn-pm" aria-hidden="true" />
                    </button>
                  ) : (
                    <a
                      className="mn-link" href={s.href} onClick={close} aria-current={here ? 'true' : undefined}
                      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i) }}
                      onFocus={() => setActive(i)}
                    >{word}</a>
                  )}
                </span>
              </div>

              <div id={panelId} className={`mn-panel${on ? ' is-on' : ''}${hasKids ? '' : ' mn-panel-short'}`}>
                <div className="mn-panel-in">
                  <div className="mn-eye" style={{ '--j': 0 }}>
                    <span>{s.long}</span>
                    <a href={s.href} onClick={close}>Overview <span aria-hidden="true">&rarr;</span></a>
                  </div>
                  {hasKids ? (
                    <ul className={`mn-kids${kids.length > 4 ? ' mn-two' : ''}`}>
                      {kids.map((c, j) => (
                        <li key={c.key} style={{ '--j': j + 1 }}>
                          <a href={c.href} onClick={close}><Arrow /><span>{c.title}</span></a>
                          {c.kids.length > 0 && (
                            <ul className="mn-nest">
                              {c.kids.map((k) => <li key={k.key}><a href={k.href} onClick={close}><span>{k.title}</span></a></li>)}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mn-short" style={{ '--j': 1 }}>
                      <p>{s.blurb}</p>
                      <a className="mn-cta" href={CONTACT} onClick={enquire}>Check availability</a>
                    </div>
                  )}
                </div>
              </div>
            </Fragment>
          )
        })}
      </nav>

      <div className="mn-foot">
        <a className="mn-tel" href={PHONE_HREF}>{PHONE}</a>
        <span className="mn-addr">{ADDRESS.join(', ')}</span>
        <a className="mn-enq" href={CONTACT} onClick={enquire}>Send an enquiry <span aria-hidden="true">&rarr;</span></a>
        <span className="mn-small">
          <a href={FACEBOOK} rel="noopener">Facebook</a>
          <a href={PRIVACY}>Privacy</a>
        </span>
      </div>
    </div>
  )
}
