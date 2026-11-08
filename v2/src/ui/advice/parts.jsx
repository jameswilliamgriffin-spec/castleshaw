import { useEffect, useRef, useState } from 'react'
import { track } from '../../track'

// Tabs for the different kinds of buyer. Arrow keys move between tabs.
export function AudienceTabs({ items, renderPanel }) {
  const [on, setOn] = useState(0)
  const refs = useRef([])
  const key = (e, i) => {
    const n = items.length
    const to = e.key === 'ArrowRight' ? (i + 1) % n : e.key === 'ArrowLeft' ? (i - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : -1
    if (to < 0) return
    e.preventDefault(); setOn(to); refs.current[to]?.focus()
  }
  return (
    <div className="at">
      <div className="at-list" role="tablist" aria-label="Who it's for">
        {items.map((t, i) => (
          <button key={t.key} ref={(el) => { refs.current[i] = el }} role="tab" id={`at-t-${t.key}`} aria-controls={`at-p-${t.key}`} aria-selected={on === i} tabIndex={on === i ? 0 : -1} className="at-tab" onClick={() => setOn(i)} onKeyDown={(e) => key(e, i)}>{t.title}</button>
        ))}
      </div>
      {items.map((t, i) => (
        <div key={t.key} role="tabpanel" id={`at-p-${t.key}`} aria-labelledby={`at-t-${t.key}`} hidden={on !== i} className="at-panel" tabIndex={0}>
          {renderPanel(t)}
        </div>
      ))}
    </div>
  )
}

// The four sign-off steps: pick one to read it, or step through in order.
export function Stepper({ steps }) {
  const [on, setOn] = useState(0)
  const s = steps[on]
  return (
    <div className="sp">
      <ol className="sp-list" style={{ '--p': on / (steps.length - 1) }}>
        {steps.map((x, i) => (
          <li key={x.who}>
            <button type="button" className={`sp-btn${i === on ? ' is-on' : ''}${i < on ? ' is-done' : ''}`} aria-current={i === on ? 'step' : undefined} onClick={() => setOn(i)}>
              <span className="sp-n" aria-hidden="true">{i + 1}</span>
              <span><strong>{x.who}</strong><span>{x.what}</span></span>
            </button>
          </li>
        ))}
      </ol>
      <div className="sp-panel" aria-live="polite">
        <div className="sp-card" key={on}>
          <p className="sp-step">Step {on + 1} of {steps.length}</p>
          <h3>{s.who}: {s.what.charAt(0).toLowerCase() + s.what.slice(1)}</h3>
          <p>{s.body}</p>
          <div className="sp-nav">
            <button type="button" onClick={() => setOn(on - 1)} disabled={on === 0}>Previous</button>
            <button type="button" onClick={() => setOn(on + 1)} disabled={on === steps.length - 1}>Next step</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// A slim "Get a quote" bar that appears once the hero has gone, and steps aside at the form,
// the footer and the emergency band (so it never covers the incident number).
export function StickyQuote({ phone, phoneHref }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const hero = document.querySelector('.al-hero'), form = document.getElementById('quote'), foot = document.querySelector('.ft'), sos = document.getElementById('emergency')
    if (!hero || !form) return
    const seen = new Map()
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => seen.set(e.target, e.isIntersecting))
      setShow(!seen.get(hero) && !seen.get(form) && !seen.get(foot) && !seen.get(sos))
    }, { threshold: 0 })
    ;[hero, form, foot, sos].forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <div className={`qbar${show ? ' is-on' : ''}`} aria-hidden={!show} inert={!show}>
      <a className="qbar-tel" href={phoneHref} onClick={() => track('Phone tapped', { place: 'sticky' })}>{phone}</a>
      <a className="qbar-cta" href="#quote" onClick={() => track('Quote button', { place: 'sticky' })}>Get a quote</a>
    </div>
  )
}
