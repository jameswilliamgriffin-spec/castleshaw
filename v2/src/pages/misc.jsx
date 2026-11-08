// Contact, the privacy notice and the accessibility statement.
import { PageTop, Band, SectionHead, SqLink, Callout, EnquiryForm, img, OLD } from '../ui/inner/blocks'
import { href, PHONE, PHONE_HREF, EMAIL, INCIDENT, INCIDENT_HREF, ADDRESS, W3W, FACEBOOK } from '../data'

export function Contact({ path }) {
  return (
    <>
      <PageTop
        path={path}
        title="Contact us"
        lead="Tell us who is coming and what you have in mind, and we will help you plan it. For anything urgent, call."
        image={{ src: img('stay-front'), alt: 'The front of the Castleshaw Centre beside the lane', shape: 'soft' }}
      />
      <Band id="contact">
        <SectionHead title="Ways to get in touch" />
        <div className="contact-grid">
          <div>
            <a className="contact-big" href={PHONE_HREF}>{PHONE}</a>
            <ul className="contact-list">
              <li><strong>Email</strong><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><strong>Address</strong>The Castleshaw Centre, {ADDRESS.join(', ')}</li>
              <li><strong>what3words</strong><a href={`https://what3words.com/${W3W}`} rel="noopener">///{W3W}</a></li>
              <li><strong>Office hours</strong>8.30am to 4.30pm</li>
              <li><strong>Facebook</strong><a href={FACEBOOK} rel="noopener">Castleshaw Centre on Facebook</a></li>
              <li><strong>24/7 critical incident line</strong>For members of the educational visits advice service with an emergency on a visit: <a href={INCIDENT_HREF}>{INCIDENT}</a></li>
            </ul>
            <p><SqLink href={href('about/where-we-are/')}>How to find us</SqLink></p>
          </div>
          <EnquiryForm
            title="Send an enquiry"
            fields={[
              { name: 'name', label: 'Your name', auto: 'name' },
              { name: 'org', label: 'School, group or organisation', auto: 'organization', optional: true },
              { name: 'email', label: 'Email', type: 'email', auto: 'email', half: true },
              { name: 'tel', label: 'Phone', type: 'tel', auto: 'tel', optional: true, half: true },
              { name: 'about', label: 'What is it about?', type: 'select', options: ['A school or group visit', 'Staying at the centre', 'Holiday clubs or activity courses', 'Outdoor awards or DofE', 'Educational visits advice', 'Training', 'Something else'] },
              { name: 'when', label: 'Dates, if you have them', optional: true, half: true, placeholder: 'For example, June 2027' },
              { name: 'size', label: 'Group size', optional: true, half: true, placeholder: 'For example, 30 pupils' },
              { name: 'msg', label: 'Your message', type: 'textarea', rows: 5 },
            ]}
            note="We usually reply within a few working days. Your details are used only to answer your enquiry."
          />
        </div>
      </Band>
    </>
  )
}

// The privacy notice as a web page: Oldham Council's notice for young people's services
// (version 2.2, August 2023), plus what this website itself collects and its cookies.
const Sec = ({ id, title, children }) => (
  <section id={id} className="legal-sec"><h2>{title}</h2>{children}</section>
)
const List = ({ items }) => <ul className="legal-list">{items.map((x) => <li key={x}>{x}</li>)}</ul>

