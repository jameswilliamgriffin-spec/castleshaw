// Educational visits advice and guidance: the landing page (the whole service on one page) and Training.
// Facts come from the centre's 2025 service leaflet and the client's answers;
// anything not yet confirmed is marked with <TBC>.
import { PageTop, Band, SectionHead, Ledger, Faq, CtaBand, Btn, TBC, img, gen, Breadcrumbs, SubNav, TopicCard } from '../ui/inner/blocks'
import ShapedImage from '../ui/shape/ShapedImage'
import { Squiggle, useReveal } from '../ui/Squiggle'
import LeadForm from '../ui/advice/LeadForm'
import { slot } from '../ui/inner/Slot'
import { Stepper, StickyQuote } from '../ui/advice/parts'
import { PROOF, STEPS, CHECKS, INCLUDED, FAQ, GUIDE } from '../content/advice.mjs'
import TRAINING from '../content/training.json'
import { ROOT, ridge } from '../lib'
import { track } from '../track'
import { useMemo } from 'react'
import '../advice-landing.css'
import { href, PHONE, PHONE_HREF, EMAIL, INCIDENT, INCIDENT_HREF } from '../data'

const av = (k = '') => href(`advice-and-guidance/${k}`)
const QUOTE = av() + '#quote'

const QuoteCta = ({ title = 'Join the service', text = 'Any school, college, academy or youth service can join. Prices depend on the size of your establishment.' }) => (
  <CtaBand title={title} text={text} primary={<Btn href={QUOTE} tone="moss">Contact us for a quote</Btn>} />
)


/* ------------------------------------------------------------------ training */
// Courses and upcoming dates come from Sanity (or content/training.local.json): see scripts/content.mjs.
const PLACES = { open: 'Places available', few: 'Few places left', full: 'Full' }
const today = () => new Date().toISOString().slice(0, 10)

