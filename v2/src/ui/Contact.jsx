import { useMemo, useState } from 'react'
import { PHONE, PHONE_HREF, FACEBOOK, NAV_SECTIONS, PRIVACY, CONTACT, EMAIL, ADDRESS, INCIDENT, INCIDENT_HREF } from '../data'
import { ridge, ROOT } from '../lib'
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

export function Footer() {
  return (
    <footer className="ft">
      <div className="ft-top">
        <div className="ft-id">
          <span className="ft-logo"><img src={`${ROOT}shared/images/logo.jpg`} alt="Castleshaw Centre" width="200" height="129" /></span>
          <p>Oldham Council&rsquo;s Outdoor and Environmental Education service, at the edge of the Peak District National Park.</p>
          <p className="ft-cred">LOtC Quality Badge 101040. Licensed by AALA for climbing, watersports and trekking. Adventuremark accredited.</p>
        </div>
        <div className="ft-contact">
          <h2>Get in touch</h2>
          <a className="ft-tel" href={PHONE_HREF}>{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <address>{ADDRESS.map((l, i) => <span key={l}>{l}{i < ADDRESS.length - 1 && <br />}</span>)}</address>
          <p className="ft-sos">24/7 critical incident line for visits: <a href={INCIDENT_HREF}>{INCIDENT}</a></p>
          <a href={FACEBOOK} rel="noopener">Facebook</a>
        </div>
        {NAV_SECTIONS.filter((x) => x.children.length).map((x) => (
          <nav key={x.key} className="ft-group" aria-label={x.long}>
            <h2><a href={x.href}>{x.long}</a></h2>
            <ul>{x.children.map((c) => <li key={c.key}><a href={c.href}>{c.title}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="ft-bottom">
        <p>Homepage design concept. Photographs, drawings and quoted words belong to the Castleshaw Centre and the people who sent them. Illustrations and the homepage film were made with AI, from our own illustration and photographs.</p>
        <p className="ft-links"><a href={NAV_SECTIONS.find((x) => x.key === 'stay').href}>Stay and hire</a><a href={CONTACT}>Contact</a><a href={PRIVACY}>Privacy notice</a><a href={ROOT}>All versions</a></p>
      </div>
    </footer>
  )
}
