import { useMemo, useState } from 'react'
import { PHONE, PHONE_HREF, FACEBOOK, NAV_GROUPS, navHref } from '../data'
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
      <div className="ft-top">
        <div className="ft-id">
          <span className="ft-logo"><img src="../shared/images/logo.jpg" alt="Castleshaw Centre" width="200" height="129" /></span>
          <p>Oldham&rsquo;s Outdoor and Environmental Education service, at the edge of the Peak District National Park.</p>
          <p className="ft-cred">AALA licence L71687 for climbing, watersports and trekking. LOtC Quality Badge 101040.</p>
        </div>
        <div className="ft-contact">
          <h2>Get in touch</h2>
          <a className="ft-tel" href={PHONE_HREF}>{PHONE}</a>
          <address>Waterworks Road<br />Delph, Oldham<br />OL3 5LZ</address>
          <a href={FACEBOOK} rel="noopener">Facebook</a>
        </div>
        {NAV_GROUPS.map(([g, items]) => (
          <nav key={g} className="ft-group" aria-label={g}>
            <h2>{g}</h2>
            <ul>{items.map((t) => <li key={t}><a href={navHref(t)}>{t}</a></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="ft-bottom">
        <p>Homepage design concept. Photographs, drawings and quoted words belong to the Castleshaw Centre and the people who sent them. The film was made with AI video from our own illustration and photographs.</p>
        <p className="ft-links"><a href={navHref('Privacy Notice')}>Privacy notice</a><a href="../">All versions</a></p>
      </div>
    </footer>
  )
}
