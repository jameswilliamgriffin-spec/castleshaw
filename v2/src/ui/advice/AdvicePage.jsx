import { useCallback, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cursor, Header, Menu } from '../Top'
import { Footer } from '../Contact'
import Button from '../Button'
import { reduced, ROOT } from '../../lib'
import { PHONE, PHONE_HREF, href } from '../../data'
import { SubNav, LinkList, TBC } from '../inner/blocks'

const IMG = `${ROOT}shared/images/`
const EMAIL = 'castleshaw.centre@oldham.gov.uk'
const INCIDENT = '0161 633 1803'
const INCIDENT_HREF = 'tel:+441616331803'
const TRAINING_DATES = href('advice-and-guidance/training/')

// The four checks every visit passes through, in order.
const STEPS = [
  { who: 'Visit leader', what: 'Plans the visit on Evolve', body: 'The itinerary, risk management, staffing, transport and any activity providers, all in one place.' },
  { who: 'EVC', what: 'Checks the plan', body: 'Your Educational Visits Coordinator, a senior member of staff, reviews it first.' },
  { who: 'Head teacher', what: 'Approves it for your school', body: 'Or the head of your service, for youth and community settings.' },
  { who: 'Castleshaw adviser', what: 'Signs it off', body: 'We review the whole visit against Oldham Council policy, OEAP national guidance and legislation, usually within 10 working days.' },
]

const CHECKS = [
  ['Planning', 'Clear aims, a realistic itinerary, and a plan B for the weather.'],
  ['Risk management', 'The significant risks spotted, and sensibly managed rather than buried in paperwork.'],
  ['Arrangements', 'Transport, accommodation, providers, consent, medical needs and what happens in an emergency.'],
  ['Staffing', 'Enough adults, with the right experience and qualifications for the group and the activities.'],
]

const INCLUDED = [
  ['Advice and approval', ['Ongoing advice on any educational visit', 'Visit forms reviewed within 10 working days', 'Approval of adventurous activities, residentials and overseas visits', `An advice line during school hours: ${PHONE}`, 'In-person support for complex visits']],
  ['Evolve', ['Use of the Evolve visit management system', 'Support and training for every user', 'Help linking your MIS to Evolve (Evolve+)']],
  ['Policy and updates', ['Guidance, policies and template documents', 'Updates on local policy, national guidance and legislation', 'Representation at national and regional meetings']],
  ['Training', ['One free EVC course place a year, per establishment', 'Subsidised visit leader and extra EVC training', 'Sessions for head teachers and governors', 'Access to MoVE training']],
]

const TRAINING = [
  ['Educational Visits Coordinator (EVC)', 'One day', 'For new EVCs and the staff who support them, in line with DfE guidance. One free place a year comes with the service.'],
  ['Visit Leader training', 'Three hours, or two twilight sessions', 'For staff leading and supporting visits, following the OEAP framework.'],
  ['Management of Visit Emergencies (MoVE)', <TBC key="l">Length</TBC>, 'For senior leaders who would run the response if something goes wrong on a visit.'],
  ['First Aid for group leaders (ITC)', 'Two days', 'HSE-approved. Meets most national governing body requirements.'],
  ['Minibus Driver Awareness (MiDAS)', 'Three hours', 'Theory course, at Castleshaw or at your school.'],
]

function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return
    const lenis = new Lenis({ lerp: 0.1 })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(raf); gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy(); window.__lenis = null }
  }, [])
}

