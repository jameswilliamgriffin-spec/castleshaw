import { useEffect, useRef, useState } from 'react'

// "Keep scrolling": a few dots walking a hand-drawn trail. It only appears after the
// reader has been still for a couple of seconds, vanishes the moment they scroll,
// and only where its section is on screen. orientation: 'down' | 'right'.
const IDLE_MS = 2000
const subs = new Set()
let idle = false, timer = 0, started = false
function startIdle() {
  if (started || typeof window === 'undefined') return
  started = true
  const set = (v) => { if (idle !== v) { idle = v; subs.forEach((f) => f(v)) } }
  const poke = () => { set(false); clearTimeout(timer); timer = setTimeout(() => set(true), IDLE_MS) }
  ;['scroll', 'wheel', 'touchmove', 'keydown', 'pointerdown'].forEach((t) => addEventListener(t, poke, { passive: true, capture: true }))
  poke()
}

const DOWN = 'M6 2 C 2 9, 10 13, 6 21 S 3 31, 6 38'
const RIGHT = 'M2 6 C 9 2, 13 10, 21 6 S 31 3, 38 6'
// five points along the trail, top to bottom (mirrored for the sideways version)
const DOTS = [[4.6, 7], [7.6, 13.5], [5.4, 20.5], [4.8, 27.5], [5.8, 33]]

export default function ScrollCue({ orientation = 'down', label = 'Keep scrolling', active = true, className = '' }) {
  const ref = useRef(null)
  const [isIdle, setIdle] = useState(false)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    startIdle()
    subs.add(setIdle); setIdle(idle)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.9 })
    io.observe(ref.current)
    return () => { subs.delete(setIdle); io.disconnect() }
  }, [])
  const show = isIdle && inView && active
  const h = orientation === 'down'
  return (
    <div ref={ref} className={`cue cue-${orientation}${show ? ' is-on' : ''} ${className}`} aria-hidden="true">
      <svg viewBox={h ? '0 0 12 44' : '0 0 44 12'}>
        <path className="cue-path" d={h ? DOWN : RIGHT} />
        {DOTS.map(([x, y], i) => <circle key={i} className="cue-dot" r="1.5" cx={h ? x : y} cy={h ? y : x} style={{ '--i': i }} />)}
        <circle className="cue-ring" cx={h ? 6 : 38} cy={h ? 38 : 6} r="3.6" />
      </svg>
      <span>{label}</span>
    </div>
  )
}
