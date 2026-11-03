import { useRef, useState } from 'react'
import { PHONE, PHONE_HREF, EMAIL, PRIVACY } from '../../data'
import { track } from '../../track'

// The enquiry and quote form. Posts to VITE_ENQUIRY_ENDPOINT (see api/enquiry.js) when
// one is configured; until then it runs as a preview and sends nothing.
const ENDPOINT = import.meta.env.VITE_ENQUIRY_ENDPOINT
const ROLES = ['Educational Visits Coordinator (EVC)', 'Head teacher or principal', 'Business manager', 'Visit leader', 'Governor or trustee', 'Youth or community worker', 'Something else']
const TYPES = ['A quote for the service', 'Training', 'A question about a visit', 'Something else']

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

export default function LeadForm({ source = 'advice-landing', defaultType = TYPES[0] }) {
  const started = useRef(Date.now())
  const summary = useRef(null)
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [errors, setErrors] = useState({})

  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const data = Object.fromEntries(f.entries())
    const errs = {}
    if (!data.name?.trim()) errs.name = 'Enter your name'
    if (!data.org?.trim()) errs.org = 'Enter your school, college or organisation'
    if (!data.email?.trim()) errs.email = 'Enter your email address'
    else if (!isEmail(data.email.trim())) errs.email = 'Enter an email address like name@school.org.uk'
    setErrors(errs)
    if (Object.keys(errs).length) { requestAnimationFrame(() => summary.current?.focus()); return }

    // Spam: a filled honeypot or a form sent within three seconds is quietly dropped.
    const bot = data.website || Date.now() - started.current < 3000
    setState('sending')
    try {
      if (ENDPOINT && !bot) {
        const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, source, elapsed: Date.now() - started.current }) })
        if (!res.ok) throw new Error(String(res.status))
      } else {
        await new Promise((r) => setTimeout(r, 700))
      }
      setState('sent')
      if (!bot) track('Enquiry sent', { type: data.type, role: data.role, guide: data.guide ? 'yes' : 'no', source })
    } catch {
      setState('error')
      track('Enquiry failed', { source })
    }
  }

  if (state === 'sent') {
    return (
      <div className="lf lf-done" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
        <h3>Thank you. We&rsquo;ve got your enquiry.</h3>
        <p>One of our advisers will reply by email or phone, usually within two working days.</p>
        {!ENDPOINT && <p className="lf-preview">This site is a preview, so nothing was actually sent. To get in touch today, call <a href={PHONE_HREF}>{PHONE}</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>}
        <button type="button" className="lf-again" onClick={() => { setState('idle'); started.current = Date.now() }}>Send another enquiry</button>
      </div>
    )
  }

  const field = (name, label, input, hint) => (
    <div className={`lf-field${errors[name] ? ' lf-bad' : ''}`}>
      <label htmlFor={`lf-${name}`}>{label}</label>
      {hint && <span className="lf-hint" id={`lf-${name}-hint`}>{hint}</span>}
      {errors[name] && <span className="lf-err" id={`lf-${name}-err`}>{errors[name]}</span>}
      {input}
    </div>
  )
  const described = (name, hint) => [hint && `lf-${name}-hint`, errors[name] && `lf-${name}-err`].filter(Boolean).join(' ') || undefined

  return (
    <form className="lf" onSubmit={submit} noValidate aria-labelledby="lf-h">
      <h3 id="lf-h">Get a quote, or ask us anything</h3>
      <p className="lf-intro">Tell us a little about your setting. It takes a minute, and there&rsquo;s no obligation.</p>
      {Object.keys(errors).length > 0 && (
        <div className="lf-summary" role="alert" tabIndex={-1} ref={summary}>
          <strong>Please check the form</strong>
          <ul>{Object.entries(errors).map(([k, v]) => <li key={k}><a href={`#lf-${k}`}>{v}</a></li>)}</ul>
        </div>
      )}
      <div className="lf-grid">
        {field('name', 'Your name', <input enterKeyHint="next" id="lf-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={described('name')} />)}
        {field('org', 'School, college or organisation', <input enterKeyHint="next" id="lf-org" name="org" autoComplete="organization" aria-invalid={!!errors.org} aria-describedby={described('org')} />)}
        {field('role', 'Your role', <select id="lf-role" name="role" defaultValue={ROLES[0]}>{ROLES.map((r) => <option key={r}>{r}</option>)}</select>)}
        {field('email', 'Email', <input enterKeyHint="next" id="lf-email" name="email" type="email" autoComplete="email" inputMode="email" aria-invalid={!!errors.email} aria-describedby={described('email')} />)}
        {field('phone', <>Phone <em>(optional)</em></>, <input enterKeyHint="next" id="lf-phone" name="phone" type="tel" autoComplete="tel" />)}
        {field('type', 'What can we help with?', <select id="lf-type" name="type" defaultValue={defaultType}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>)}
        <div className="lf-field lf-wide">
          <label htmlFor="lf-msg">Anything we should know? <em>(optional)</em></label>
          <textarea id="lf-msg" name="message" rows="4" placeholder="For example, the number of pupils, overseas visits, a new EVC, or moving to Evolve." />
        </div>
      </div>
      {/* Hidden from people; bots tend to fill it in. */}
      <div className="lf-trap" aria-hidden="true"><label htmlFor="lf-website">Website</label><input id="lf-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="lf-check"><input type="checkbox" name="guide" value="yes" /> <span>Email me a copy of the guide, <em>Planning safe educational visits</em></span></label>
      <p className="lf-privacy">Oldham Council will use your details only to reply to this enquiry and, if you join, to provide the service. Read our <a href={PRIVACY}>privacy notice</a>.</p>
      {state === 'error' && (
        <p className="lf-fail" role="alert">Sorry, your enquiry didn&rsquo;t send. Please try again, or call <a href={PHONE_HREF}>{PHONE}</a>.</p>
      )}
      <button type="submit" className="lf-send" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
    </form>
  )
}
