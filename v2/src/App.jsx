import { useCallback, useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cursor, Header, Menu } from './ui/Top'
import Hero from './ui/Hero'
import Activities from './ui/Activities'
import AdviceBand from './ui/AdviceBand'
import Journey from './ui/Journey'
import Loader from './ui/Loader'
import { Footer } from './ui/Contact'
import { reduced, goTo } from './lib'
import './ui/shape/shapes'
import './ui/shape/shapes.css'

export default function App() {
  const [menu, setMenu] = useState(false)
  const [picks, setPicks] = useState(() => new Set())
  const [msg, setMsg] = useState('')
  const toggle = useCallback((id) => setPicks((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n }), [])
  const close = useCallback(() => setMenu(false), [])

  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ lerp: 0.09 })
    window.__lenis = lenis
    if (!window.__csReady) { lenis.stop(); window.addEventListener('cs:ready', () => lenis.start(), { once: true }) }
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy(); window.__lenis = null }
  }, [])

  return (
    <>
      <Loader />
      <a className="skip" href="#main">Skip to content</a>
      <Cursor />
      <Header open={menu} setOpen={setMenu} count={picks.size} grow />
      <Menu open={menu} close={close} />
      <main id="main">
        <Hero />
        <Activities picks={picks} toggle={toggle} />
        <AdviceBand />
        <Journey picks={picks} toggle={toggle} onEnquire={(t) => { setMsg(t); goTo('contact') }} msg={msg} setMsg={setMsg} />
      </main>
      <Footer />
    </>
  )
}
