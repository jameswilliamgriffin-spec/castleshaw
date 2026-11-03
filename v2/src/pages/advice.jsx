// Educational visits advice and guidance: the sub-pages behind the advice landing.
// Facts come from the centre's 2025 service leaflet and the client's answers;
// anything not yet confirmed is marked with <TBC>.
import { PageTop, Band, SectionHead, SqLink, Intro, Split, Ticks, Ledger, Steps, Faq, LinkList, People, Callout, CtaBand, Quote as Pull, Btn, TBC, img, gen, shared, Breadcrumbs, SubNav } from '../ui/inner/blocks'
import ShapedImage from '../ui/shape/ShapedImage'
import { Squiggle, useReveal } from '../ui/Squiggle'
import LeadForm from '../ui/advice/LeadForm'
import { AudienceTabs, Stepper, StickyQuote } from '../ui/advice/parts'
import { PROOF, STEPS, CHECKS, INCLUDED, AUDIENCES, FAQ, GUIDE } from '../content/advice.mjs'
import { ROOT, ridge } from '../lib'
import { track } from '../track'
import { useMemo } from 'react'
import '../advice-landing.css'
import { href, PHONE, PHONE_HREF, EMAIL, INCIDENT, INCIDENT_HREF } from '../data'

const av = (k = '') => href(`advice-and-guidance/${k}`)
const QUOTE = av('get-a-quote/')

const QuoteCta = ({ title = 'Join the service', text = 'Any school, college, academy or youth service can join. Prices depend on the size of your establishment.' }) => (
  <CtaBand title={title} text={text} primary={<Btn href={QUOTE} tone="moss">Contact us for a quote</Btn>} />
)

/* ------------------------------------------------------------------ how it works */
export function How({ path }) {
  return (
    <>
      <PageTop
        path={path}
        tone="sky"
        title="How it works"
        lead="Every visit is planned on Evolve and passes through four sets of hands before it goes ahead. Ours are the last."
        image={{ src: gen('compass-moss'), alt: 'A compass resting on wet moss and stones' }}
        actions={<Btn href={QUOTE}>Contact us for a quote</Btn>}
      />
      <Band>
        <Intro heading="From plan to sign-off">
          <p>Evolve is the online system schools use to plan, check and approve educational visits. It keeps the itinerary, risk management, staffing, consent and contacts in one place, so everyone in the chain sees the same plan.</p>
        </Intro>
        <Steps items={[
          { title: 'The visit leader plans the visit on Evolve', body: 'The itinerary, risk management, staffing, transport and any activity providers, all in one place.' },
          { title: 'Your EVC checks it', body: 'Your Educational Visits Coordinator, a senior member of staff, reviews the plan first.' },
          { title: 'Your head teacher approves it', body: 'Or the head of your service, for youth and community settings.' },
          { title: 'A Castleshaw adviser signs it off', body: 'We review the whole visit against Oldham Council policy, OEAP National Guidance and legislation, usually within 10 working days.' },
        ]} />
      </Band>

      <Band tone="sky">
        <Intro heading="Which visits come to us">
          <p>Not every trip needs an adviser&rsquo;s approval. Under the service we approve the visits that carry most risk:</p>
          <Ticks items={['Adventurous activities, such as climbing, watersports and trekking', 'Residential visits', 'Overseas visits']} />
          <p>Your EVC and head teacher approve lower-risk visits within your own setting, and we are on hand for advice on any of them.</p>
          <TBC block>Whether any other visit types need adviser approval, such as visits near water, and how far in advance visits should be submitted.</TBC>
        </Intro>
      </Band>

      <Band>
        <Intro heading="What we look at">
          <p>We review the whole visit, not just the risk assessment. The question is simple: has this been organised safely and sensibly, in line with national guidance?</p>
        </Intro>
        <div className="cols cols-2">
          <div className="icard"><h3>Planning</h3><p>Clear aims, a realistic itinerary, and a plan B for the weather.</p></div>
          <div className="icard"><h3>Risk management</h3><p>The significant risks spotted, and sensibly managed rather than buried in paperwork.</p></div>
          <div className="icard"><h3>Arrangements</h3><p>Transport, accommodation, providers, consent, medical needs and what happens in an emergency.</p></div>
          <div className="icard"><h3>Staffing</h3><p>Enough adults, with the right experience and qualifications for the group and the activities.</p></div>
        </div>
      </Band>

      <Band tone="sage">
        <Split image={{ src: img('advice-river-training'), alt: 'Leaders practising a river crossing with walking poles' }} heading="If a visit isn't ready yet">
          <p>We don&rsquo;t just say no. If something needs to change, we send the plan back with clear advice on what to change and why, and we&rsquo;re happy to talk it through on the phone.</p>
          <p>Most visits are approved once those changes are made. The aim is a visit that goes ahead, safely.</p>
        </Split>
      </Band>

      <Band>
        <SectionHead title="Using Evolve" />
        <div className="cols cols-2">
          <div className="icard">
            <h3>Already a member?</h3>
            <p>Log into Evolve to plan or submit a visit.</p>
            <p><TBC>Evolve login address for Oldham</TBC></p>
          </div>
          <div className="icard">
            <h3>New to Evolve?</h3>
            <p>We set up your establishment, train your users and help you link your MIS so pupil and staff details flow into Evolve (Evolve+).</p>
            <p><SqLink href={av('training/')}>Training</SqLink></p>
          </div>
        </div>
      </Band>
      <QuoteCta />
    </>
  )
}