export function Privacy({ path }) {
  return (
    <>
      <PageTop path={path} title="Privacy notice" lead="How Oldham Council's young people's services, including the Castleshaw Centre, use your information." />
      <Band>
        <div className="legal">
          <p className="legal-meta">Oldham Council young people&rsquo;s services privacy notice, version 2.2, 30 August 2023. The Council&rsquo;s main privacy notice, which sets out our core data protection commitments and your rights, is at <a href="https://www.oldham.gov.uk/dataprotection" rel="noopener">oldham.gov.uk/dataprotection</a>.</p>

          <Sec id="this-website" title="This website">
            <p>When you send an enquiry or ask for a quote, we collect what you type into the form: usually your name, organisation, email address, phone number and message. We use it only to reply to you and to deal with your enquiry. Enquiries go to the centre&rsquo;s inbox at {EMAIL}.</p>
            <p>The website doesn&rsquo;t ask for any other personal information, and we don&rsquo;t sell or share enquiries with anyone outside the Council for marketing.</p>
          </Sec>

          <Sec id="cookies" title="Cookies">
            <p>A cookie is a small file a website saves on your device. This website doesn&rsquo;t need any cookies to work.</p>
            <p>If we use visitor statistics to see which pages are useful, we will ask first, with a short message at the bottom of the page. Statistics cookies are only set if you choose &ldquo;Accept&rdquo;, and you can change your mind at any time using &ldquo;Cookie settings&rdquo; at the bottom of every page.</p>
          </Sec>

          <Sec id="who" title="Who this notice covers">
            <p>All users (including young people), business partners and suppliers of the Council&rsquo;s:</p>
            <List items={['Youth Service, including the Youth Council, Children in Care Council and Barrier Breakers', 'Outdoor and Environmental Education service (the Castleshaw Centre)', 'Holiday Activities and Food (HAF) programme']} />
            <p>We may update our privacy notices at any time, so please refer to the version on this website for the latest details.</p>
          </Sec>

          <Sec id="use" title="What we use your information for">
            <List items={['To provide our services', 'To look after you or your young person while in our care, including understanding their needs', 'To manage activity bookings and equipment', 'To ask for the right permissions to take part in activities', 'To promote our services and opportunities to you, and publicly, where you have given consent', 'For statistics and reporting, including statutory reporting', 'To make sure everyone has equal access to what we offer']} />
          </Sec>

          <Sec id="what" title="What information we use">
            <p>Personal information is anything that identifies a living person, such as your name and contact details. The law treats some kinds as &ldquo;special&rdquo; because they need more protection: racial or ethnic origin, sexuality, religious or philosophical beliefs, trade union membership, political opinions, genetic and biometric data, physical or mental health, and criminal convictions.</p>
            <p>We collect and use:</p>
            <List items={['Personal details, such as name, address and contact details', 'Date of birth', 'Gender', 'Racial or ethnic origin (special)', 'Sexual orientation (special)', 'Religious or philosophical beliefs (special)', 'Physical or mental health, including access needs and adjustments, dietary needs, medical conditions and allergies, and medication (special)', 'Lifestyle and social circumstances, such as housing, employment, income and free school meals entitlement']} />
          </Sec>

          <Sec id="legal-basis" title="Our legal basis">
            <p>We use and share your information:</p>
            <List items={['Where you consent to take part in our programmes and services, or to receive information from us', 'Where we are fulfilling a contract', 'Where it is in someone\u2019s vital interests, for example in an emergency or a safeguarding situation', 'Where we have a legal obligation or are carrying out a public task', 'Where we have a legitimate interest']} />
            <p>Laws that support some of this work include the Care Act 2014, the Public Services (Social Value) Act 2012, the Local Government and Public Involvement in Health Act, the Equality Act 2010, the Local Government Act 2003, the Education Act and the Health and Safety at Work Act 1974.</p>
          </Sec>

          <Sec id="sharing" title="Who we share it with">
            <p>We may share your information with, and receive information from:</p>
            <List items={['Other parts of Oldham Council', 'Other local authorities', 'Government departments, such as the Department for Education, the Health and Safety Executive and the DWP', 'The NHS and other health and social care organisations', 'The police', 'Schools and other educational organisations', 'Businesses and voluntary organisations providing services to us or on our behalf', 'Anyone you ask us to share your details with']} />
            <p>We may also receive information from employers, family members and members of the public. We don&rsquo;t transfer your information outside the European Economic Area, and every decision we make about you involves a person, not just a computer.</p>
          </Sec>

          <Sec id="keeping" title="How long we keep it">
            <p>We keep your information only for as long as the law says, or, where the law doesn&rsquo;t say, for as long as we need it to run the service.</p>
          </Sec>

          <Sec id="rights" title="Your rights and getting advice">
            <p>The Council&rsquo;s main privacy notice at <a href="https://www.oldham.gov.uk/dataprotection" rel="noopener">oldham.gov.uk/dataprotection</a> explains your rights, how to raise a concern and how to complain about how we handle your information.</p>
          </Sec>

          <Callout title="Questions about your data" tone="sky">
            <p>Contact us on <a href={PHONE_HREF}>{PHONE}</a> or <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or contact Oldham Council&rsquo;s data protection officer.</p>
          </Callout>
          <p className="legal-meta">You can also <a href={OLD + 'young_peoples_services_pn_v2.2_august_2023.docx'}>download the notice as a Word document</a> (103 KB).</p>
        </div>
      </Band>
    </>
  )
}

/* ------------------------------------------------------------------ accessibility */
export function Accessibility({ path }) {
  return (
    <>
      <PageTop path={path} title="Accessibility statement" lead="We want as many people as possible to be able to use this website." />
      <Band>
        <div className="legal">
          <p className="legal-meta">This statement applies to the Castleshaw Centre website, run by Oldham Council.</p>
          <Sec id="using" title="Using this website">
            <p>You should be able to:</p>
            <List items={['zoom in up to 400% without the text spilling off the screen', 'make the text up to twice as large', 'move around the website using just a keyboard', 'use the website with a screen reader', 'use it on a phone, tablet or computer, in portrait or landscape', 'turn off the moving film on the homepage by switching on \u201creduce motion\u201d on your device']} />
          </Sec>
          <Sec id="limits" title="How accessible this website is">
            <p>We know some parts aren&rsquo;t fully accessible:</p>
            <List items={['some documents, such as inspection reports, are PDF or Word files from our previous website and may not work well with assistive technology', 'some older photographs and children\u2019s drawings can only be described briefly in text']} />
          </Sec>
          <Sec id="feedback" title="Feedback and contact">
            <p>If you need information on this website in a different format, or you find a problem we haven&rsquo;t listed, contact us on <a href={PHONE_HREF}>{PHONE}</a> or <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We&rsquo;ll reply within 10 working days.</p>
          </Sec>
          <Sec id="enforcement" title="Enforcement procedure">
            <p>The Equality and Human Rights Commission (EHRC) is responsible for enforcing the accessibility regulations. If you&rsquo;re not happy with how we respond to your complaint, contact the <a href="https://www.equalityadvisoryservice.com/" rel="noopener">Equality Advisory and Support Service (EASS)</a>.</p>
          </Sec>
          <Sec id="technical" title="Technical information">
            <p>Oldham Council is committed to making its websites accessible, in line with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</p>
            <p>This website is partially compliant with the <a href="https://www.w3.org/TR/WCAG22/" rel="noopener">Web Content Accessibility Guidelines version 2.2</a> AA standard, because of the documents listed above. We plan to replace them with web pages or accessible versions when they are next updated.</p>
          </Sec>
          <Sec id="testing" title="How we tested this website">
            <p>This statement was prepared on 8 November 2026. The website was tested by its developer on phones, tablets and computers, with a keyboard, at large text sizes, and with automated accessibility checks on every page.</p>
          </Sec>
        </div>
      </Band>
    </>
  )
}
