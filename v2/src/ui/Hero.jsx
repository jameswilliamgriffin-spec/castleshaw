import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import Button from './Button'
import ScrollCue from './ScrollCue'
import { ridge, reduced, fine, goTo, ROOT } from '../lib'
import { SkyGL } from './Shaders'

// set line by line on wide screens so no word is left on its own
const LINES = [['Out', 'here,', 'the'], ['Pennines', 'are'], ['the', 'classroom.']]

// Three photos, layered between the hills: each one sits at a different depth.
const WINS = [
  { k: 1, src: 'land-ghyll.jpg', alt: 'Two young people in helmets scrambling up a rocky moorland stream', shape: 'blob-2', pos: '45% 40%', lean: 12 },
  { k: 2, src: 'water-consent.jpg', alt: 'A kayaker in a red helmet wading out of a reservoir and shouting with delight', shape: 'blob-9', pos: '50% 35%', lean: 6 },
  { k: 3, src: 'environmental-education.jpg', alt: 'A line of walkers with purple rucksacks crossing moorland above a reservoir', shape: 'blob-7', pos: '50% 50%', lean: 9 },
]

// A few soft clouds, drawn in the same flat style as the hills.
const CLOUD = 'M14 34c-7 0-12-4-12-10 0-5 4-9 10-9 1-7 7-12 15-12 7 0 12 4 14 10 2-1 4-2 7-2 7 0 12 5 12 11 0 7-6 12-14 12z'

export default function Hero() {
  const root = useRef(null), sunRef = useRef(null)
  const far = useMemo(() => ridge(1.2, { base: 0.45, amp: 0.32 }), [])
  const mid = useMemo(() => ridge(3.7, { base: 0.55, amp: 0.26 }), [])
  const near = useMemo(() => ridge(5.9, { base: 0.62, amp: 0.16 }), [])
  // each photo drifts on its own timing, so they never move in step
  const drift = useMemo(() => WINS.map(() => ({
    '--fd': `${(6.5 + Math.random() * 2.5).toFixed(2)}s`,
    '--fdl': `${(-Math.random() * 6).toFixed(2)}s`,
    '--fy': `${(6 + Math.random() * 2).toFixed(1)}px`,
  })), [])

  useEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reduced()) return
      // about 1.2s: the hills rise, the headline arrives line by line, then the words, then the photos
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' }, paused: !window.__csReady })
      if (!window.__csReady) window.addEventListener('cs:ready', () => intro.play(), { once: true })
      intro
        .from('.sun', { scale: 0.6, opacity: 0, duration: 1 }, 0)
        .from('.rg', { yPercent: 28, duration: 0.9, stagger: 0.06 }, 0)
        .from('.hw-in', { yPercent: 115, duration: 0.7, stagger: (i, t) => +t.closest('.hl').dataset.l * 0.12 }, 0.05)
        .from('.hero-side > *', { opacity: 0, y: 16, duration: 0.55, stagger: 0.08 }, 0.42)
        .from('.win-par', { opacity: 0, y: 40, scale: 0.94, duration: 0.6, stagger: 0.08 }, 0.55)
      // scrolling down, nearer things move faster: depth without a 3D transform.
      // fromTo from 0, so the intro's starting offsets are never mistaken for the resting position
      ;[['.rg-far', 8], ['.rg-mid', 18], ['.rg-near', 10], ['.sun', -18], ['.clouds', -10], ['.win-2 .win-par', 14], ['.win-3 .win-par', 22], ['.win-1 .win-par', 22]].forEach(([s, v]) =>
        gsap.fromTo(s, { yPercent: 0 }, { yPercent: -v, ease: 'none', immediateRender: false, scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } }))
    }, el)
    if (reduced() || !fine()) return () => ctx.revert()
    // pointer (mouse only): every layer leans a little, never more than 14px
    const sun = el.querySelector('.sun-in')
    const layers = [...el.querySelectorAll('[data-lean]')]
    let tx = 0, ty = 0, cx = 0, cy = 0
    const mv = (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5 }
    const tick = () => {
      if (Math.abs(tx - cx) < 0.0005 && Math.abs(ty - cy) < 0.0005) return
      cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06
      sun.style.transform = `translate3d(${cx * 28}px, ${cy * 20}px, 0)`
      for (const l of layers) l.style.transform = `translate3d(${-cx * 2 * l.dataset.lean}px, ${-cy * l.dataset.lean * 0.5}px, 0)`
    }
    el.addEventListener('pointermove', mv); gsap.ticker.add(tick)
    return () => { ctx.revert(); el.removeEventListener('pointermove', mv); gsap.ticker.remove(tick) }
  }, [])

  return (
    <section className="hero" ref={root} aria-labelledby="h1">
      <SkyGL sunRef={sunRef} />
      <div className="sun" aria-hidden="true"><div className="sun-in" ref={sunRef} /></div>
      <div className="clouds" aria-hidden="true">
        {[1, 2, 3].map((n) => <svg key={n} className={`cloud cloud-${n}`} viewBox="0 0 64 36"><path d={CLOUD} /></svg>)}
        <svg className="birds" viewBox="0 0 60 20"><path d="M2 10c3-3 6-3 8 0 2-3 5-3 8 0" /><path d="M30 5c2.4-2.2 4.8-2.2 6.4 0 1.6-2.2 4-2.2 6.4 0" /></svg>
      </div>
      <div className="hero-copy">
        <h1 id="h1" className="hero-h">
          {LINES.map((line, li) => (
            <span className="hl" key={li} data-l={li}>
              {line.map((w, i) => <span key={i}><span className="hw"><span className="hw-in">{w}</span></span>{i < line.length - 1 ? ' ' : ''}</span>)}
              {li < LINES.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>
        <div className="hero-side">
          <p>Castleshaw is Oldham&rsquo;s outdoor and environmental education centre, in the South Pennines at the edge of the Peak District. We run adventures, bushcraft, Roman days and residentials for schools, youth groups and families.</p>
          <div className="hero-cta">
            <Button to="contact" tone="ink" size="l">Enquire about a visit</Button>
            <a href="#plan" className="hero-tel" onClick={(e) => { e.preventDefault(); goTo('plan') }}>Build a visit plan</a>
          </div>
        </div>
      </div>
      <div className="land">
        <svg className="rg rg-far" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true"><g data-lean="3"><path d={far} /></g></svg>
        {WINS.map((w, i) => (
          <figure key={w.k} className={`win win-${w.k}`} data-lean={w.lean}>
            <div className="win-par">
              <div className="win-float" style={drift[i]}>
                <div className="win-mask" style={{ '--clip': `var(--shape-${w.shape})` }}>
                  <img src={`${ROOT}shared/images/${w.src}`} alt={w.alt} width="600" height="800" style={{ objectPosition: w.pos }} />
                </div>
              </div>
            </div>
          </figure>
        ))}
        <svg className="rg rg-mid" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true"><g data-lean="7"><path d={mid} /></g></svg>
        <svg className="rg rg-near" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true"><g data-lean="10"><g className="sway"><path d={near} /></g></g></svg>
      </div>
      <ScrollCue className="cue-hero" label="Keep scrolling" />
    </section>
  )
}
