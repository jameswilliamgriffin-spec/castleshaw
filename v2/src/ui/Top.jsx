import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { NAV_MAIN, PHONE, PHONE_HREF, FACEBOOK, NAV_GROUPS, navHref } from '../data'
import Button from './Button'
import { fine, reduced, goTo, ROOT, HOME } from '../lib'

// A dot that trails the pointer and grows a word over things you can act on.
export function Cursor() {
  const dot = useRef(null), tag = useRef(null)
  useEffect(() => {
    if (!fine() || reduced()) return
    const el = dot.current
    const x = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3' })
    const mv = (e) => {
      el.classList.add('on'); x(e.clientX); y(e.clientY)
      const t = e.target.closest?.('a, button, label, [data-cue]')
      const word = t?.getAttribute('data-cue') || ''
      el.classList.toggle('hot', !!t); el.classList.toggle('word', !!word)
      if (tag.current.textContent !== word) tag.current.textContent = word
    }
    const out = () => el.classList.remove('on')
    addEventListener('pointermove', mv, { passive: true }); document.addEventListener('pointerleave', out)
    return () => { removeEventListener('pointermove', mv); document.removeEventListener('pointerleave', out) }
  }, [])
  return <div className="cur" ref={dot} aria-hidden="true"><i /><span ref={tag} /></div>
}

export function Header({ open, setOpen, count }) {
  const [state, setState] = useState('top')
  useEffect(() => {
    let last = 0
    const on = () => {
      const y = scrollY
      setState(y < 30 ? 'top' : y > last && y > 600 ? 'away' : 'solid')
      last = y
    }
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`hd hd-${open ? 'open' : state}`}>
      <a href={HOME} className="hd-logo"><img src={`${ROOT}shared/images/logo.jpg`} alt="Castleshaw Centre home" width="200" height="129" /></a>
      <nav aria-label="Main" className="hd-nav">
        {NAV_MAIN.map(([t, h]) => <a key={t} href={h}>{t}</a>)}
      </nav>
      <a className="hd-tel" href={PHONE_HREF}>{PHONE}</a>
      <Button to="contact" tone="moss" size="s">Enquire{count ? ` (${count})` : ''}</Button>
      <button className="hd-menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <svg viewBox="0 0 32 32" aria-hidden="true"><path className="m1" d="M5 12 C12 8, 20 16, 27 12" /><path className="m2" d="M5 20 C12 16, 20 24, 27 20" /></svg>
      </button>
    </header>
  )
}

export function Menu({ open, close }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    window.__lenis?.stop()
    const k = (e) => e.key === 'Escape' && close()
    addEventListener('keydown', k)
    setTimeout(() => ref.current?.querySelector('a')?.focus(), 80)
    return () => { removeEventListener('keydown', k); window.__lenis?.start() }
  }, [open, close])
  const enquire = () => { close(); setTimeout(() => goTo('contact'), 450) }
  return (
    <div id="menu" ref={ref} className={`mn${open ? ' mn-open' : ''}`} role="dialog" aria-modal="true" aria-label="Site menu" inert={!open}>
      <div className="mn-bands" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="mn-grid">
        <nav className="mn-main" aria-label="Main pages">
          <ul>
            {NAV_MAIN.map(([t, h], i) => (
              <li key={t} style={{ '--i': i }}><a href={h} onClick={close}><span>{t}</span></a></li>
            ))}
          </ul>
        </nav>
        <div className="mn-side">
          {NAV_GROUPS.map(([g, items], gi) => (
            <nav key={g} className="mn-group" aria-label={g} style={{ '--i': gi + 5 }}>
              <h2>{g}</h2>
              <ul>{items.filter((t) => !NAV_MAIN.some(([, h]) => h === navHref(t))).map((t) => <li key={t}><a href={navHref(t)} onClick={close}>{t}</a></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="mn-contact" style={{ '--i': 8 }}>
          <a className="mn-tel" href={PHONE_HREF}>{PHONE}</a>
          <p>Waterworks Road, Delph, Oldham, OL3 5LZ</p>
          <div className="mn-actions">
            <button type="button" className="mn-enq" onClick={enquire}>Send an enquiry</button>
            <a href={FACEBOOK} rel="noopener">Facebook</a>
            <a href={navHref('Privacy Notice')}>Privacy</a>
          </div>
        </div>
      </div>
    </div>
  )
}
