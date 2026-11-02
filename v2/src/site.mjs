// The v2 site map: one source of truth for the menu, footer, breadcrumbs, section
// navigation, page generation (scripts/gen-pages.mjs) and the build (vite.config.js).
// Paths are relative to /v2/ and always end in a slash.

export const SECTIONS = [
  {
    key: 'activities', title: 'Activities', long: 'Activities and school visits', path: 'activities/',
    blurb: 'Adventure, field studies and history days for schools and groups.',
    children: [
      { key: 'land', title: 'Adventure on land', path: 'activities/adventure-on-land/' },
      { key: 'water', title: 'Adventure on water', path: 'activities/adventure-on-water/' },
      { key: 'bushcraft', title: 'Bushcraft', path: 'activities/bushcraft/' },
      { key: 'environment', title: 'Environmental education', path: 'activities/environmental-education/' },
      { key: 'history-days', title: 'Roman and local history', path: 'activities/roman-history/' },
      { key: 'team', title: 'Team building', path: 'activities/team-building/' },
      { key: 'plan', title: 'Plan your visit', path: 'activities/plan-your-visit/' },
    ],
  },
  {
    key: 'advice', title: 'Visits advice', long: 'Educational visits advice and guidance', path: 'advice-and-guidance/',
    blurb: 'Final sign-off, training and 24/7 support for every educational visit.',
    children: [
      { key: 'how', title: 'How it works', path: 'advice-and-guidance/how-it-works/' },
      { key: 'sla', title: 'The service agreement', path: 'advice-and-guidance/service-agreement/' },
      { key: 'who', title: "Who it's for", path: 'advice-and-guidance/who-its-for/' },
      { key: 'training', title: 'Training', path: 'advice-and-guidance/training/' },
      { key: 'emergency', title: 'Emergency support', path: 'advice-and-guidance/emergency-support/' },
      { key: 'resources', title: 'Guidance and resources', path: 'advice-and-guidance/guidance-and-resources/' },
      { key: 'advisers', title: 'Our advisers', path: 'advice-and-guidance/our-advisers/' },
      { key: 'faq', title: 'Questions', path: 'advice-and-guidance/questions/' },
      { key: 'quote', title: 'Get a quote', path: 'advice-and-guidance/get-a-quote/' },
    ],
  },
  {
    key: 'stay', title: 'Stay', long: 'Stay and hire', path: 'stay/',
    blurb: 'Accommodation for 38, for residential visits or your own programme.',
    children: [],
  },
  {
    key: 'courses', title: 'Courses and clubs', long: 'Courses and holiday clubs', path: 'courses-and-clubs/',
    blurb: 'Holiday clubs, activity courses and outdoor awards.',
    children: [
      { key: 'clubs', title: 'Holiday clubs', path: 'courses-and-clubs/holiday-clubs/' },
      { key: 'activity-courses', title: 'Activity courses', path: 'courses-and-clubs/activity-courses/' },
      { key: 'awards', title: 'Outdoor awards and DofE', path: 'courses-and-clubs/outdoor-awards/' },
    ],
  },
  {
    key: 'about', title: 'About us', long: 'About the Castleshaw Centre', path: 'about/',
    blurb: 'Who we are, where we are, and 130 years of history.',
    children: [
      { key: 'where', title: 'Where we are', path: 'about/where-we-are/' },
      { key: 'valley', title: 'Around the valley', path: 'about/where-we-are/around-the-valley/', parent: 'where' },
      { key: 'people', title: 'Our team', path: 'about/our-team/' },
      { key: 'accreditation', title: 'Accreditation and safety', path: 'about/accreditation/' },
      { key: 'say', title: 'What people say', path: 'about/what-people-say/' },
      { key: 'history', title: 'Our history', path: 'about/history/' },
      { key: 'news', title: 'News', path: 'about/news/' },
    ],
  },
]

export const EXTRA = [
  { key: 'contact', title: 'Contact us', path: 'contact/' },
  { key: 'privacy', title: 'Privacy notice', path: 'privacy/' },
]

