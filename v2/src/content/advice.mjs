// Shared facts for the educational visits advice pages, the PDF guide and the page's
// structured data. Plain strings only, so scripts/gen-pages.mjs can read them too.
// Anything the centre hasn't confirmed is written as a placeholder and listed in
// content/OPEN-QUESTIONS.md.

export const PROOF = [
  ['20+ years', 'supporting educational visits in Oldham and beyond'],
  ['10 days', 'to review a visit, and usually sooner'],
  ['24/7', 'critical incident line for visits'],
  ['1 free', 'EVC training place a year, per establishment'],
]

export const STEPS = [
  { who: 'Visit leader', what: 'Plans the visit on Evolve', body: 'The itinerary, risk management, staffing, transport and any activity providers, all in one place, so everyone in the chain sees the same plan.' },
  { who: 'Your EVC', what: 'Checks the plan', body: 'Your Educational Visits Coordinator, a senior member of staff, reviews it first and sends it back if anything is missing.' },
  { who: 'Head teacher', what: 'Approves it for your setting', body: 'Or the head of your service, for colleges, youth and community settings.' },
  { who: 'Castleshaw adviser', what: 'Signs it off', body: 'For adventurous, residential and overseas visits, we review the whole visit against Oldham Council policy, OEAP National Guidance and legislation, usually within 10 working days.' },
]

export const CHECKS = [
  ['Planning', 'Clear aims, a realistic itinerary, and a plan B for the weather.'],
  ['Risk management', 'The significant risks spotted, and sensibly managed rather than buried in paperwork.'],
  ['Arrangements', 'Transport, accommodation, providers, consent, medical needs and what happens in an emergency.'],
  ['Staffing', 'Enough adults, with the right experience and qualifications for the group and the activities.'],
]

export const INCLUDED = [
  ['Advice and approval', ['Ongoing advice on any educational visit', 'Visit forms reviewed within 10 working days', 'Approval of adventurous, residential and overseas visits', 'An advice line during school hours', 'Visits to your school to help with planning and monitoring']],
  ['Evolve', ['Use of the Evolve visit management system', 'Set-up, support and training for every user', 'Optional upgrade: Evolve+, linking your MIS to Evolve']],
  ['Policy and updates', ['Guidance, policies and template documents', 'Updates on local policy, national guidance and legislation through the year', 'Webinars for members', 'Representation at regional and national meetings']],
  ['Training and support', ['One free EVC course place a year', 'Subsidised visit leader and extra EVC training', 'Sessions for head teachers and governors', 'A 24/7 critical incident line']],
]

export const FAQ = [
  { q: 'What does it cost?', a: 'The agreement is priced per pupil, so it depends on the size and type of your establishment. Contact us for a quote and we will talk you through it.' },
  { q: 'Who can join?', a: 'Any school, college, academy or youth service, in Oldham or beyond.' },
  { q: 'Do we need Evolve already?', a: 'No. Evolve comes with the service. We set up your establishment and train your users.' },
  { q: 'How long does approval take?', a: 'We review visit forms within 10 working days, and usually sooner. Adventurous activities, residentials and overseas visits need our approval, so submit them in good time.' },
  { q: 'What happens if a visit isn’t approved?', a: 'We send it back with clear advice on what to change and why, and we’re happy to talk it through. Most visits are approved once the changes are made.' },
  { q: 'Do you only approve visits to Castleshaw?', a: 'No. We advise on and approve visits anywhere, from a local museum to an overseas expedition.' },
  { q: 'Can you train our staff at our school?', a: 'Yes. Visit Leader training and minibus driver theory can run at your school, and other courses can be arranged for groups.' },
  { q: 'What happens out of hours?', a: 'Our critical incident line is for emergencies on a visit, day or night, all year round, including the school holidays. For everyday advice, call the advice line in school hours.' },
]

export const GUIDE = { href: 'shared/docs/castleshaw-educational-visits-guide.pdf', title: 'Planning safe educational visits', sub: 'A guide for schools and settings' }
