import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { reduced } from '../lib'

// The logo, rebuilt layer by layer, with each layer saying what it stands for.
const BEATS = [
  { k: 'sky', t: 'Sky', p: 'The South Pennines, right on the edge of the Peak District National Park.' },
  { k: 'hill', t: 'Hills', p: 'Moorland, ghylls and crags for climbing, trekking and scrambling, with the remains of a Roman fort close by.' },
  { k: 'water', t: 'Water', p: 'Reservoirs for kayaking, canoeing and getting properly wet.' },
  { k: 'name', t: 'Castleshaw Centre', p: 'Waterworks Road, Delph, Oldham, OL3 5LZ. About six miles from Oldham town centre, and handy for Manchester, Rochdale, Tameside, Huddersfield and Leeds.' },
]

export default function LogoStory() {
  const root = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=260%', pin: true, scrub: 0.6 } })
      tl.from('.lg-sky', { yPercent: -60, opacity: 0, duration: 1 }, 0)
        .from('.beat-sky', { opacity: 0, y: 30, duration: 0.6 }, 0.1)
        .to('.beat-sky', { opacity: 0.4, duration: 0.4 }, 1.1)
        .from('.lg-far', { yPercent: 40, opacity: 0, duration: 1 }, 1)
        .from('.lg-near', { yPercent: 50, opacity: 0, duration: 1 }, 1.25)
        .from('.beat-hill', { opacity: 0, y: 30, duration: 0.6 }, 1.2)
        .to('.beat-hill', { opacity: 0.4, duration: 0.4 }, 2.2)
        .from('.lg-water', { scaleX: 0, transformOrigin: '0 50%', duration: 1 }, 2.2)
        .from('.beat-water', { opacity: 0, y: 30, duration: 0.6 }, 2.3)
        .to('.beat-water', { opacity: 0.4, duration: 0.4 }, 3.3)
        .from('.lg-name', { opacity: 0, y: 14, duration: 0.8 }, 3.3)
        .from('.beat-name', { opacity: 0, y: 30, duration: 0.6 }, 3.4)
    }, root)
    return () => ctx.revert()
  }, [])

  const copy = async (e) => {
    const b = e.currentTarget
    try { await navigator.clipboard.writeText('///cherubs.campfires.liked') } catch {}
    b.classList.add('copied'); setTimeout(() => b.classList.remove('copied'), 1600)
  }

  return (
    <section className="lg" id="where" ref={root} aria-labelledby="lg-h">
      <h2 id="lg-h" className="sr-only">Where we are, and what the logo means</h2>
      <svg className="lg-art" viewBox="0 0 200 104" role="img" aria-label="The Castleshaw Centre logo: sky, two hills, a reservoir and the name">
        <path className="lg-sky" fill="#bfe4f7" d="M0 30 C30 14 60 8 100 12 C140 16 170 4 200 10 L200 60 L0 60 Z" />
        <path className="lg-far" fill="#c1d284" d="M0 44 C34 30 70 26 104 34 C140 42 170 30 200 26 L200 62 L0 62 Z" />
        <path className="lg-near" fill="#8dba08" d="M0 66 C40 50 96 40 140 46 C168 50 186 44 200 40 L200 68 L0 68 Z" />
        <rect className="lg-water" x="0" y="72" width="200" height="8" fill="#0480bc" />
        <text className="lg-name" x="100" y="98" textAnchor="middle">CASTLESHAW CENTRE</text>
      </svg>
      <ol className="beats">
        {BEATS.map((b) => (
          <li key={b.k} className={`beat beat-${b.k}`}>
            <h3>{b.t}</h3>
            <p>{b.p}</p>
            {b.k === 'name' && (
              <button type="button" className="w3w" onClick={copy} data-cue="Copy">
                <b>///</b>cherubs.campfires.liked<span className="w3w-ok" aria-live="polite">Copied</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