// Every page with its section, for breadcrumbs and generation.
// The homepage and the advice landing page have their own entries (index.html, advice.jsx).
export const PAGES = [
  ...SECTIONS.flatMap((s) => [
    { ...s, section: s.key, hub: true },
    ...s.children.map((c) => ({ ...c, section: s.key })),
  ]),
  ...EXTRA.map((e) => ({ ...e, section: e.key })),
]

export const CUSTOM_ENTRY = new Set(['advice-and-guidance/'])

export const DESCRIPTIONS = {
  'activities/': 'Adventurous activities, environmental education, bushcraft, Roman history and team building days for schools and groups at the Castleshaw Centre, Delph.',
  'activities/adventure-on-land/': 'Ghyll scrambling, rock climbing, abseiling, caving, hill walking and orienteering in the South Pennines.',
  'activities/adventure-on-water/': 'Kayaking, canoeing, rafted canoeing, raft building and stand up paddleboarding on Pennine reservoir water.',
  'activities/bushcraft/': 'Shelter building, fire lighting and campcraft with qualified bushcraft instructors.',
  'activities/environmental-education/': 'Primary science and geography days and secondary field studies in the Castleshaw Valley.',
  'activities/roman-history/': 'Roman fort days, the Industrial Revolution, Victorian Delph and local history trails.',
  'activities/team-building/': 'Team building for primary classes, secondary groups and adult away days.',
  'activities/plan-your-visit/': 'Booking, what to bring, information for group leaders and free resources for teachers.',
  'advice-and-guidance/how-it-works/': 'How visits are planned on Evolve and signed off by our advisers.',
  'advice-and-guidance/service-agreement/': 'What the Educational Visits Advice and Guidance Service Level Agreement includes.',
  'advice-and-guidance/who-its-for/': 'The advice service for maintained schools, academies, trusts, colleges and youth services.',
  'advice-and-guidance/training/': 'EVC, Visit Leader, MoVE, First Aid and MiDAS training for school and youth staff.',
  'advice-and-guidance/emergency-support/': 'The 24/7 critical incident line for educational visits.',
  'advice-and-guidance/guidance-and-resources/': 'Policies, templates and national guidance for planning educational visits.',
  'advice-and-guidance/our-advisers/': 'Meet the Educational Visits Advisers based at the Castleshaw Centre.',
  'advice-and-guidance/questions/': 'Questions schools ask about the educational visits advice service.',
  'advice-and-guidance/get-a-quote/': 'Ask for a quote for the Educational Visits Advice and Guidance Service.',
  'stay/': 'Accommodation for up to 38 people in the South Pennines, for residential activity visits or groups running their own programme.',
  'courses-and-clubs/': 'Holiday clubs, summer activity courses and outdoor awards at the Castleshaw Centre.',
  'courses-and-clubs/holiday-clubs/': 'Holiday Activities and Food (HAF) and summer holiday clubs for Oldham children.',
  'courses-and-clubs/activity-courses/': 'Summer activity courses in canoeing, kayaking, climbing and more for young people.',
  'courses-and-clubs/outdoor-awards/': 'Duke of Edinburgh expedition training, paddlesport awards and outdoor qualifications.',
  'about/': 'The Castleshaw Centre: Oldham Council’s Outdoor and Environmental Education service since 1895.',
  'about/where-we-are/': 'Waterworks Road, Delph, Oldham, OL3 5LZ: at the edge of the Peak District National Park.',
  'about/where-we-are/around-the-valley/': 'Walks, rides and the Roman fort in and around the Castleshaw Valley.',
  'about/our-team/': 'The staff team at the Castleshaw Centre.',
  'about/accreditation/': 'AALA licence, LOtC Quality Badge, Adventuremark and inspection reports.',
  'about/what-people-say/': 'What schools, parents, youth groups and inspectors say about Castleshaw.',
  'about/history/': 'From the Oldham Poor Children’s Holiday Association in 1895 to today.',
  'about/news/': 'News from the Castleshaw Centre.',
  'contact/': 'Contact the Castleshaw Centre: 0161 770 8595.',
  'privacy/': 'How Oldham Council’s young people’s services use your information.',
}