/* ------------------------------------------------------------------ service agreement */
export function Agreement({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="The service agreement"
        lead="One annual Service Level Agreement covers advice, approval, Evolve, policy support, training and a 24/7 critical incident line."
        image={{ src: gen('hands-carabiner'), alt: 'Hands checking a locked carabiner on a climbing rope', pos: '55% 40%' }}
        actions={<Btn href={QUOTE}>Contact us for a quote</Btn>}
      />
      <Band>
        <SectionHead title="What&rsquo;s included" />
        <div className="cols cols-3">
          <div className="icard"><h3>Advice and approval</h3><Ticks items={['Ongoing advice on any educational visit', 'Visit forms reviewed within 10 working days', 'Approval of adventurous activities, residentials and overseas visits', `An advice line during school hours: ${PHONE}`, 'Visits to your school to help with planning and monitoring', 'In-person support for complex visits']} /></div>
          <div className="icard"><h3>Evolve</h3><Ticks items={['Use of the Evolve visit management system', 'Support and training for every user', 'Help linking your MIS to Evolve (Evolve+)']} /><p><TBC>Whether Evolve+ is included or an optional upgrade</TBC></p></div>
          <div className="icard"><h3>Policy and updates</h3><Ticks items={['Guidance, policies and template documents', 'Updates on local policy, national guidance and legislation', 'Representation at national and regional meetings']} /></div>
          <div className="icard"><h3>Training</h3><Ticks items={['One free EVC course place a year, per establishment', 'Subsidised visit leader and extra EVC training', 'Sessions for head teachers and governors', 'Access to MoVE training']} /><p><a href={av('training/')}>All training</a></p></div>
          <div className="icard"><h3>Emergency support</h3><Ticks items={[`A 24/7 critical incident line: ${INCIDENT}`, 'Help managing an incident, contacting families and dealing with the media']} /><p><a href={av('emergency-support/')}>Emergency support</a></p></div>
          <div className="icard"><h3>Peace of mind</h3><Ticks items={['Running for more than 20 years', 'Over 40 years of combined adviser experience', 'Rated outstanding by most schools in our annual survey']} /></div>
        </div>
      </Band>

      <Band tone="sky" id="packages">
        <Intro heading="Packages and prices">
          <p>Prices depend on the size and type of your establishment. Contact us and we will send you a quote.</p>
        </Intro>
        <TBC block>Packages and pricing: whether the agreement is priced per establishment, per pupil or in bands, whether trusts can buy for all their schools, and when the agreement year runs (April or September).</TBC>
        <div className="cols cols-3">
          {['Primary schools', 'Secondary schools and colleges', 'Trusts, youth and community services'].map((t) => (
            <div className="icard" key={t}><h3>{t}</h3><TBC block>What is included and the price band</TBC></div>
          ))}
        </div>
        <p><SqLink href={QUOTE}>Ask for a quote</SqLink></p>
      </Band>

      <Band>
        <Intro heading="The formal agreement">
          <p>Business managers can ask us for the full Service Level Agreement document, which sets out the service, the terms and the responsibilities on each side.</p>
          <p><TBC>A downloadable copy of the current agreement</TBC></p>
        </Intro>
      </Band>
      <QuoteCta />
    </>
  )
}