/* ---------------- the signature moment: a visit form travelling through four checks ---------------- */
function VisitForm({ stage, signed }) {
  return (
    <div className={`vf${signed ? ' vf-signed' : ''}`} aria-hidden="true">
      <div className="vf-head">
        <span className="vf-tag">Example visit</span>
        <strong>Year 6 residential</strong>
        <span>Three nights, Lake District</span>
      </div>
      <dl className="vf-fields">
        <div><dt>Group</dt><dd>28 pupils, 4 staff</dd></div>
        <div><dt>Activities</dt><dd>Canoeing, ghyll scrambling</dd></div>
        <div><dt>Transport</dt><dd>Coach, hired</dd></div>
        <div><dt>Provider</dt><dd>LOtC Quality Badge holder</dd></div>
      </dl>
      <ol className="vf-sign">
        {STEPS.map((s, i) => (
          <li key={s.who} className={i < stage ? 'done' : i === stage ? 'now' : ''}>
            <span className="vf-who">{s.who}</span>
            <span className="vf-line">
              {i < 3 ? (
                <svg viewBox="0 0 24 24" className="vf-tick"><path d="M4 12.5l5 5L20 6.5" /></svg>
              ) : (
                <svg viewBox="0 0 220 60" className="vf-sig"><path d="M6 40 C 18 8, 30 8, 28 34 S 40 56, 52 30 C 58 18, 66 18, 64 34 C 62 46, 74 46, 82 28 C 88 16, 96 20, 94 34 C 93 42, 104 44, 112 30 L 120 22 C 126 40, 136 44, 146 26 C 152 16, 160 22, 158 32 C 156 42, 172 40, 186 28 C 194 22, 204 24, 214 20" /></svg>
              )}
            </span>
            <span className="vf-state">{i < stage ? (i === 3 ? 'Signed off' : 'Checked') : i === stage ? 'With them now' : 'Waiting'}</span>
          </li>
        ))}
      </ol>
      <div className="vf-stamp"><span>Approved</span><small>Castleshaw advisers</small></div>
    </div>
  )
}

function Chain() {
  const root = useRef(null)
  const [stage, setStage] = useState(0)
  const [signed, setSigned] = useState(false)
  useEffect(() => {
    const el = root.current
    if (reduced()) { setStage(4); setSigned(true); return }
    const st = ScrollTrigger.create({
      trigger: el, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress
        const s = Math.min(4, Math.floor(p * 5.2))
        setStage(s)
        setSigned(p > 0.86)
        el.style.setProperty('--sig', Math.min(1, Math.max(0, (p - 0.66) / 0.2)).toFixed(3))
      },
    })
    return () => st.kill()
  }, [])
  return (
    <section className="av-chain" id="how-it-works" ref={root} aria-labelledby="chain-h">
      <div className="av-chain-stick">
        <div className="av-chain-copy">
          <h2 id="chain-h" className="av-h2">Checked at every stage. Signed off by us.</h2>
          <p className="av-chain-lead">Every visit is checked by three or four people before it goes ahead. Our advisers make the final check.</p>
          <ol className="av-steps">
            {STEPS.map((s, i) => (
              <li key={s.who} className={i < stage ? 'done' : i === stage ? 'now' : ''}>
                <span className="av-step-n" aria-hidden="true">{i + 1}</span>
                <div><strong>{s.who}: {s.what.toLowerCase()}</strong><p>{s.body}</p></div>
              </li>
            ))}
          </ol>
          <a className={`av-chain-cta${signed ? ' on' : ''}`} href="#quote">Arrange this for your school</a>
        </div>
        <VisitForm stage={stage} signed={signed} />
      </div>
    </section>
  )
}