export function Training({ path }) {
  // dates already past drop off, even before the site is next rebuilt
  const dates = TRAINING.dates.filter((d) => d.date >= today())
  return (
    <>
      <PageTop
        path={path}
        title="Training"
        lead="Courses for everyone involved in planning and running educational visits, at the Castleshaw Centre or at your school. Members get one free EVC place a year and subsidised places on other courses."
        image={{ src: img('advice-owc'), alt: 'A group of leaders walking together along a lane' }}
      />
      <Band id="dates">
        <SectionHead title="Upcoming dates and prices" />
        {dates.length ? (
          <div className="tdates-wrap">
            <table className="tdates">
              <thead><tr><th scope="col">Course</th><th scope="col">Date</th><th scope="col">Where</th><th scope="col">Members</th><th scope="col">Non-members</th><th scope="col">Places</th></tr></thead>
              <tbody>
                {dates.map((d) => (
                  <tr key={d.courseId + d.date} className={d.status === 'full' ? 'is-full' : undefined}>
                    <th scope="row"><a href={'#' + d.courseId}>{d.course}</a></th>
                    <td data-label="Date"><span>{d.when}{d.time && <><br /><small>{d.time}</small></>}</span></td>
                    <td data-label="Where">{d.venue || 'Castleshaw Centre'}</td>
                    <td data-label="Members">{d.priceMember || '–'}</td>
                    <td data-label="Non-members">{d.priceStandard || 'Members only'}</td>
                    <td data-label="Places"><span className={`tplaces tplaces-${d.status || 'open'}`}>{PLACES[d.status] || PLACES.open}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="tdates-none">New dates are on their way. To ask about the next course, or to arrange training at your school, get in touch.</p>
        )}
        <p>To book a place, call <a href={PHONE_HREF}>{PHONE.replace(/ /g, '\u00a0')}</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </Band>
      <Band tone="sky">
        <SectionHead title="Our courses" />
        <div className="courses">
          {TRAINING.courses.map((c) => (
            <TopicCard key={c.id} id={c.id} title={c.name} open={!!c.featured}>
              <dl className="meta">
                {c.length && <div><dt>Length</dt><dd>{c.length === 'To confirm' ? <TBC>Length</TBC> : c.length}</dd></div>}
                {c.who && <div><dt>For</dt><dd>{c.who}</dd></div>}
              </dl>
              <p>{c.text}</p>
            </TopicCard>
          ))}
        </div>
        <p className="tother">We also run British Canoeing, Duke of Edinburgh expedition and Countryside Leader training: see <a href={href('courses-and-clubs/outdoor-awards/')}>outdoor awards</a>.</p>
      </Band>
      <QuoteCta title="Training comes with the service" text="One free EVC place a year for every member establishment, and subsidised places on other courses." />
    </>
  )
}

/* ------------------------------------------------------------------ landing */
// "Signed off": the whole service on one page. Proof and who it's for, how sign-off works,
// what's included, the incident line, the advisers, questions, and the guide and quote form.
// The old sub-pages redirect to these sections (vercel.json).
const GUIDE_URL = () => `${ROOT}${GUIDE.href}`
const downloadGuide = (place) => () => track('Guide downloaded', { place })

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  return <Tag ref={ref} className={`al-rv ${className}`} {...rest}>{children}</Tag>
}

function Placeholder({ children }) {
  return <span className="tbc-tag al-ph">{children}</span>
}

// 44px touch targets for the phone links and email in the incident band and final panel.
const LAND_TAP = { display: 'inline-flex', alignItems: 'center', minHeight: '44px' }
const LAND_SQ = { position: 'relative' }

export function Landing({ path }) {
  const edge = useMemo(() => ridge(3.3, { h: 140, base: 0.55, amp: 0.2 }), [])
  return (
    <>
      <header className="al-hero">
        <div className="al-hero-in">
          <div className="al-hero-copy">
            <Breadcrumbs path={path} />
            <p className="al-eyebrow">Educational visits advice and guidance</p>
            <h1 className="al-h1">Safe visits, signed off by people who run them.</h1>
            <p className="al-lead">Planning a trip is a lot of work, and getting it right matters. Our advisers check your visit plans, sign them off, and stay on the end of the phone until everyone is home.</p>
            <div className="al-actions">
              <a className="al-btn" href="#quote" onClick={() => track('Quote button', { place: 'hero' })}>Get a quote</a>
              <a className="al-dl sq-host" href={GUIDE_URL()} download onClick={downloadGuide('hero')}>
                <span className="al-dl-t">Download the guide<Squiggle i={1} /></span><small>PDF</small>
              </a>
            </div>
            <p className="al-sos"><span className="al-dot" aria-hidden="true" />Members&rsquo; 24/7 critical incident line <a href={INCIDENT_HREF} onClick={() => track('Phone tapped', { place: 'hero-incident' })}>{INCIDENT}</a></p>
          </div>
          <ShapedImage
            className="al-hero-img" picture={slot('advice-landing-hero')}
            shape="blob-9" backdrop="offset" accent="lime" offset="bl" aspect="4/4.5" priority shadow
          />
        </div>
        <svg className="ph-ridge" viewBox="0 0 1600 140" preserveAspectRatio="none" aria-hidden="true"><path d={edge} /></svg>
      </header>
      <SubNav path={path} />

      {/* proof, and who it's for */}
      <Band id="who">
        <Reveal><Ledger items={PROOF} /></Reveal>
        <Reveal as="p" className="al-for">
          <strong>For any school, college, academy or youth service, in Oldham or beyond.</strong> Maintained schools, academies and trusts, colleges, youth services and community groups can all join. <TBC>Whether Oldham maintained schools receive the service as part of the Council&rsquo;s duty as employer</TBC>
        </Reveal>
      </Band>

      {/* how it works */}
      <Band tone="sky" id="how-it-works">
        <Reveal className="al-head">
          <p className="al-kicker">How it works</p>
          <h2 className="h2i">Four sets of hands. Ours are the last.</h2>
          <p className="al-sub">Every visit is planned on Evolve, the online system schools use to plan, check and approve trips, so everyone in the chain sees the same plan.</p>
        </Reveal>
        <Reveal><Stepper steps={STEPS} /></Reveal>
        <Reveal className="al-checks-row" id="what-we-check">
          <h3>What we look at: the whole visit, not just the risk assessment</h3>
          <dl className="al-check-list">
            {CHECKS.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
          <p>If a visit isn&rsquo;t ready yet, we send it back with clear advice on what to change and why. Most visits are approved once those changes are made.</p>
        </Reveal>
      </Band>

      {/* what's included */}
      <Band tone="paper" id="included">
        <Reveal className="al-head">
          <p className="al-kicker">What&rsquo;s included</p>
          <h2 className="h2i">One annual agreement</h2>
          <p className="al-sub">Prices depend on the size and type of your establishment. <a href="#quote">Contact us for a quote</a>.</p>
        </Reveal>
        <Reveal className="al-inc">
          {INCLUDED.map(([g, items], i) => (
            <div key={g} className="al-inc-col" style={{ '--k': i }}>
              <h3>{g}</h3>
              <ul>{items.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </Reveal>
        <p className="al-more"><TBC>Packages and price bands, and when the agreement year runs</TBC> <a href={av('training/')}>Training courses and dates</a></p>
      </Band>

      {/* emergency */}
      <section className="al-sos-band" id="emergency" aria-labelledby="sos-h">
        <img className="al-sos-bg" src={gen('moor-dusk')} alt="" width="1600" height="900" loading="lazy" />
        <Reveal className="al-sos-in">
          <p className="al-kicker al-kicker-light">Emergency support</p>
          <h2 id="sos-h">If something goes wrong on a visit, call us. Day or night.</h2>
          <a className="al-sos-num" style={LAND_TAP} href={INCIDENT_HREF} onClick={() => track('Phone tapped', { place: 'incident-band' })}>{INCIDENT}</a>
          <p>An experienced adviser helps you manage the incident, contact families and deal with the media. For everyday advice in school hours, call <a href={PHONE_HREF}>{PHONE}</a>.</p>
          <p><TBC>Whether the line is staffed all year, or in term time only</TBC></p>
        </Reveal>
      </section>

      {/* advisers */}
      <Band id="advisers">
        <Reveal className="al-head">
          <p className="al-kicker">Your advisers</p>
          <h2 className="h2i">Advisers who still do the job</h2>
          <p className="al-sub">Our advisers aren&rsquo;t desk-based. They still lead groups outdoors every week, so their advice comes from doing the job as well as knowing the guidance.</p>
        </Reveal>
        <Reveal className="al-people">
          <article className="al-person">
            <ShapedImage className="al-person-img" src={`${ROOT}shared/images/team/rod-steele.jpg`} alt="Rod Steele, smiling, holding a canoe paddle on a river" shape="blob-6" aspect="4/5" width={800} height={1000} pos="50% 30%" />
            <div><h3>Rod Steele</h3><p className="al-role">Senior tutor and adviser</p>
              <ul><li>Institute for Outdoor Learning accredited practitioner</li><li>IOSH</li><li>Level 4 canoe and kayak coach</li><li>Mountain bike leader</li><li>Outdoor Education Advisers&rsquo; Panel member</li></ul></div>
          </article>
          <article className="al-person">
            <ShapedImage className="al-person-img" src={`${ROOT}shared/images/team/joseph-myhill.jpg`} alt="Joseph Myhill, smiling, in a red jacket and woolly hat outdoors" shape="blob-3" aspect="4/5" width={800} height={1000} pos="50% 30%" />
            <div><h3>Joseph Myhill</h3><p className="al-role">Centre manager and adviser</p>
              <ul><li>Duke of Edinburgh&rsquo;s Award assessor and supervisor</li><li>Former DofE manager</li><li>Paddlesport leader</li><li>Outdoor Education Advisers&rsquo; Panel member</li></ul></div>
          </article>
          <figure className="al-inspect">
            <blockquote>&ldquo;Extraordinary.&rdquo;</blockquote>
            <figcaption>How a Council for Learning Outside the Classroom inspector described our practice on our most recent inspection.</figcaption>
            <p className="al-inspect-meta">40+ years of combined adviser experience. LOtC Quality Badge 101040. AALA licensed, licence <TBC>number</TBC>.</p>
          </figure>
        </Reveal>
      </Band>

      {/* questions */}
      <Band id="questions" narrow>
        <Reveal className="al-head">
          <p className="al-kicker">Questions</p>
          <h2 className="h2i">What schools usually ask</h2>
        </Reveal>
        <Faq items={FAQ} />
        <p className="al-more">National guidance: <a href="https://oeapng.info/" rel="noopener">OEAP National Guidance</a>, <a href="https://www.hse.gov.uk/education/school-trips.htm" rel="noopener">HSE on school trips</a>, <a href="https://www.hse.gov.uk/aala/" rel="noopener">Adventure Activities Licensing</a> and the <a href="https://www.lotcqualitybadge.org.uk/" rel="noopener">LOtC Quality Badge</a>.</p>
      </Band>

      {/* guide + quote */}
      <section className="al-final" id="quote" aria-labelledby="lf-h">
        <div className="al-final-strip"><img src={gen('stream-stones')} alt="" width="1600" height="687" loading="lazy" /></div>
        <div className="al-final-in">
          <div className="al-guide">
            <p className="al-kicker">Free guide</p>
            <h2 className="h2i">{GUIDE.title}</h2>
            <p className="al-sub">{GUIDE.sub}: how sign-off works, which visits need approval, what we check, a printable pre-submission checklist, and what to do if something goes wrong.</p>
            <a className="al-guide-card" href={GUIDE_URL()} download onClick={downloadGuide('final')}>
              <img src={`${ROOT}shared/docs/guide-cover.jpg`} alt="" width="420" height="594" loading="lazy" />
              <span><strong>Download the guide</strong><small>PDF, 10 pages, 1.3 MB. No sign-up needed.</small></span>
            </a>
            <div className="al-talk">
              <p>Rather talk it through?</p>
              <a className="al-talk-tel" style={LAND_TAP} href={PHONE_HREF} onClick={() => track('Phone tapped', { place: 'final' })}>{PHONE}</a>
              <a className="sq-host al-talk-mail" style={LAND_TAP} href={`mailto:${EMAIL}`} onClick={() => track('Email tapped', { place: 'final' })}><span style={LAND_SQ}>{EMAIL}<Squiggle i={2} /></span></a>
            </div>
          </div>
          <LeadForm source="advice-landing" />
        </div>
      </section>
      <StickyQuote phone={PHONE} phoneHref={PHONE_HREF} />
    </>
  )
}