/* ------------------------------------------------------------------ who it's for */
export function Who({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Who it's for"
        lead="Any school, college, academy or youth service can join, in Oldham and beyond."
        image={{ src: gen('wellies-puddle'), alt: 'Wellington boots stepping into a muddy puddle on a farm track', pos: '50% 70%' }}
      />
      <Band>
        <Intro heading="Why it matters">
          <p>Employers are responsible for the health and safety of staff and young people on educational visits, under the Health and Safety at Work Act. National guidance from the Outdoor Education Advisers&rsquo; Panel (OEAP) recommends that employers have access to competent advice, and most use a specialist adviser to approve higher-risk visits.</p>
          <p>The service gives your setting that competent advice, and an independent check before a visit goes ahead.</p>
        </Intro>
      </Band>
      <Band tone="sky">
        <SectionHead title="Who can join" />
        <div className="cols cols-2">
          <div className="icard" id="oldham-schools"><h3>Oldham maintained schools</h3><p>Oldham Council is the employer for community and voluntary controlled schools.</p><TBC block>Whether Oldham maintained schools receive the service as part of the Council&rsquo;s duty as employer, or buy the agreement, and what is extra.</TBC></div>
          <div className="icard" id="academies"><h3>Academies and trusts</h3><p>Academies and multi-academy trusts are their own employers and can buy the service for one school or all of them, with one point of contact.</p><TBC block>Whether whole-trust agreements are offered</TBC></div>
          <div className="icard" id="colleges-youth"><h3>Colleges and youth services</h3><p>Colleges, youth services and community organisations running visits, residentials or adventurous activities can join, with sign-off by the head of the service instead of a head teacher.</p></div>
          <div className="icard" id="beyond-oldham"><h3>Schools outside Oldham</h3><p>Being outside Oldham is no barrier. We are based in Delph, close to Greater Manchester, West Yorkshire and the Peak District, and can come to you in person for planning and complex visits.</p><TBC block>How far in-person support reaches</TBC></div>
        </div>
      </Band>
      <Band>
        <Split image={{ src: shared('land-ghyll'), alt: 'Young people in helmets scrambling up a moorland stream with an instructor nearby' }} heading="Who in your school uses it">
          <Ticks items={['Visit leaders plan and submit visits on Evolve', 'Your EVC checks plans and is our main contact', 'Head teachers and governors approve visits and set policy', 'Business managers look after the agreement']} />
        </Split>
      </Band>
      <QuoteCta />
    </>
  )
}

/* ------------------------------------------------------------------ training */
const COURSES = [
  { id: 'evc', name: 'Educational Visits Coordinator (EVC)', length: 'One day', who: 'New EVCs and the staff who support them', text: 'Follows DfE guidance on the role of the EVC. One free place a year comes with the service.', extra: <TBC block>How often EVCs should refresh their training</TBC> },
  { id: 'visit-leader', name: 'Visit Leader training', length: 'Three hours, or two twilight sessions', who: 'Staff leading and supporting visits', text: 'Follows the OEAP framework, at Castleshaw or at your school.' },
  { id: 'move', name: 'Management of Visit Emergencies (MoVE)', length: 'To confirm', who: 'Senior leaders', text: 'The national OEAP programme for the people who would lead the response if something went wrong on a visit.' },
  { id: 'heads', name: 'Head teacher and governor sessions', length: 'To confirm', who: 'Head teachers and governors', text: 'Your responsibilities for approving visits, and what a good visits policy looks like.' },
  { id: 'first-aid', name: 'First Aid for group leaders (ITC)', length: 'Two days', who: 'Anyone leading groups outdoors', text: 'HSE approved. Meets most national governing body requirements for outdoor leaders.' },
  { id: 'midas', name: 'Minibus Driver Awareness (MiDAS)', length: 'Three hours', who: 'Staff who drive minibuses', text: 'Theory course, at the centre or at your school.' },
]

