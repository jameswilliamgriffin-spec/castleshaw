import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { NAV_MAIN, NAV_SECTIONS, PHONE, PHONE_HREF, FACEBOOK, PRIVACY, CONTACT, ADDRESS } from '../data'
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

// On pages with their own enquiry form (#contact), scroll to it; elsewhere go to the Contact page.
const toEnquiry = (e) => { if (document.getElementById('contact')) { e.preventDefault(); goTo('contact') } }

export function Header({ open, setOpen, count, current }) {
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
        {NAV_MAIN.map(([t, h], i) => <a key={t} href={h} aria-current={current === NAV_SECTIONS[i].key ? 'true' : undefined}>{t}</a>)}
      </nav>
      <a className="hd-tel" href={PHONE_HREF}>{PHONE}</a>
      <Button href={CONTACT} onClick={toEnquiry} tone="moss" size="s">Enquire{count ? ` (${count})` : ''}</Button>
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
  const enquire = (e) => { close(); if (document.getElementById('contact')) { e.preventDefault(); setTimeout(() => goTo('contact'), 450) } }
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
          {NAV_SECTIONS.filter((s) => s.children.length).map((s, gi) => (
            <nav key={s.key} className="mn-group" aria-label={s.long} style={{ '--i': gi + 5 }}>
              <h2><a href={s.href} onClick={close}>{s.long}</a></h2>
              <ul>{s.children.map((c) => <li key={c.key} className={c.parent ? 'mn-sub' : ''}><a href={c.href} onClick={close}>{c.title}</a></li>)}</ul>
            </nav>
          ))}
        </div>
        <div className="mn-contact" style={{ '--i': 8 }}>
          <a className="mn-tel" href={PHONE_HREF}>{PHONE}</a>
          <p>{ADDRESS.join(', ')}</p>
          <div className="mn-actions">
            <a className="mn-enq" href={CONTACT} onClick={enquire}>Send an enquiry</a>
            <a href={FACEBOOK} rel="noopener">Facebook</a>
            <a href={PRIVACY}>Privacy</a>
          </div>
        </div>
      </div>
    </div>
  )
}
