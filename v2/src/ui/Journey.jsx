import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import TH from '../threshold.json'
import { Film, filmSource, prefersStills } from '../film'
import Planner from './Planner'
import AdviceBand from './AdviceBand'
import ScrollCue from './ScrollCue'
import { PHONE, PHONE_HREF, FACEBOOK, QUOTES, href, AALA } from '../data'
import { sendForm, pageName } from '../send'
import { track } from '../track'

// The six chapters of the film, in scroll order. `side` is where the words sit.
const CH = [
  { k: 'hills', name: 'Hills', side: 'left' },
  { k: 'woods', name: 'Woods', side: 'centre' },
  { k: 'mud', name: 'Mud', side: 'left' },
  { k: 'water', name: 'Water', side: 'right' },
  { k: 'fire', name: 'Fire', side: 'centre' },
  { k: 'dusk', name: 'Dusk', side: 'right' },
]
// trail profile for the chapter marker: one waypoint per chapter, height = rough altitude
const TRAIL = [[6, 14], [46, 30], [86, 40], [126, 46], [166, 34], [206, 20]]
const MORPH = 0.45 // share of chapter one that plays during the illustrated threshold
// how each drawn layer lets go: [start, end, x shift %, y shift %], front layers first
const PEEL = {
  near: [0.1, 0.36, 0, 4],
  left: [0.14, 0.42, -2.5, 1],
  right: [0.14, 0.42, 2.5, 1],
  water: [0.2, 0.46, 0, 0],
  far: [0.24, 0.52, 0, 1],
  sky: [0.3, 0.58, 0, 0],
}