export function Training({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Training"
        lead="Courses for everyone involved in planning and running educational visits, at the Castleshaw Centre or at your school."
        image={{ src: img('advice-owc'), alt: 'A group of leaders walking together along a lane' }}
      />
      <Band>
        <SectionHead title="Our courses" />
        <ul className="courses">
          {COURSES.map((c) => (
            <li key={c.id} id={c.id} className="icard course">
              <h3>{c.name}</h3>
              <dl className="meta">
                <div><dt>Length</dt><dd>{c.length === 'To confirm' ? <TBC>Length</TBC> : c.length}</dd></div>
                <div><dt>For</dt><dd>{c.who}</dd></div>
              </dl>
              <p>{c.text}</p>
              {c.extra}
            </li>
          ))}
        </ul>
      </Band>
      <Band tone="sky" id="dates">
        <Intro heading="Course dates and prices">
          <p>Members of the service get one free EVC place a year and subsidised places on other courses.</p>
        </Intro>
        <TBC block>Upcoming course dates, and prices for members and non-members. The last published date was an EVC course on 6 November 2025.</TBC>
        <p>To book a place or arrange training at your school, call <a href={PHONE_HREF}>{PHONE}</a> or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </Band>
      <Band>
        <SectionHead title="Other training we run" />
        <Callout title="Outdoor qualifications for leaders">
          <p>We also run British Canoeing, Duke of Edinburgh expedition and Countryside Leader training. <a href={href('courses-and-clubs/outdoor-awards/')}>Outdoor awards</a></p>
        </Callout>
      </Band>
      <QuoteCta title="Training comes with the service" text="One free EVC place a year for every member establishment, and subsidised places on other courses." />
    </>
  )
}

/* ------------------------------------------------------------------ emergency */
export function Emergency({ path }) {
  return (
    <>
      <PageTop
        path={path}
        tone="ink"
        title="Emergency support"
        lead="If something goes wrong on a visit, you are not on your own. Call our critical incident line, day or night."
        image={{ src: gen('moor-dusk'), alt: 'A moorland reservoir at dusk', pos: '50% 50%' }}
      >
        <p className="sos-big"><a href={INCIDENT_HREF}>{INCIDENT}</a></p>
        <p>The 24/7 critical incident line for members of the service.</p>
      </PageTop>
      <Band>
        <Intro heading="What we do in an incident">
          <p>An experienced adviser answers, helps you take stock and stays with you until the situation is under control.</p>
          <Ticks items={['Helping the visit leader manage the incident on the ground', 'Supporting your school’s senior leaders', 'Contacting families', 'Dealing with the media', 'Linking with the Council’s emergency arrangements']} />
          <TBC block>Whether the line is staffed 24/7 all year, or during term time only, and what happens in school holidays.</TBC>
        </Intro>
      </Band>
      <Band tone="sky">
        <SectionHead title="Advice and preparation" />
        <div className="cols cols-3">
          <div className="icard"><h3>Everyday advice</h3><p>For questions that aren&rsquo;t emergencies, call the advice line in school hours.</p><p><a href={PHONE_HREF}>{PHONE}</a></p></div>
          <div className="icard"><h3>Be ready</h3><p>Management of Visit Emergencies (MoVE) training prepares senior leaders to run the response at school.</p><p><a href={av('training/') + '#move'}>About MoVE</a></p></div>
          <div className="icard"><h3>Save the number</h3><p>Add the critical incident line to every visit&rsquo;s emergency contacts and to each leader&rsquo;s phone.</p><TBC block>A printable card for visit leaders</TBC></div>
        </div>
      </Band>
      <QuoteCta title="Have someone to call" text="The critical incident line is part of the service agreement." />
    </>
  )
}

