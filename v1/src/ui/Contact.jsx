import { useMemo, useState } from 'react'
import { PHONE, PHONE_HREF, FACEBOOK, NAV_ALL } from '../data'
import { ridge } from '../lib'
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
      <img src="../shared/images/logo.jpg" alt="Castleshaw Centre" width="200" height="129" />
      <p className="ft-who">Oldham&rsquo;s Outdoor and Environmental Education service. Licensed by AALA (L71687) for climbing, watersports and trekking, and holder of the LOtC Quality Badge (101040).</p>
      <ul className="ft-nav">{NAV_ALL.slice(1).map(([t, h]) => <li key={t}><a href={h}>{t}</a></li>)}</ul>
      <p className="ft-note">Homepage design concept. Photographs, drawings and quoted words belong to the Castleshaw Centre and the people who sent them.</p>
    </footer>
  )
}
