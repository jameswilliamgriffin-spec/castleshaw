import { useEffect, useState } from 'react'
import { reduced, ROOT } from '../lib'

// A short, purposeful intro: the logo's bands draw in while the fonts, hero photos and the
// first frames of the film load, so the drawing-to-film moment further down is seamless.
// It shows once per visit, never longer than MAX, and is skipped for reduced motion.
const MIN = 1100, MAX = 2600

function preload(src) {
  return new Promise((res) => { const i = new Image(); i.onload = i.onerror = () => res(); i.src = src })
}

export default function Loader() {
  const skip = typeof window === 'undefined' || reduced() || (() => { try { return sessionStorage.getItem('cs-intro') } catch { return null } })()
  const [phase, setPhase] = useState(skip ? 'gone' : 'loading')
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (skip) { window.dispatchEvent(new Event('cs:ready')); window.__csReady = true; return }
    document.documentElement.classList.add('is-loading')
    let done = 0, total = 1, cancelled = false
    const tick = () => { done++; if (!cancelled) setPct(Math.min(1, done / total)) }
    const t0 = performance.now()
    const work = (async () => {
      const dir = matchMedia('(max-width: 760px)').matches ? 'mobile' : 'desktop'
      const base = new URL(`./video/frames/${dir}/`, document.baseURI).href
      const imgs = ['land-ghyll', 'water-consent', 'environmental-education', 'logo'].map((n) => `${ROOT}shared/images/${n}.jpg`)
      let frames = []
      try {
        const m = await (await fetch(base + 'manifest.json')).json()
        // the threshold frames, then every 16th, so the film can start anywhere
        for (let i = 0; i < m.count; i++) if (i < 12 || i % 16 === 0) frames.push(`${base}${m.prefix}${String(i + 1).padStart(4, '0')}.${m.ext}`)
      } catch { frames = [] }
      const jobs = [document.fonts.ready, ...imgs.map(preload), ...frames.map(preload)]
      total = jobs.length
      await Promise.all(jobs.map((j) => Promise.resolve(j).then(tick)))
    })()
    const timeout = new Promise((r) => setTimeout(r, MAX))
    Promise.race([work, timeout]).then(() => {
      const wait = Math.max(0, MIN - (performance.now() - t0))
      setTimeout(() => {
        if (cancelled) return
        setPct(1)
        setPhase('leaving')
        try { sessionStorage.setItem('cs-intro', '1') } catch {}
        document.documentElement.classList.remove('is-loading')
        window.__csReady = true
        window.dispatchEvent(new Event('cs:ready'))
        setTimeout(() => setPhase('gone'), 1100)
      }, wait)
    })
    return () => { cancelled = true; document.documentElement.classList.remove('is-loading') }
  }, [skip])

  if (phase === 'gone') return null
  return (
    <div className={`ld ld-${phase}`} role="status" aria-live="polite" aria-label={phase === 'loading' ? 'Loading the page' : 'Page loaded'}>
      <div className="ld-mark" aria-hidden="true">
        <i className="ld-b ld-sky" /><i className="ld-b ld-far" /><i className="ld-b ld-near" /><i className="ld-b ld-water" />
      </div>
      <p className="ld-name" aria-hidden="true">Castleshaw Centre</p>
      <div className="ld-bar" aria-hidden="true"><i style={{ transform: `scaleX(${pct})` }} /></div>
    </div>
  )
}