/* ------------------------------------------------------------------ resources */
export function Resources({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Guidance and resources"
        lead="Policies, templates and national guidance for planning educational visits."
        image={{ src: gen('drystone-wall'), alt: 'A lichen-covered dry-stone wall on the moor', pos: '30% 50%' }}
      />
      <Band>
        <Intro heading="National guidance">
          <p>Our advice follows the guidance recognised by the Government and the Health and Safety Executive.</p>
        </Intro>
        <LinkList items={[
          { title: 'OEAP National Guidance', href: 'https://oeapng.info/', text: 'The national guidance for outdoor learning, off-site visits and learning outside the classroom' },
          { title: 'HSE: school trips', href: 'https://www.hse.gov.uk/education/school-trips.htm', text: 'The Health and Safety Executive on school trips and outdoor activities' },
          { title: 'Adventure Activities Licensing', href: 'https://www.hse.gov.uk/aala/', text: 'Checking whether an activity provider holds an AALA licence' },
          { title: 'LOtC Quality Badge', href: 'https://www.lotcqualitybadge.org.uk/', text: 'Finding accredited providers' },
        ]} />
      </Band>
      <Band tone="sky">
        <Intro heading="For members">
          <p>Members receive Oldham&rsquo;s visits policy, template documents and updates on local policy, national guidance and legislation.</p>
          <TBC block>Which policies and templates can be shared publicly, and which are for members only (for example the visits policy, risk management templates, consent forms and emergency procedures).</TBC>
        </Intro>
      </Band>
      <QuoteCta />
    </>
  )
}

/* ------------------------------------------------------------------ advisers */
export function Advisers({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Our advisers"
        lead="Our advisers are not desk-based. They still lead groups outdoors every week, so their advice comes from doing the job as well as knowing the guidance."
        image={{ src: img('advice-river-training'), alt: 'Leaders practising a river crossing with walking poles' }}
      />
      <Band>
        <People items={[
          { name: 'Rod Steele', role: 'Senior tutor and adviser', img: shared('team/rod-steele'), alt: 'Rod Steele, smiling, holding a canoe paddle on a river', extra: 'Institute for Outdoor Learning accredited practitioner. IOSH. Level 4 canoe and kayak coach. Mountain bike leader. OEAP member.' },
          { name: 'Joseph Myhill', role: 'Centre manager and adviser', img: shared('team/joseph-myhill'), alt: 'Joseph Myhill, smiling, in a red jacket and woolly hat outdoors', extra: 'Duke of Edinburgh’s Award assessor and supervisor. Former DofE manager. Paddlesport leader. OEAP member.' },
        ]} />
        <p><TBC>Whether the advisers hold OEAP accredited adviser status</TBC></p>
      </Band>
      <Band tone="sky">
        <Ledger items={[
          ['20+', 'years running the service'],
          ['40+', 'years of combined adviser experience'],
          ['10', 'working days to review a visit, usually less'],
          ['24/7', 'critical incident line'],
        ]} />
      </Band>
      <Band tone="ink">
        <Pull big text="Extraordinary." by="A Council for Learning Outside the Classroom inspector, on our most recent inspection" />
      </Band>
      <QuoteCta />
    </>
  )
}

