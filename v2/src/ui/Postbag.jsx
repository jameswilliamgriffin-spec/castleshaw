import { useRef, useState } from 'react'
import gsap from 'gsap'
import { POSTBAG, QUOTES, href } from '../data'
import { reduced } from '../lib'

// A pile of thank-you post. Take the top one off and it goes to the bottom of the pile.
export default function Postbag() {
  const [order, setOrder] = useState(() => POSTBAG.map((_, i) => i))
  const pile = useRef(null), busy = useRef(false), start = useRef(null)
  const n = POSTBAG.length

  const next = (dir = 1) => {
    if (busy.current) return
    const top = pile.current.querySelector('.card[data-top]')
    const done = () => { setOrder((o) => [...o.slice(1), o[0]]); busy.current = false }
    if (reduced() || !top) return done()
    busy.current = true
    gsap.to(top, { x: dir * 420, y: -40, rotation: dir * 18, opacity: 0, duration: 0.45, ease: 'power2.in', onComplete: () => { gsap.set(top, { clearProps: 'all' }); done() } })
  }
  const back = () => setOrder((o) => [o[n - 1], ...o.slice(0, n - 1)])

  // swipe the top card
  const down = (e) => { start.current = e.clientX }
  const up = (e) => { if (start.current == null) return; const d = e.clientX - start.current; start.current = null; if (Math.abs(d) > 50) next(Math.sign(d)) }

  return (
    <section className="pb" id="post" aria-labelledby="pb-h">
      <div className="pb-txt">
        <h2 id="pb-h" className="h2">Back at school, they wrote to us</h2>
        <p>Letters, drawings and notes from pupils, teachers and parents. These are the real ones, from our Hall of Fame and testimonials pages.</p>
        <div className="pb-ctl">
          <button type="button" className="round" onClick={back} aria-label="Previous note">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" className="round round-main" onClick={() => next(1)} aria-label="Next note">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <span className="pb-n" aria-live="polite">{order[0] + 1} of {n}</span>
        </div>
        <p className="pb-links"><a href={href('about/what-people-say/') + '#hall-of-fame'}>See the Hall of Fame</a><a href={href('about/what-people-say/')}>Read all testimonials</a></p>
      </div>
      <div className="pb-pile" ref={pile} onPointerDown={down} onPointerUp={up} data-cue="Swipe">
        {order.slice(0, 4).reverse().map((idx, k, arr) => {
          const item = POSTBAG[idx], depth = arr.length - 1 - k, isTop = depth === 0
          const rot = [-1.5, 3, -4, 2.5][idx % 4]
          return (
            <figure key={idx} className={`card card-${item.k}`} data-top={isTop ? '' : undefined} aria-hidden={!isTop}
              style={{ '--d': depth, '--r': `${rot}deg` }}>
              {item.k === 'img'
                ? <img src={item.src} alt={item.alt} draggable="false" />
                : <><blockquote className={QUOTES[item.i].big ? 'big' : ''}>{QUOTES[item.i].t}</blockquote><figcaption>{QUOTES[item.i].by}</figcaption></>}
            </figure>
          )
        })}
      </div>
    </section>
  )
}
