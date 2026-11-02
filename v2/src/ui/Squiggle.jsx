import { useEffect, useRef } from 'react'
import './tokens.css'

// Three loose, hand-drawn underlines, handed out in turn so neighbours never match.
export const SQUIGGLES = [
  'M2 9 C 35 2, 65 13, 105 7 S 180 3, 220 9 S 280 11, 298 5',
  'M2 6 C 28 12, 72 2, 112 8 S 176 12, 214 6 S 274 3, 298 9',
  'M2 10 C 44 4, 70 5, 108 9 S 168 13, 206 7 S 262 2, 298 7',
]

export function Squiggle({ i = 0, className = 'sq' }) {
  return (
    <svg className={className} viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
      <path d={SQUIGGLES[i % SQUIGGLES.length]} pathLength="1" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// Faint contour lines, a nod to the valley. Drawn once.
const CONTOURS = Array.from({ length: 9 }, (_, k) => {
  const pts = []
  for (let x = -40; x <= 1480; x += 40) {
    const y = 470 + k * 52 - 150 * Math.sin((x / 1440) * Math.PI * 0.95 + k * 0.16) * (1 - k * 0.07) + 18 * Math.sin(x / 110 + k * 1.3)
    pts.push(`${x} ${y.toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
})

export function Contours({ className = 'contours', flip }) {
  return (
    <svg className={className} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      {CONTOURS.map((d) => <path key={d} d={d} />)}
    </svg>
  )
}

// Adds .is-in to the element the first time it scrolls into view.
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-in'); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
