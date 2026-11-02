import { useEffect } from 'react'
import gsap from 'gsap'

// Each page declares where it sits: <script>window.__ROOT = '../'; window.__HOME = './'</script>
// ROOT is the site root (chooser, shared images); HOME is the v2 homepage.
// Both are made absolute, so links stay right when an inner page swaps to another
// page in its section without reloading (see inner.jsx).
const abs = (p) => (typeof window !== 'undefined' ? new URL(p, location.href).href : p)
export const ROOT = abs((typeof window !== 'undefined' && window.__ROOT) || '../')
export const HOME = abs((typeof window !== 'undefined' && window.__HOME) || './')
export const ADVICE = HOME + 'advice-and-guidance/'

export const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
export const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches

export function goTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.5 })
  else el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth' })
  el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true })
}

// A Pennine skyline, drawn the way the logo draws its hills: long soft curves.
export function ridge(seed, { w = 1600, h = 400, base = 0.45, amp = 0.18 } = {}) {
  const pts = []
  for (let i = 0; i <= 16; i++) {
    const x = (w * i) / 16
    const t = i / 16
    const y = h * (base - amp * (Math.sin(t * 3.1 + seed) * 0.6 + Math.sin(t * 7.3 + seed * 2.1) * 0.25 + Math.sin(t * 1.3 + seed * 0.7) * 0.5))
    pts.push([x, y])
  }
  let d = `M0 ${h} L0 ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[i + 1]
    const mx = (x0 + x1) / 2
    d += ` C${mx.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`
  }
  return d + ` L${w} ${h} Z`
}

export function useMagnet(ref, k = 0.3) {
  useEffect(() => {
    const el = ref.current
    if (!el || reduced() || !fine()) return
    const x = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    const y = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'elastic.out(1, 0.5)' })
    const mv = (e) => { const b = el.getBoundingClientRect(); x((e.clientX - b.left - b.width / 2) * k); y((e.clientY - b.top - b.height / 2) * k) }
    const lv = () => { x(0); y(0) }
    el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv)
    return () => { el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv) }
  }, [ref, k])
}
