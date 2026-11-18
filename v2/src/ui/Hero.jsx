import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import Button from './Button'
import ScrollCue from './ScrollCue'
import { ridge, ridgePoints, ridgeY, reduced, fine, goTo, ROOT } from '../lib'
import { Photo } from './inner/Slot'
import { SkyGL } from './Shaders'

// set line by line on wide screens so no word is left on its own
const LINES = [['Out', 'here,', 'the'], ['Pennines', 'are'], ['the', 'classroom.']]

// Three photos, layered between the hills: each one sits at a different depth.
const WINS = [
  { k: 1, src: 'land-ghyll.jpg', alt: 'Two young people in helmets scrambling up a rocky moorland stream', shape: 'blob-2', pos: '45% 40%', lean: 12 },
  { k: 2, src: 'water-consent.jpg', alt: 'A kayaker in a red helmet wading out of a reservoir and shouting with delight', shape: 'blob-4', pos: '50% 35%', lean: 6 },
  { k: 3, src: 'environmental-education.jpg', alt: 'A line of walkers with purple rucksacks crossing moorland above a reservoir', shape: 'blob-7', pos: '50% 50%', lean: 9 },
]

// A few soft clouds, drawn in the same flat style as the hills.
const CLOUD = 'M14 34c-7 0-12-4-12-10 0-5 4-9 10-9 1-7 7-12 15-12 7 0 12 4 14 10 2-1 4-2 7-2 7 0 12 5 12 11 0 7-6 12-14 12z'

// The hills' shapes (seed and size), shared by the fills, their sunlit edges and what sits on them.
const HILLS = { far: [1.2, { base: 0.45, amp: 0.32 }], mid: [3.7, { base: 0.55, amp: 0.26 }], near: [5.9, { base: 0.62, amp: 0.16 }] }
// The crest alone, as an open line: lit along its top by the sun (which sits to the right).
const crest = (d) => d.replace(/^M0 [\d.]+ L/, 'M').replace(/ L[\d.]+ [\d.]+ Z$/, '')
// A line that follows a hill's crest a set distance below it, between two x positions: a field wall.
function contour(pts, x0, x1, below) {
  const out = []
  for (let x = x0; x <= x1; x += 20) out.push(`${x.toFixed(0)} ${(ridgeY(pts, x) + below).toFixed(1)}`)
  return 'M' + out.join(' L')
}
// A wall running from just under the crest down the slope, bending a little as it goes.
function downhill(pts, x, lean, len = 400) {
  const y = ridgeY(pts, x) + 8, end = Math.min(400, y + len)
  return `M${x} ${y.toFixed(1)} Q${x + lean * 0.4} ${((y + end) / 2).toFixed(1)} ${x + lean} ${end.toFixed(1)}`
}
// A flat little tree in the logo's style: a round crown, its sunny side lighter, on a short trunk.
function Tree({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-1.6" y="-7" width="3.2" height="9" rx="1" fill="#55730c" />
      <ellipse cx="0" cy="-15" rx="9" ry="11" fill="#4d7a0d" />
      <path d="M0 -26 A9 11 0 0 1 0 -4 A6 11 0 0 0 0 -26 Z" fill="#6c9a16" />
    </g>
  )
}

export default function Hero() {
  const root = useRef(null), sunRef = useRef(null)
  const far = useMemo(() => ridge(...HILLS.far), [])
  const mid = useMemo(() => ridge(...HILLS.mid), [])
  const near = useMemo(() => ridge(...HILLS.near), [])
  // walls and trees, placed on the hills they belong to
  const detail = useMemo(() => {
    const fp = ridgePoints(...HILLS.far), mp = ridgePoints(...HILLS.mid)
    return {
      // field walls on the far hill: strips following its slope, cut by a few short walls running down it
      farWalls: [contour(fp, 100, 700, 36), contour(fp, 160, 640, 92), contour(fp, 900, 1540, 34), contour(fp, 980, 1480, 88),
        downhill(fp, 300, 18, 92), downhill(fp, 520, -14, 92), downhill(fp, 1120, 16, 88), downhill(fp, 1340, -12, 88)],
      midWalls: [contour(mp, 60, 560, 40), contour(mp, 760, 1540, 38), downhill(mp, 300, 50, 150), downhill(mp, 1060, 40, 150), downhill(mp, 1380, -30, 150)],
      // trees stand on the middle hill's crest, in the gaps between the photos
      trees: [[505, 1.2], [528, 1], [548, 1.3], [1296, 1.25], [1320, 1], [1478, 1.15]].map(([x, sc]) => ({ x, y: ridgeY(mp, x) + 5, s: sc })),
    }
  }, [])
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
        {/* Each hill: lighter at its top and deeper at its foot, a sunlit edge on the side facing the sun,
            and dry-stone walls. The farthest hill takes on the sky's haze. */}
        <svg className="rg rg-far" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hl-far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d2dfa4" /><stop offset=".45" stopColor="#c1d284" /><stop offset="1" stopColor="#b0c26c" /></linearGradient>
            <linearGradient id="hl-rim" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fffbe6" stopOpacity="0" /><stop offset=".5" stopColor="#fffbe6" stopOpacity=".25" /><stop offset=".85" stopColor="#fffbe6" stopOpacity=".85" /><stop offset="1" stopColor="#fffbe6" stopOpacity=".6" /></linearGradient>
          </defs>
          <g data-lean="3">
            <path d={far} fill="url(#hl-far)" />
            <g className="rg-walls rg-walls-far">{detail.farWalls.map((d) => <path key={d} d={d} />)}</g>
            <path className="rg-rim" d={crest(far)} />
          </g>
        </svg>
        {WINS.map((w, i) => (
          <figure key={w.k} className={`win win-${w.k}`} data-lean={w.lean}>
            <div className="win-par">
              <div className="win-float" style={drift[i]}>
                <div className="win-mask" style={{ '--clip': `var(--shape-${w.shape})` }}>
                  <Photo src={`${ROOT}shared/images/${w.src}`} sizes="(max-width: 899px) 34vw, 22vw" alt={w.alt} width="600" height="800" style={{ objectPosition: w.pos }} />
                </div>
              </div>
            </div>
          </figure>
        ))}
        <svg className="rg rg-mid" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="hl-mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a2cb26" /><stop offset=".35" stopColor="#8dba08" /><stop offset="1" stopColor="#6f9606" /></linearGradient></defs>
          <g data-lean="7">
            <path d={mid} fill="url(#hl-mid)" />
            <g className="rg-walls">{detail.midWalls.map((d) => <path key={d} d={d} />)}</g>
            <g className="rg-trees">{detail.trees.map((t) => <Tree key={t.x} {...t} />)}</g>
            <path className="rg-rim" d={crest(mid)} />
          </g>
        </svg>
        <svg className="rg rg-near" viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="hl-near" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6f1bb" /><stop offset=".55" stopColor="#d6e49f" /><stop offset="1" stopColor="#dbe9a8" /></linearGradient></defs>
          <g data-lean="10"><g className="sway"><path d={near} fill="url(#hl-near)" /><path className="rg-rim rg-rim-soft" d={crest(near)} /></g></g>
        </svg>
      </div>
      <div className="grain" aria-hidden="true" />
      <ScrollCue className="cue-hero" label="Keep scrolling" />
    </section>
  )
}
