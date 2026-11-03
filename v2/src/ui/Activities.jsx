import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { AREAS, href } from '../data'
import { reduced } from '../lib'
import { RippleImage } from './Shaders'
import AreaIcon from './AreaIcon'
import ScrollCue from './ScrollCue'

// Six activity areas on a horizontal track. On wide screens vertical scroll drives it;
// on phones it is a native swipe row. Whichever card is in view sets the band's colour.
export default function Activities({ picks, toggle }) {
  const root = useRef(null), track = useRef(null), legend = useRef(null), jump = useRef(null)
  const [cur, setCur] = useState(0)
  const [more, setMore] = useState(true) // is there still more of the track to see?

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const t = track.current
      const dist = () => t.scrollWidth - innerWidth
      const tween = gsap.to(t, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: root.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (st) => {
            setCur(Math.min(AREAS.length - 1, Math.round(st.progress * (AREAS.length - 1))))
            root.current.style.setProperty('--prog', st.progress.toFixed(3))
            setMore(st.progress < 0.97)
          },
        },
      })
      // a little life inside each card as it slides past
      gsap.utils.toArray('.act-img .media').forEach((img) => gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: img.closest('.act'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }))
      // the legend and keyboard focus both move the page to a card
      const go = (i, smooth) => {
        const st = tween.scrollTrigger
        const y = st.start + (st.end - st.start) * (i / (AREAS.length - 1))
        if (window.__lenis) window.__lenis.scrollTo(y, smooth ? { duration: 1.1 } : { immediate: true })
        else scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' })
      }
      jump.current = (i) => go(i, true)
      const focus = (e) => {
        const card = e.target.closest('.act'); if (!card) return
        go(+card.dataset.i, false)
      }
      t.addEventListener('focusin', focus)
      return () => { t.removeEventListener('focusin', focus); jump.current = null }
    })
    mm.add('(max-width: 899px), (prefers-reduced-motion: reduce)', () => {
      const t = track.current
      const on = () => {
        const max = t.scrollWidth - t.clientWidth
        setCur(Math.min(AREAS.length - 1, Math.round(t.scrollLeft / (t.firstElementChild.offsetWidth + 16))))
        root.current.style.setProperty('--prog', max > 0 ? (t.scrollLeft / max).toFixed(3) : '0')
        setMore(t.scrollLeft < max - 8)
      }
      jump.current = (i) => {
        const card = t.children[i]
        t.scrollTo({ left: card.offsetLeft - (t.clientWidth - card.offsetWidth) / 2, behavior: reduced() ? 'auto' : 'smooth' })
      }
      t.addEventListener('scroll', on, { passive: true })
      return () => { t.removeEventListener('scroll', on); jump.current = null }
    })
    return () => mm.revert()
  }, [])

  useEffect(() => { // keep the active chip in view when the legend scrolls sideways
    const l = legend.current, chip = l?.children[cur]
    if (l && chip && l.scrollWidth > l.clientWidth) l.scrollTo({ left: chip.offsetLeft - (l.clientWidth - chip.offsetWidth) / 2, behavior: reduced() ? 'auto' : 'smooth' })
  }, [cur])

  const a = AREAS[cur]
  return (
    <section className="acts" id="activities" ref={root} aria-labelledby="acts-h" style={{ '--tint': a.tint, '--ac': a.accent, '--acOn': a.on }}>
      <div className="acts-tints" aria-hidden="true">{AREAS.map((x, i) => <i key={x.id} style={{ background: x.tint }} className={i === cur ? 'on' : ''} />)}</div>
      <div className="acts-head">
        <h2 id="acts-h" className="h2">Six ways<br />to spend a day</h2>
        <div className="acts-nav">
          <ul className="acts-legend" ref={legend} aria-label="Activity areas">
            {AREAS.map((x, i) => (
              <li key={x.id}>
                <button type="button" className="acts-chip" aria-current={i === cur ? 'true' : undefined} style={{ '--c': x.accent }} onClick={() => jump.current?.(i)}>
                  <AreaIcon id={x.id} key={i === cur ? 'on' : 'off'} /><span>{x.short}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="acts-count" aria-live="polite"><span className="sr-only">Showing </span>{String(cur + 1).padStart(2, '0')}<span aria-hidden="true"> / </span><span className="sr-only"> of </span>{String(AREAS.length).padStart(2, '0')}</p>
          <span className="acts-prog" aria-hidden="true"><i /></span>
          <ScrollCue className="cue-acts" orientation="right" label="Keep scrolling" active={more} />
        </div>
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
                {x.page && <a className="act-more" href={href(x.page)}>More about {x.short.toLowerCase()}</a>}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
