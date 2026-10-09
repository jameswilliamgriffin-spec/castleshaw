import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { AREAS } from '../data'
import { RippleImage } from './Shaders'

// Six activity areas on a horizontal track. On wide screens vertical scroll drives it;
// on phones it is a native swipe row. Whichever card is in view sets the band's colour.
export default function Activities({ picks, toggle }) {
  const root = useRef(null), track = useRef(null)
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const t = track.current
      const dist = () => t.scrollWidth - innerWidth
      const tween = gsap.to(t, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: root.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (st) => setCur(Math.min(AREAS.length - 1, Math.round(st.progress * (AREAS.length - 1)))),
        },
      })
      // a little life inside each card as it slides past
      gsap.utils.toArray('.act-img .media').forEach((img) => gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: img.closest('.act'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }))
      // keyboard users: tabbing into a card scrolls the page to it
      const focus = (e) => {
        const card = e.target.closest('.act'); if (!card) return
        const i = +card.dataset.i, st = tween.scrollTrigger
        const y = st.start + (st.end - st.start) * (i / (AREAS.length - 1))
        window.__lenis ? window.__lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y)
      }
      t.addEventListener('focusin', focus)
      return () => t.removeEventListener('focusin', focus)
    })
    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
      const t = track.current
      const on = () => setCur(Math.round(t.scrollLeft / (t.firstElementChild.offsetWidth + 16)))
      t.addEventListener('scroll', on, { passive: true })
      return () => t.removeEventListener('scroll', on)
    })
    return () => mm.revert()
  }, [])

  const a = AREAS[cur]
  return (
    <section className="acts" id="activities" ref={root} aria-labelledby="acts-h" style={{ '--tint': a.tint, '--ac': a.accent, '--acOn': a.on }}>
      <div className="acts-tints" aria-hidden="true">{AREAS.map((x, i) => <i key={x.id} style={{ background: x.tint }} className={i === cur ? 'on' : ''} />)}</div>
      <div className="acts-head">
        <h2 id="acts-h" className="h2">Six ways<br />to spend a day</h2>
        <ol className="acts-dots" aria-label="Activity areas">
          {AREAS.map((x, i) => <li key={x.id} className={i === cur ? 'on' : ''} style={{ '--c': x.accent }}><span>{x.short}</span></li>)}
        </ol>
      </div>
      <div className="acts-track" ref={track}>
        {AREAS.map((x, i) => {
          const picked = picks.has(x.id)
          return (
            <article className={`act${i === cur ? ' act-on' : ''}`} key={x.id} data-i={i} style={{ '--c': x.accent, '--cOn': x.on }}>
              <div className="act-img" data-cue="Touch"><RippleImage src={x.img} pos={x.pos} /></div>
              <div className="act-txt">
                <h3>{x.title}</h3>
                <p>{x.text}</p>
                <button type="button" className={`keep${picked ? ' kept' : ''}`} aria-pressed={picked} onClick={() => toggle(x.id)} data-cue={picked ? 'Remove' : 'Keep'}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path className="kp" d="M12 5v14M5 12h14" /><path className="kc" d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  <span>{picked ? 'In your plan' : 'Add to your plan'}</span>
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