/* ---------------- small reveal helper: answers the reader arriving, once ---------------- */
function useReveal(sel) {
  useEffect(() => {
    const els = [...document.querySelectorAll(sel)]
    if (reduced()) { els.forEach((e) => e.classList.add('in')); return }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: 0.35 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [sel])
}

export default function AdvicePage() {
  const [menu, setMenu] = useState(false)
  const [sent, setSent] = useState(false)
  const close = useCallback(() => setMenu(false), [])
  useSmoothScroll()
  useReveal('.av-check, .av-note')

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Cursor />
      <Header open={menu} setOpen={setMenu} count={0} />
      <Menu open={menu} close={close} />
      <main id="main" className="av">
        {/* hero */}
        <section className="av-hero" aria-labelledby="av-h1">
          <div className="av-hero-copy">
            <p className="av-crumb"><a href="../">Castleshaw Centre</a> <span aria-hidden="true">/</span> Educational visits advice and guidance</p>
            <h1 id="av-h1" className="av-h1">Safe visits, signed off by people who run them.</h1>
            <p className="av-lead">Planning a trip is a lot of work, and getting it right matters. Our advisers check your visit plans, sign them off, and stay on the end of the phone until everyone is home.</p>
            <p>One annual agreement covers visit approval through Evolve, expert advice, training and a 24/7 critical incident line. It&rsquo;s run by Oldham Council&rsquo;s advisers at the Castleshaw Centre in Delph, and any school, college, academy or youth service can join.</p>
            <div className="av-cta">
              <Button to="quote" tone="ink" size="l">Contact us for a quote</Button>
              <a className="av-link" href="#how-it-works">How it works</a>
            </div>
          </div>
          <div className="av-hero-art">
            <figure className="av-arch av-arch-a"><img src={`${IMG}land-ghyll.jpg`} alt="Young people in helmets scrambling up a moorland stream with an instructor nearby" width="600" height="800" /></figure>
            <figure className="av-arch av-arch-b"><img src={`${IMG}water-consent.jpg`} alt="A young kayaker in a buoyancy aid and helmet wading out of a reservoir" width="600" height="800" /></figure>
            <a className="av-sos" href={INCIDENT_HREF}><span className="av-pulse" aria-hidden="true" /><span><small>24/7 critical incident line</small>{INCIDENT}</span></a>
          </div>
        </section>

        {/* facts */}
        <section className="av-facts" aria-label="The service at a glance">
          <dl>
            <div><dt>20+ years</dt><dd>supporting visits in Oldham and beyond</dd></div>
            <div><dt>10 days</dt><dd>to review a visit, usually less</dd></div>
            <div><dt>24/7</dt><dd>critical incident line for visits</dd></div>
            <div><dt>1 free</dt><dd>EVC training place a year, per school</dd></div>
          </dl>
        </section>

        <div className="inner av-subnav"><SubNav path="advice-and-guidance/" /></div>

        <Chain />

        {/* what we look at */}
        <section className="av-look" aria-labelledby="look-h">
          <div className="av-look-head">
            <h2 id="look-h" className="av-h2">What we look at</h2>
            <p>We review the whole visit, not just the risk assessment. The question is simple: has this been organised safely and sensibly, in line with national guidance?</p>
          </div>
          <ul className="av-checks">
            {CHECKS.map(([t, d]) => (
              <li className="av-check" key={t}>
                <svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" /><path d="M11 21l6 6 12-14" /></svg>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* not ready yet */}
        <section className="av-return" aria-labelledby="ret-h">
          <div className="av-return-copy">
            <h2 id="ret-h" className="av-h2">If a visit isn&rsquo;t ready yet</h2>
            <p>We don&rsquo;t just say no. If something needs to change, we send the plan back with clear advice on what to change and why, and we&rsquo;re happy to talk it through on the phone.</p>
            <p>Most visits are approved once those changes are made. The aim is a visit that goes ahead, safely.</p>
          </div>
          <div className="av-paper" aria-hidden="true">
            <p className="av-paper-row"><span>Staffing</span> 1 adult to 14 pupils on the water</p>
            <p className="av-note av-note-1">Ratio is set by the provider for paddling. Please add their numbers and qualifications.</p>
            <p className="av-paper-row"><span>Weather</span> No alternative listed</p>
            <p className="av-note av-note-2">What happens if the lake is too windy? A low-level walk would do.</p>
            <p className="av-paper-row"><span>Medical</span> Two pupils with inhalers</p>
            <p className="av-note av-note-3">Good. Note who carries the spares.</p>
          </div>
        </section>

        {/* included */}
        <section className="av-inc" aria-labelledby="inc-h">
          <div className="av-inc-head">
            <h2 id="inc-h" className="av-h2">What&rsquo;s included</h2>
            <p>One annual Service Level Agreement covers all of this. Prices depend on the size of your establishment, so <a href="#quote">contact us for a quote</a>.</p>
          </div>
          <ul className="av-benefits">
            <li>Less paperwork worry</li>
            <li>Clear advice when plans need to change</li>
            <li>Support the moment something goes wrong</li>
          </ul>
          <div className="av-inc-grid">
            {INCLUDED.map(([g, items]) => (
              <div key={g} className="av-inc-col">
                <h3>{g}</h3>
                <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <figure className="av-quote">
            <span className="av-ph">Placeholder quote</span>
            <blockquote>We used to dread the paperwork for our Year 6 residential. Now it goes through Evolve, Castleshaw check it, and if something needs changing they tell us exactly what and why.</blockquote>
            <figcaption>Visits coordinator, primary school</figcaption>
          </figure>
          <div className="av-inc-cta"><Button to="quote" tone="ink">Contact us for a quote</Button></div>
        </section>

        {/* emergency */}
        <section className="av-sosband" aria-labelledby="sos-h">
          <div className="av-sos-inner">
            <p className="av-sos-label">24/7 critical incident support, part of the service</p>
            <h2 id="sos-h">If something goes wrong on a visit, call us. Day or night.</h2>
            <a className="av-sos-num" href={INCIDENT_HREF}><span className="av-pulse" aria-hidden="true" />{INCIDENT}</a>
            <p>Our 24/7 critical incident line supports you with managing the incident, contacting families and dealing with the media. For everyday advice in school hours, call <a href={PHONE_HREF}>{PHONE}</a>.</p>
            <p><TBC>Whether the line is staffed all year or in term time only</TBC> <a href={href('advice-and-guidance/emergency-support/')}>More about emergency support</a></p>
          </div>
        </section>

        {/* advisers */}
        <section className="av-people" aria-labelledby="ppl-h">
          <div className="av-people-head">
            <h2 id="ppl-h" className="av-h2">Advisers who still do the job</h2>
            <p>Our advisers are not desk-based. They still lead groups outdoors every week, so their advice comes from doing the job as well as knowing the guidance.</p>
          </div>
          <div className="av-people-grid">
            <article className="av-person">
              <figure><img src={`${IMG}team/rod-steele.jpg`} alt="Rod Steele, smiling, holding a canoe paddle on a river" loading="lazy" /></figure>
              <h3>Rod Steele</h3>
              <p className="av-role">Senior tutor and adviser</p>
              <ul><li>Institute of Outdoor Learning accredited practitioner</li><li>IOSH</li><li>Level 4 canoe and kayak coach</li><li>Mountain bike leader</li><li>Outdoor Education Advisers&rsquo; Panel member</li></ul>
            </article>
            <article className="av-person">
              <figure><img src={`${IMG}team/joseph-myhill.jpg`} alt="Joseph Myhill, smiling, in a red jacket and woolly hat outdoors" loading="lazy" /></figure>
              <h3>Joseph Myhill</h3>
              <p className="av-role">Centre manager and adviser</p>
              <ul><li>Duke of Edinburgh&rsquo;s Award assessor and supervisor</li><li>Former DofE manager</li><li>Paddlesport leader</li><li>Outdoor Education Advisers&rsquo; Panel member</li></ul>
            </article>
            <figure className="av-inspect">
              <blockquote>&ldquo;Extraordinary.&rdquo;</blockquote>
              <figcaption>How a Council for Learning Outside the Classroom inspector described our practice on our most recent inspection.</figcaption>
            </figure>
          </div>
        </section>

        {/* training */}
        <section className="av-train" aria-labelledby="tr-h">
          <div className="av-train-head">
            <h2 id="tr-h" className="av-h2">Training</h2>
            <p>At the Castleshaw Centre, or at your school for groups.</p>
            <a className="av-link" href={TRAINING_DATES}>See course dates</a>
          </div>
          <ul className="av-train-list">
            {TRAINING.map(([t, len, d]) => (
              <li key={t}><h3>{t}</h3><span className="av-len">{len}</span><p>{d}</p></li>
            ))}
          </ul>
        </section>

        {/* the rest of the section */}
        <section className="inner av-more" aria-labelledby="more-h">
          <h2 id="more-h" className="av-h2">More about the service</h2>
          <LinkList items={[
            { title: 'How it works', href: href('advice-and-guidance/how-it-works/'), text: 'From plan to sign-off on Evolve, and which visits come to us' },
            { title: 'The service agreement', href: href('advice-and-guidance/service-agreement/'), text: 'Everything included, packages and the formal document' },
            { title: 'Who it\u2019s for', href: href('advice-and-guidance/who-its-for/'), text: 'Maintained schools, academies, trusts, colleges and youth services' },
            { title: 'Training', href: href('advice-and-guidance/training/'), text: 'EVC, Visit Leader, MoVE, first aid and MiDAS' },
            { title: 'Emergency support', href: href('advice-and-guidance/emergency-support/'), text: 'What happens when you call the critical incident line' },
            { title: 'Guidance and resources', href: href('advice-and-guidance/guidance-and-resources/'), text: 'National guidance, policies and templates' },
            { title: 'Our advisers', href: href('advice-and-guidance/our-advisers/'), text: 'Rod Steele and Joseph Myhill' },
            { title: 'Questions', href: href('advice-and-guidance/questions/'), text: 'What schools and business managers ask us' },
          ]} />
        </section>

        {/* why + join */}
        <section className="av-join" id="quote" aria-labelledby="join-h">
          <div className="av-join-why">
            <h2 id="join-h" className="av-h2">Join the service</h2>
            <p className="av-lead">Any school, college, academy or youth service can join. Tell us a little about your setting and we will send you a quote.</p>
            <ul className="av-why">
              <li><strong>Established.</strong> Running for more than 20 years.</li>
              <li><strong>Local.</strong> Close enough to come to you in person.</li>
              <li><strong>Practising.</strong> Our advisers still lead visits every week.</li>
              <li><strong>Inspected.</strong> LOtC Quality Badge 101040. Licensed by AALA (HSE), licence <TBC>AALA licence number</TBC>.</li>
              <li><strong>Rated outstanding.</strong> By most schools in our annual survey.</li>
            </ul>
            <figure className="av-quote av-quote-sm">
              <span className="av-ph">Placeholder quote</span>
              <blockquote>Having an adviser who has actually led groups up a ghyll makes all the difference. They know what good looks like.</blockquote>
              <figcaption>EVC, secondary school</figcaption>
            </figure>
          </div>
          <div className="av-form-card">
            {sent ? (
              <div className="av-sent" role="status">
                <h3>Thanks. Your request is ready.</h3>
                <p>This is a design concept, so nothing was sent. To ask for a quote today, call <a href={PHONE_HREF}>{PHONE}</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
                <button type="button" className="txt" onClick={() => setSent(false)}>Back to the form</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <h3>Contact us for a quote</h3>
                <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
                <label><span>School, college or service</span><input name="org" autoComplete="organization" required /></label>
                <div className="av-two">
                  <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
                  <label><span>Phone (optional)</span><input name="tel" type="tel" autoComplete="tel" /></label>
                </div>
                <label><span>Roughly how many visits a year? (optional)</span>
                  <select name="visits" defaultValue=""><option value="" disabled>Choose one</option><option>Fewer than 10</option><option>10 to 30</option><option>More than 30</option><option>Not sure yet</option></select>
                </label>
                <label><span>Anything we should know? (optional)</span><textarea name="msg" rows="3" placeholder="For example, overseas visits, a new EVC, or moving to Evolve." /></label>
                <button type="submit" className="ct-send">Request a quote</button>
                <p className="av-next">One of our advisers will get back to you by email or phone to talk through your setting and send a quote.</p>
                <p className="av-or">Or call <a href={PHONE_HREF}>{PHONE}</a>, or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