/* ------------------------------------------------------------------ questions */
export function Questions({ path }) {
  return (
    <>
      <PageTop path={path} title="Questions" lead="What schools and business managers usually ask us." />
      <Band narrow>
        <Faq items={[
          { q: 'What does it cost?', a: <p>Prices depend on the size and type of your establishment. <a href={QUOTE}>Contact us for a quote</a>. <TBC>Packages and price bands</TBC></p> },
          { q: 'Who can join?', a: 'Any school, college, academy or youth service, in Oldham or beyond.' },
          { q: 'When does the agreement run?', a: <p><TBC>Agreement year (April to March, or September to August)</TBC></p> },
          { q: 'Do we need Evolve already?', a: 'No. Evolve comes with the service. We set up your establishment and train your users.' },
          { q: 'Can a trust buy for all its schools?', a: <p><TBC>Whether whole-trust agreements are offered</TBC></p> },
          { q: 'How long does approval take?', a: 'We review visit forms within 10 working days, and usually sooner. Submit visits in good time, especially residentials and overseas visits.' },
          { q: 'What happens if a visit isn’t approved?', a: 'We send it back with clear advice on what to change and why, and we’re happy to talk it through. Most visits are approved once the changes are made.' },
          { q: 'What happens out of hours?', a: <p>Our critical incident line is for emergencies on a visit: <a href={INCIDENT_HREF}>{INCIDENT}</a>. For everyday advice, call {PHONE} in school hours. <TBC>Cover outside term time</TBC></p> },
          { q: 'Can you train our staff at our school?', a: 'Yes. Visit Leader training and MiDAS theory can run at your school, and other courses can be arranged for groups.' },
          { q: 'Do you only approve visits to Castleshaw?', a: 'No. We advise on and approve visits anywhere, from a local museum to an overseas expedition.' },
        ]} />
      </Band>
      <QuoteCta title="Another question?" text="Call or email and one of our advisers will help." />
    </>
  )
}

/* ------------------------------------------------------------------ quote */
function QuotePage({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Get a quote"
        lead="Tell us a little about your setting and one of our advisers will get back to you by email or phone to talk it through and send a quote."
      />
      <Band>
        <div className="contact-grid">
          <div className="contact-side">
            <h2 className="h2i">Talk to an adviser</h2>
            <p>Call in school hours, or email us any time.</p>
            <a className="contact-big" href={PHONE_HREF}>{PHONE}</a>
            <p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
            <Callout title="Already a member?" tone="sky"><p><TBC>Evolve login address</TBC></p></Callout>
            <p><a href={`${ROOT}${GUIDE.href}`} download onClick={() => track('Guide downloaded', { place: 'get-a-quote' })}>Download the guide: {GUIDE.title} (PDF)</a></p>
          </div>
          <LeadForm source="get-a-quote" />
        </div>
      </Band>
    </>
  )
}
export { QuotePage as Quote }

/* ------------------------------------------------------------------ landing */
// "Signed off": the landing page for the service. Calm and photographic, with one
// promise, the four-step sign-off, proof, the advisers, and a short quote form.
const GUIDE_URL = () => `${ROOT}${GUIDE.href}`
const downloadGuide = (place) => () => track('Guide downloaded', { place })

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useReveal()
  return <Tag ref={ref} className={`al-rv ${className}`} {...rest}>{children}</Tag>
}

