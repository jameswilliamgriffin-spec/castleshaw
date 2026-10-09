import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import Button from './Button'
import { PHONE, PHONE_HREF } from '../data'
import { ridge, reduced, fine } from '../lib'
import { SkyGL } from './Shaders'

const WORDS = ['Out', 'here,', 'the', 'Pennines', 'are', 'the', 'classroom.']

export default function Hero() {
  const root = useRef(null), sunRef = useRef(null)
  const far = useMemo(() => ridge(1.2, { base: 0.45, amp: 0.32 }), [])
  const mid = useMemo(() => ridge(3.7, { base: 0.55, amp: 0.26 }), [])
  const near = useMemo(() => ridge(5.9, { base: 0.7, amp: 0.12 }), [])

  useEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reduced()) return
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.sun', { scale: 0.3, opacity: 0, duration: 2 }, 0)
        .from('.rg', { yPercent: 60, duration: 1.8, stagger: 0.12 }, 0)
        .from('.hw-in', { yPercent: 120, rotate: 6, duration: 1.3, stagger: 0.07 }, 0.25)
        .from('.win', { yPercent: 70, duration: 1.6, stagger: 0.12 }, 0.45)
        .from('.hero-side > *', { opacity: 0, y: 20, duration: 1, stagger: 0.1 }, 0.9)
      // scrolling down, the near hills rise fastest: depth without a single 3D transform
      ;[['.rg-far', 8], ['.wins', 18], ['.rg-mid', 22], ['.rg-near', 34], ['.sun', -20]].forEach(([s, v]) =>
        gsap.to(s, { yPercent: -v, ease: 'none', scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true } }))
    }, el)
    if (reduced() || !fine()) return () => ctx.revert()
    // pointer: the sun follows you across the sky, the hills lean away from it
    const sun = el.querySelector('.sun-in')
    const layers = [...el.querySelectorAll('[data-lean]')]
    let tx = 0, ty = 0, cx = 0, cy = 0
    const mv = (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5 }
    const tick = () => {
      cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05
      sun.style.transform = `translate3d(${cx * 46}vw, ${cy * 30}vh, 0)`
      for (const l of layers) l.style.transform = `translate3d(${-cx * l.dataset.lean}px, 0, 0)`
    }
    el.addEventListener('pointermove', mv); gsap.ticker.add(tick)
    return () => { ctx.revert(); el.removeEventListener('pointermove', mv); gsap.ticker.remove(tick) }
  }, [])

  return (
    <section className="hero" ref={root} aria-labelledby="h1">
      <SkyGL sunRef={sunRef} />
      <div className="sun" aria-hidden="true"><div className="sun-in" ref={sunRef} /></div>
      <div className="hero-copy">
        <h1 id="h1" className="hero-h">
          {WORDS.map((w, i) => <span key={i}><span className="hw"><span className="hw-in">{w}</span></span>{i < WORDS.length - 1 ? ' ' : ''}</span>)}
        </h1>
        <div className="hero-side">
          <p>Castleshaw is Oldham&rsquo;s outdoor and environmental education centre, in the South Pennines at the edge of the Peak District. We run adventures, bushcraft, Roman days and residentials for schools, youth groups and families.</p>
          <div className="hero-cta">
            <Button to="plan" tone="ink" size="l">Plan your visit</Button>
            <a href={PHONE_HREF} className="hero-tel" data-cue="Call">{PHONE}</a>
          </div>
        </div>
      </div>
      <div className="land" aria-hidden="false">
        <svg className="rg rg-far" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true"><g data-lean="10"><path d={far} /></g></svg>
        <div className="wins">
          <figure className="win win-1" data-lean="18"><img src="../shared/images/land-ghyll.jpg" alt="Two young people in helmets scrambling up a rocky moorland stream" width="600" height="800" /></figure>
          <figure className="win win-2" data-lean="26"><img src="../shared/images/water-consent.jpg" alt="A kayaker in a red helmet wading out of a reservoir and shouting with delight" width="600" height="800" /></figure>
          <figure className="win win-3" data-lean="34"><img src="../shared/images/environmental-education.jpg" alt="A line of walkers with purple rucksacks crossing moorland above a reservoir" width="600" height="800" /></figure>
        </div>
        <svg className="rg rg-mid" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true"><g data-lean="30"><path d={mid} /></g></svg>
        <svg className="rg rg-near" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true"><g data-lean="50"><path d={near} /></g></svg>
      </div>
    </section>
  )
}