export default function Journey({ picks, toggle, onEnquire, msg, setMsg }) {
  const root = useRef(null), canvas = useRef(null), svg = useRef(null), audio = useRef(null)
  const [active, setActive] = useState(-1)
  const [stills, setStills] = useState(false)
  const [sound, setSound] = useState(false)
  const [hasAudio, setHasAudio] = useState(true)
  const [sent, setSent] = useState(false) // false | 'sending' | 'sent' | 'error'
  // the message form: emailed to the centre through Web3Forms (send.js)
  const sendMessage = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('botcheck')) { setSent('sent'); return }
    setSent('sending')
    try {
      await sendForm({ Name: data.get('name'), 'Email or phone': data.get('contact'), Message: data.get('message'), 'Sent from': pageName() },
        { subject: `Website message from ${data.get('name')}`, replyTo: data.get('contact') })
      setSent('sent')
      track('Enquiry sent', { source: 'home' })
    } catch {
      setSent('error')
      track('Enquiry failed', { source: 'home' })
    }
  }
  const base = new URL('./video', document.baseURI).href.replace(/\/$/, '')
  const [inView, setInView] = useState(false)
  const [tucked, setTucked] = useState(false)
  // once the reader starts scrolling the film, the "Keep scrolling" cue leaves the opening words
  // and follows them, larger, in the bottom right corner
  const [moved, setMoved] = useState(false)
  useEffect(() => {
    const el = root.current
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '-40% 0px -40% 0px' })
    io.observe(el)
    // the Call and Sound bar steps aside while a field is in use, and over the contact panel
    let typing = false, contact = false
    const sync = () => setTucked(typing || contact)
    const fin = (e) => { if (e.target.matches('input, textarea, select')) { typing = true; sync() } }
    const fout = () => { typing = false; sync() }
    el.addEventListener('focusin', fin); el.addEventListener('focusout', fout)
    const cio = new IntersectionObserver(([e]) => { contact = e.isIntersecting; sync() }, { rootMargin: '0px 0px -30% 0px' })
    const c = el.querySelector('.j-contact'); if (c) cio.observe(c)
    // a sticky panel taller than the room above the bar sticks by its bottom edge, so all of it can be reached
    const panels = [...el.querySelectorAll('.j-panel-plan, .j-panel-advice')]
    const bar = el.querySelector('.j-controls')
    const fit = () => {
      const dock = bar ? Math.max(16, innerHeight - bar.getBoundingClientRect().top + 12) : 16
      for (const p of panels) {
        p.style.top = ''
        const top = parseFloat(getComputedStyle(p).top) || 0
        p.style.top = p.offsetHeight > innerHeight - dock - top ? `${Math.round(innerHeight - dock - p.offsetHeight)}px` : ''
      }
    }
    fit()
    const ro = new ResizeObserver(fit)
    panels.forEach((p) => ro.observe(p))
    addEventListener('resize', fit)
    return () => { io.disconnect(); cio.disconnect(); ro.disconnect(); removeEventListener('resize', fit); el.removeEventListener('focusin', fin); el.removeEventListener('focusout', fout) }
  }, [])

  useEffect(() => {
    const el = root.current
    let film = null, manifest = null, alive = true
    const blocks = [...el.querySelectorAll('[data-seg]')]
    const layers = [...svg.current.querySelectorAll('[data-layer]')]
    const lines = [...svg.current.querySelectorAll('[data-line]')]
    const marker = el.querySelector('.trail-done')
    const dot = el.querySelector('.trail-dot')
    const len = marker?.getTotalLength?.() || 1

    // fetch the frame manifest only when the reader gets near
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting || film) return
      io.disconnect()
      if (prefersStills()) { setStills(true); return }
      try {
        const { dir } = filmSource()
        manifest = await (await fetch(`${base}/frames/${dir}/manifest.json`)).json()
        if (!alive) return
        film = new Film(canvas.current, manifest, `${base}/frames/${dir}`)
        film.load()
        film.resize()
      } catch { /* no frames: posters remain */ }
    }, { rootMargin: '150% 0px' })
    io.observe(el)

    let last = -1, lastT = -1, wasMoved = false
    const clamp = (v) => Math.min(1, Math.max(0, v))
    const update = () => {
      const vh = innerHeight
      // threshold: 0 when the stage first fills the screen, 1 as the first chapter arrives
      const r0 = blocks[0].getBoundingClientRect()
      const t = clamp(-r0.top / (r0.height - vh * 0.9)) // reaches 1 exactly as chapter one starts
      // chapters: progress through each block, measured at the middle of the screen
      let seg = 0, lp = 0
      for (let i = 1; i < blocks.length; i++) {
        const r = blocks[i].getBoundingClientRect()
        // measured from when the block enters the bottom of the screen, so the
        // footage arrives with the words rather than half a screen behind them
        if (r.top <= vh * 0.9) { seg = i; lp = clamp((vh * 0.9 - r.top) / r.height) }
      }
      // the drawing lets go front to back, parting slightly as it fades.
      // Underneath, frame one of the film is the same drawing, so nothing jumps:
      // the film itself is what turns the shapes into real hills.
      const ease = (a, b) => { const x = clamp((t - a) / (b - a)); return x * x * (3 - 2 * x) }
      if (t !== lastT) { lastT = t; for (const l of layers) {
        const k = l.dataset.layer
        const [a, b, dx, dy] = PEEL[k]
        const e = ease(a, b)
        l.style.transform = `translate(${dx * e}%, ${dy * e}%)`
        l.style.opacity = String(1 - e)
      }
      // the outlines stay behind as a chalk tracing over the real ridges, then go
      for (const o of lines) {
        const [a] = PEEL[o.dataset.line]
        o.style.opacity = String(Math.min(ease(a, a + 0.12), 1 - ease(0.7, 0.95)) * 0.9)
      }
      el.style.setProperty('--thr', t.toFixed(3)) }
      const mv = t > 0.02 || seg > 0
      if (mv !== wasMoved) { wasMoved = mv; setMoved(mv) }
      const per = 1 / CH.length
      const p = seg === 0 ? ease(0.28, 1) * per * MORPH
        : seg === 1 ? per * MORPH + lp * per * (1 - MORPH)
        : (seg - 1 + lp) * per
      film?.set(p)
      const ch = seg === 0 ? (t > 0.55 ? 0 : -1) : seg - 1
      if (ch !== last) { last = ch; setActive(ch) }
      const prog = seg === 0 ? 0 : clamp((seg - 1 + lp) / (CH.length - 1))
      if (marker) { marker.style.strokeDashoffset = String(len * (1 - prog)) }
      if (dot && marker?.getPointAtLength) { const pt = marker.getPointAtLength(len * prog); dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y) }
    }
    // only do the work while the journey is on, or about to be on, the screen
    let near = false
    const nearIO = new IntersectionObserver(([e]) => { near = e.isIntersecting; if (near) update() }, { rootMargin: '50% 0px' })
    nearIO.observe(el)
    // recompute only after the page has scrolled or resized; the film still eases between frames
    let dirty = true
    const mark = () => { dirty = true }
    addEventListener('scroll', mark, { passive: true })
    // on a touch phone that can't keep up (slower than about 30fps while scrolling), fall back to stills
    const coarse = matchMedia('(pointer: coarse)').matches
    let prev = 0
    const dts = []
    const tick = () => {
      if (!near) return
      const now = performance.now()
      if (dirty) {
        dirty = false; update()
        if (coarse && film?.ready && prev && dts.length < 120) {
          dts.push(now - prev)
          if (dts.length === 120 && [...dts].sort((a, b) => a - b)[60] > 34) { film = null; setStills(true) }
        }
      }
      prev = now
      film?.tick()
    }
    gsap.ticker.add(tick)
    const rs = () => { dirty = true; film?.resize() }
    addEventListener('resize', rs)
    const ro = new ResizeObserver(rs)
    ro.observe(canvas.current)
    return () => { alive = false; io.disconnect(); nearIO.disconnect(); gsap.ticker.remove(tick); removeEventListener('resize', rs); removeEventListener('scroll', mark); ro.disconnect() }
  }, [base])

  useEffect(() => { // ambient sound: user-started only, follows the toggle
    const a = audio.current
    if (!a) return
    if (sound) { a.volume = 0.5; a.play().catch(() => setSound(false)) } else a.pause()
  }, [sound])

  const pathD = 'M' + TRAIL.map((p) => p.join(' ')).join(' L')
  const q = (i) => QUOTES[i]

  return (
    <section className={`journey${stills ? ' is-stills' : ''}`} ref={root} data-active={active} data-side={active >= 0 ? CH[active].side : 'none'} aria-label="A day at Castleshaw, told as a film">
      <div className="stage" aria-hidden="true">
        <div className="stills">
          {CH.map((c, i) => <img key={c.k} src={`./video/posters/${c.k}.jpg`} alt="" loading="lazy" className={i === active ? 'on' : ''} />)}
        </div>
        <canvas ref={canvas} className="film" />
        <svg ref={svg} className="illus" viewBox={`0 0 ${TH.w} ${TH.h}`} preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="thr-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a6d6f0" /><stop offset=".45" stopColor="#f3e7c8" />
            </linearGradient>
            <radialGradient id="thr-sun"><stop offset="0" stopColor="#fffcf0" /><stop offset=".5" stopColor="#fffcf0" /><stop offset=".52" stopColor="#fff6de" stopOpacity=".6" /><stop offset="1" stopColor="#fff6de" stopOpacity="0" /></radialGradient>
          </defs>
          <g data-layer="sky"><rect width={TH.w} height={TH.h} fill="url(#thr-sky)" /><circle cx={TH.sun[0]} cy={TH.sun[1]} r={TH.sun[2] * 2} fill="url(#thr-sun)" /></g>
          {['far', 'water', 'left', 'right', 'near'].map((k) => <path key={k} data-layer={k} d={TH.layers[k].d} fill={TH.layers[k].fill} />)}
          {['far'].map((k) => <path key={k} data-line={k} className="trace" d={TH.layers[k].line} />)}
        </svg>
        {/* haze over the far hills and a fine grain, laid over the drawing only: both are gone
            before the film starts to change, so its first frame still matches the drawing */}
        <div className="thr-haze" /><div className="grain thr-grain" />
        <div className="scrim scrim-left" /><div className="scrim scrim-right" /><div className="scrim scrim-centre" /><div className="scrim scrim-foot" />
        <div className="trail">
          <svg viewBox="0 0 212 52"><path className="trail-all" d={pathD} /><path className="trail-done" d={pathD} />
            {TRAIL.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.2" className={i <= active ? 'wp on' : 'wp'} />)}
            <circle className="trail-dot" r="5" cx={TRAIL[0][0]} cy={TRAIL[0][1]} />
          </svg>
          <span className="trail-name">{active >= 0 ? CH[active].name : 'Start'}</span>
        </div>
      </div>

      <div className={`j-controls${inView && !tucked ? ' is-on' : ''}`}>
        <a className="j-call" href={PHONE_HREF} data-cue="Call">Call {PHONE}</a>
        {hasAudio && !stills && (
          <button type="button" className="j-sound" aria-label="Sound" aria-pressed={sound} onClick={() => setSound(!sound)} data-cue={sound ? 'Mute' : 'Listen'}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" />{sound ? <path className="w" d="M16 8.5c1.5 1.8 1.5 5.2 0 7M18.5 6c3 3.3 3 8.7 0 12" /> : <path className="w" d="M17 9l5 6M22 9l-5 6" />}</svg>
            <span>{sound ? 'Sound on' : 'Sound off'}</span>
          </button>
        )}
        <audio ref={audio} src="./video/ambience.mp3" loop preload="none" onError={() => setHasAudio(false)} />
      </div>
      <ScrollCue className="cue-follow" label="Keep scrolling" always active={moved && inView && !tucked} />

      <div className="j-flow">
        <div className="j-block j-threshold" data-seg="0">
          <div className="j-thr-copy">
            <h2 className="j-thr-h">Same hills.<br />A little less flat.</h2>
            <p>Scroll back up to rewind.</p>
            <ScrollCue className="cue-thr" label="Keep scrolling" always active={!moved} />
          </div>
        </div>

        <div className="j-block j-block-first" data-seg="1">
          <div className="j-copy j-left">
            <h2 className="j-h">In Delph, above Oldham</h2>
            <p>The South Pennines, right on the edge of the Peak District National Park. Waterworks Road, Delph, Oldham, OL3 5LZ, about six miles from Oldham town centre.</p>
            <p>Handy for Manchester, Rochdale, Tameside, Huddersfield and Leeds.</p>
          </div>
        </div>

        <div className="j-block j-block-tall" data-seg="2">
          <div className="j-panel j-panel-plan">
            <Planner picks={picks} toggle={toggle} onEnquire={onEnquire} />
          </div>
        </div>

        <div className="j-block" data-seg="3">
          <figure className="j-quote j-left">
            <h2 className="j-kicker">Puddles got a mention</h2>
            <blockquote><p><span className="j-q-open" aria-hidden="true">&ldquo;</span>One of the highlights was jumping in puddles!<span aria-hidden="true">&rdquo;</span></p></blockquote>
            <figcaption><span className="j-q-rule" aria-hidden="true" />{q(1).by}</figcaption>
          </figure>
        </div>

        <div className="j-block" data-seg="4">
          <div className="j-copy j-right j-copy-wide">
            <h2 className="j-h">A day on the water</h2>
            <p className="j-lead">Kayaking and canoeing on reservoir water in the hills above Delph.</p>
            <p>First timers start close to the bank, getting a feel for the boat, the paddle and the cold. By the end of the session most groups are racing, rafting up together, or trying to stand up in a canoe without falling in. A few manage it.</p>
            <p>Every water session runs under our AALA licence for watersports ({AALA}) and is led by our own instructors, with the boats, paddles and buoyancy aids provided. Bring a full change of clothes and a towel, and something warm for afterwards.</p>
            <a className="j-more" href={href('activities/adventure-on-water/')}>More about adventure on water</a>
          </div>
        </div>

        <div className="j-block j-block-tall" data-seg="5">
          <div className="j-panel j-panel-advice"><AdviceBand /></div>
        </div>

        <div className="j-block j-block-end" data-seg="6">
          <div className="j-panel j-contact" id="contact">
            <div className="j-contact-info">
              <h2 className="j-h">Stay the night</h2>
              <p>Self-catering accommodation, catering and venue hire for schools and groups. To book activities, residential visits or accommodation, ring us.</p>
              <a className="j-tel" href={PHONE_HREF} data-cue="Call">{PHONE}</a>
              <p className="j-small">Waterworks Road, Delph, Oldham, OL3 5LZ. <a href={FACEBOOK} rel="noopener">Facebook</a></p>
            </div>
            <div className="j-contact-form">
              {sent === 'sent' ? (
                <div className="j-sent" role="status"><strong>Thank you.</strong> We&rsquo;ve got your message and will reply within a few working days. For anything urgent, ring {PHONE}.
                  <button type="button" className="txt" onClick={() => setSent(false)}>Send another message</button></div>
              ) : (
                <form className="j-form" onSubmit={sendMessage}>
                  <label><span>Name</span><input enterKeyHint="next" name="name" autoComplete="name" required /></label>
                  <label><span>Email or phone</span><input enterKeyHint="next" name="contact" autoComplete="email" required /></label>
                  <label className="j-wide"><span>Message</span><textarea name="message" rows="3" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Who is coming, roughly when, and what you would like to do." /></label>
                  <input type="checkbox" name="botcheck" className="form-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  {sent === 'error' && <p className="j-fail j-wide" role="alert">Sorry, your message didn&rsquo;t send. Please try again, or ring {PHONE}.</p>}
                  <button type="submit" className="ct-send" disabled={sent === 'sending'}>{sent === 'sending' ? 'Sending…' : 'Send message'}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
