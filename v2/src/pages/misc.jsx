// Contact and the privacy notice.
import { PageTop, Band, SectionHead, SqLink, Intro, Downloads, Callout, EnquiryForm, TBC, img, OLD } from '../ui/inner/blocks'
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
              <li><strong>Office hours</strong><TBC>Office opening hours</TBC></li>
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

export function Privacy({ path }) {
  return (
    <>
      <PageTop path={path} title="Privacy notice" lead="How Oldham Council's young people's services, including the Castleshaw Centre, use your information." />
      <Band narrow>
        <Intro heading="The privacy notice">
          <p>The Castleshaw Centre is part of Oldham Council. The Council&rsquo;s privacy notice for young people&rsquo;s services explains what information we collect, why, how long we keep it and your rights.</p>
        </Intro>
        <Downloads items={[{ title: 'Young people’s services privacy notice (version 2.2, August 2023)', href: OLD + 'young_peoples_services_pn_v2.2_august_2023.docx', meta: 'Word document, 103 KB' }]} />
        <TBC block>The privacy notice as a web page, so it can be read without downloading a Word document, plus a cookie statement and an accessibility statement for the new site.</TBC>
        <Callout title="Questions about your data" tone="sky">
          <p>Contact us on <a href={PHONE_HREF}>{PHONE}</a> or <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or contact Oldham Council&rsquo;s data protection officer.</p>
        </Callout>
      </Band>
    </>
  )
}