function Placeholder({ children }) {
  return <span className="tbc-tag al-ph">{children}</span>
}

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
            className="al-hero-img" src={gen('boots-gritstone')} alt="Walking boots on wet gritstone beside a moorland stream"
            shape="blob-9" backdrop="offset" accent="lime" offset="bl" aspect="4/4.5" pos="28% 60%" width={1586} height={992} priority shadow
          />
        </div>
        <svg className="ph-ridge" viewBox="0 0 1600 140" preserveAspectRatio="none" aria-hidden="true"><path d={edge} /></svg>
      </header>
      <SubNav path={path} />

      {/* proof */}
      <Band>
        <Reveal><Ledger items={PROOF} /></Reveal>
      </Band>

      {/* who it's for */}
      <Band id="who">
        <Reveal className="al-who">
          <div className="al-who-copy">
            <p className="al-kicker">Who it&rsquo;s for</p>
            <h2 className="h2i">Any school, college, academy or youth service</h2>
            <p className="al-sub">Employers are responsible for the safety of staff and young people on visits, and national guidance recommends access to competent advice. That&rsquo;s us.</p>
            <AudienceTabs items={AUDIENCES} renderPanel={(t) => (<><p>{t.body}</p>{t.tbc && <p><TBC>{t.tbc}</TBC></p>}<p><a href={av('who-its-for/') + '#' + ({ maintained: 'oldham-schools', trusts: 'academies', youth: 'colleges-youth', beyond: 'beyond-oldham' })[t.key]}>More about {t.title.toLowerCase()}</a></p></>)} />
          </div>
          <figure className="al-photo al-photo-tall"><img src={gen('wellies-puddle')} alt="Wellington boots stepping into a muddy puddle on a farm track" width="1122" height="1402" loading="lazy" style={{ objectPosition: '50% 70%' }} /></figure>
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
      </Band>

      {/* what we look at */}
      <Band id="what-we-check">
        <Reveal className="al-checks">
          <figure className="al-photo al-photo-tall"><img src={gen('hands-carabiner')} alt="Hands checking a locked carabiner on a climbing rope" width="1122" height="1402" loading="lazy" /></figure>
          <div>
            <p className="al-kicker">What we look at</p>
            <h2 className="h2i">The whole visit, not just the risk assessment</h2>
            <p className="al-sub">The question is simple: has this been organised safely and sensibly, in line with national guidance?</p>
            <dl className="al-check-list">
              {CHECKS.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
            </dl>
            <div className="al-ready">
              <h3>If a visit isn&rsquo;t ready yet</h3>
              <p>We don&rsquo;t just say no. We send the plan back with clear advice on what to change and why, and we&rsquo;re happy to talk it through. Most visits are approved once those changes are made.</p>
            </div>
          </div>
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
        <Reveal className="al-quote">
          <Placeholder>Placeholder quote</Placeholder>
          <blockquote>&ldquo;We used to dread the paperwork for our Year 6 residential. Now it goes through Evolve, Castleshaw check it, and if something needs changing they tell us exactly what and why.&rdquo;</blockquote>
          <p className="al-by">Visits coordinator, primary school <Placeholder>To be replaced with a real, attributed quote</Placeholder></p>
        </Reveal>
        <p className="al-more"><a href={av('service-agreement/')}>Everything in the service agreement</a></p>
      </Band>

      {/* emergency */}
      <section className="al-sos-band" aria-labelledby="sos-h">
        <img className="al-sos-bg" src={gen('moor-dusk')} alt="" width="1600" height="900" loading="lazy" />
        <Reveal className="al-sos-in">
          <p className="al-kicker al-kicker-light">Emergency support</p>
          <h2 id="sos-h">If something goes wrong on a visit, call us. Day or night.</h2>
          <a className="al-sos-num" href={INCIDENT_HREF} onClick={() => track('Phone tapped', { place: 'incident-band' })}>{INCIDENT}</a>
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

      {/* training */}
      <Band tone="sky" id="training">
        <Reveal className="al-train">
          <div>
            <p className="al-kicker">Training</p>
            <h2 className="h2i">Courses for everyone in the chain</h2>
            <p className="al-sub">At the Castleshaw Centre, or at your school. Members get one free EVC place a year and subsidised places on other courses.</p>
            <p><a href={av('training/')}>Course details and dates</a></p>
          </div>
          <ul className="al-courses">
            {[['Educational Visits Coordinator (EVC)', 'One day'], ['Visit Leader training', 'Three hours'], ['Management of Visit Emergencies (MoVE)', null], ['First Aid for group leaders', 'Two days'], ['Minibus Driver Awareness (MiDAS)', 'Three hours']].map(([n, l]) => (
              <li key={n}><span>{n}</span><span className="al-len">{l || <TBC>Length</TBC>}</span></li>
            ))}
          </ul>
        </Reveal>
      </Band>

      {/* questions */}
      <Band id="questions" narrow>
        <Reveal className="al-head">
          <p className="al-kicker">Questions</p>
          <h2 className="h2i">What schools usually ask</h2>
        </Reveal>
        <Faq items={FAQ} />
        <p className="al-more"><a href={av('questions/')}>More questions</a></p>
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
              <a className="al-talk-tel" href={PHONE_HREF} onClick={() => track('Phone tapped', { place: 'final' })}>{PHONE}</a>
              <a className="sq-host al-talk-mail" href={`mailto:${EMAIL}`} onClick={() => track('Email tapped', { place: 'final' })}>{EMAIL}<Squiggle i={2} /></a>
            </div>
          </div>
          <LeadForm source="advice-landing" />
        </div>
      </section>
      <StickyQuote phone={PHONE} phoneHref={PHONE_HREF} />
    </>
  )
}
