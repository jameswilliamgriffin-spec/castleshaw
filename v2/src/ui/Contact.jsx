import { useEffect, useMemo, useState } from 'react'
import { PHONE, PHONE_HREF, FACEBOOK, NAV_SECTIONS, PRIVACY, CONTACT, EMAIL, ADDRESS, INCIDENT, INCIDENT_HREF } from '../data'
import { ridge, ROOT, HOME, reduced } from '../lib'
import { Squiggle, useReveal } from './Squiggle'
import './footer.css'
import { WaterGL } from './Shaders'

export function Contact({ msg, setMsg }) {
  const [sent, setSent] = useState(false)
  const edge = useMemo(() => ridge(2.4, { h: 120, base: 0.6, amp: 0.25 }), [])
  return (
    <section className="ct" id="contact" aria-labelledby="ct-h">
      <WaterGL />
      <svg className="ct-edge" viewBox="0 0 1600 120" preserveAspectRatio="none" aria-hidden="true"><path d={edge} /></svg>
      <div className="ct-grid">
        <div>
          <h2 id="ct-h" className="h2">Get in touch</h2>
          <p className="ct-lead">To book activities, residential visits or self-catering accommodation, or with any other question, give us a ring.</p>
          <a className="ct-tel" href={PHONE_HREF} data-cue="Call">{PHONE}</a>
          <p className="ct-addr">Waterworks Road, Delph, Oldham, OL3 5LZ<br /><a href={FACEBOOK} rel="noopener">Castleshaw Centre on Facebook</a></p>
        </div>
        <form className="ct-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          {sent ? (
            <div className="ct-sent" role="status">
              <h3>Thanks. Message ready.</h3>
              <p>This form is part of a design concept and does not send yet. For a real booking, ring {PHONE}.</p>
              <button type="button" className="txt" onClick={() => setSent(false)}>Back to the form</button>
            </div>
          ) : (
            <>
              <p className="ct-form-h">Or leave a message</p>
              <label><span>Name</span><input name="name" autoComplete="name" required /></label>
              <label><span>Email or phone</span><input name="contact" autoComplete="email" required /></label>
              <label><span>School or group (optional)</span><input name="org" autoComplete="organization" /></label>
              <label><span>Message</span><textarea rows="5" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Who is coming, roughly when, and what you would like to do." /></label>
              <button type="submit" className="ct-send">Send message</button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

const FT_NARROW = '(max-width: 699px)'
function useFooterNarrow() {
  const [narrow, setNarrow] = useState(() => matchMedia(FT_NARROW).matches)
  useEffect(() => {
    const m = matchMedia(FT_NARROW)
    const on = () => setNarrow(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return narrow
}

const FtArrow = () => <svg className="ft-arr" viewBox="0 0 20 12" aria-hidden="true"><path d="M1 6h17M13 1.5 18 6l-5 4.5" /></svg>

// A footer link: arrow slides in, the hand-drawn underline draws beneath.
function FtLink({ href, children, i, rel, out }) {
  return <a className="ft-a sq-host" href={href} rel={rel}><FtArrow /><span className="ft-a-t">{children}<Squiggle i={i} /></span>{out && <span className="ft-out" aria-hidden="true">&#8599;</span>}</a>
}

const toTop = () => {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: reduced() })
  else window.scrollTo({ top: 0, behavior: reduced() ? 'auto' : 'smooth' })
  document.querySelector('.hd-logo')?.focus({ preventScroll: true })
}

export function Footer() {
  const ref = useReveal()
  const narrow = useFooterNarrow()
  const [open, setOpen] = useState(-1)
  const groups = NAV_SECTIONS.filter((x) => x.children.length)
  return (
    <footer className="ft" ref={ref}>
      <div className="ft-wrap">
        <div className="ft-brand rv" style={{ '--k': 0 }}>
          <a className="ft-logo" href={HOME}><img src={`${ROOT}shared/images/logo.jpg`} alt="Castleshaw Centre home" width="200" height="129" /></a>
          <p className="ft-desc">Oldham Council&rsquo;s Outdoor and Environmental Education service, at the edge of the Peak District National Park.</p>

          <div className="ft-touch" aria-labelledby="ft-touch-h" role="group">
            <h2 className="ft-h" id="ft-touch-h">Get in touch</h2>
            <a className="ft-tel" href={PHONE_HREF}>{PHONE}</a>
            <a className="ft-mail sq-host" href={`mailto:${EMAIL}`}><span className="ft-a-t">{EMAIL}<Squiggle i={1} /></span></a>
            <address className="ft-addr">{ADDRESS.slice(0, 2).join(', ')}<br />{ADDRESS.slice(2).join(' ')}</address>
            <FtLink href={FACEBOOK} rel="noopener" i={2} out>Facebook</FtLink>
            <p className="ft-sos"><span className="ft-dot" aria-hidden="true" /><span>24/7 critical incident line for visits: <a href={INCIDENT_HREF}>{INCIDENT}</a></span></p>
          </div>
        </div>

        <div className="ft-groups">
          {groups.map((x, gi) => {
            const id = `ft-h-${x.key}`, panel = `ft-p-${x.key}`, on = open === gi
            return (
              <nav key={x.key} className={`ft-group rv${on ? ' is-open' : ''}`} aria-labelledby={id} style={{ '--k': gi + 1 }}>
                <h2 className="ft-h" id={id}>
                  {narrow ? (
                    <button type="button" className="ft-tog" aria-expanded={on} aria-controls={panel} onClick={() => setOpen(on ? -1 : gi)}>
                      {x.long}<svg className="ft-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
                    </button>
                  ) : <a href={x.href}>{x.long}</a>}
                </h2>
                <div className="ft-panel" id={panel}>
                  <ul>
                    {narrow && <li><FtLink href={x.href} i={0}>Overview</FtLink></li>}
                    {x.children.map((c, ci) => <li key={c.key}><FtLink href={c.href} i={ci}>{c.title}</FtLink></li>)}
                  </ul>
                </div>
              </nav>
            )
          })}
        </div>
      </div>

      <div className="ft-bar rv" style={{ '--k': 5 }}>
        <p className="ft-cred">LOtC Quality Badge 101040. Licensed by AALA for climbing, watersports and trekking. Adventuremark accredited.</p>
        <p className="ft-note">Homepage design concept. Photographs, drawings and quoted words belong to the Castleshaw Centre and the people who sent them.</p>
        <div className="ft-row">
          <span className="ft-copy">&copy; Oldham Council {new Date().getFullYear()}</span>
          <ul className="ft-small">
            <li><a href={NAV_SECTIONS.find((x) => x.key === 'stay').href}>Stay and hire</a></li>
            <li><a href={CONTACT}>Contact</a></li>
            <li><a href={PRIVACY}>Privacy notice</a></li>
            <li><a href={FACEBOOK} rel="noopener">Facebook</a></li>
          </ul>
          <button type="button" className="ft-top" onClick={toTop}>Back to top <svg viewBox="0 0 12 16" aria-hidden="true"><path d="M6 15V2M1.5 6.5 6 2l4.5 4.5" /></svg></button>
        </div>
      </div>
    </footer>
  )
}
