// The v2 site map: one source of truth for the menu, footer, breadcrumbs, section
// navigation, page generation (scripts/gen-pages.mjs) and the build (vite.config.js).
// Paths are relative to the site root and always end in a slash.
import NEWS from './content/news.json' with { type: 'json' }

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
      { key: 'training', title: 'Training', path: 'advice-and-guidance/training/' },
    ],
    // the footer lists the landing page's main sections too, as shortcuts
    footer: [
      { key: 'how', title: 'How it works', path: 'advice-and-guidance/#how-it-works' },
      { key: 'included', title: 'What’s included', path: 'advice-and-guidance/#included' },
      { key: 'emergency', title: 'Emergency support', path: 'advice-and-guidance/#emergency' },
      { key: 'training', title: 'Training', path: 'advice-and-guidance/training/' },
      { key: 'quote', title: 'Get a quote', path: 'advice-and-guidance/#quote' },
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
    key: 'news', title: 'News', long: 'News from the centre', path: 'news/',
    blurb: 'What has been happening at Castleshaw.',
    children: [],
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
    ],
  },
]

export const EXTRA = [
  { key: 'contact', title: 'Contact us', path: 'contact/' },
  { key: 'privacy', title: 'Privacy notice', path: 'privacy/' },
  { key: 'accessibility', title: 'Accessibility statement', path: 'accessibility/' },
]

// Every page with its section, for breadcrumbs and generation.
// The homepage and the advice landing page have their own entries (index.html, advice.jsx).
export const PAGES = [
  ...SECTIONS.flatMap((s) => [
    { ...s, section: s.key, hub: true },
    ...s.children.map((c) => ({ ...c, section: s.key })),
  ]),
  // each news story is a page in the News section (not listed in the menus)
  ...NEWS.map((n) => ({ key: 'news-' + n.slug, title: n.title, long: n.title, path: `news/${n.slug}/`, section: 'news', post: n.slug })),
  ...EXTRA.map((e) => ({ ...e, section: e.key })),
]

export { NEWS }

// Pages with their own entry file instead of a generated one (none at present).
export const CUSTOM_ENTRY = new Set()

// Page titles that need more than the menu label, for search results.
export const TITLES = {
  'advice-and-guidance/': 'Educational visits advice and guidance for schools, Oldham',
}

// The hero image each page should preload, so the browser fetches it before the page's script runs:
// { slot } for a generated image (content/imagery.json), { photo } for a site photo (its WebP sizes,
// scripts/responsive.py). Keep in step with the hero image on each page. News stories are added
// automatically from their own photos (scripts/gen-pages.mjs).
export const PRELOAD = {
  'advice-and-guidance/': { slot: 'advice-landing-hero' },
  'courses-and-clubs/': { slot: 'courses-hub-hero' },
  'about/': { photo: 'shared/images/site/history-building-now.jpg' },
  'about/accreditation/': { photo: 'shared/images/site/land-abseil-2.jpg' },
  'about/history/': { photo: 'shared/images/site/history-postcard.jpg' },
  'about/our-team/': { photo: 'shared/images/site/team-joseph-2.jpg' },
  'about/what-people-say/': { photo: 'shared/images/gallery/g-6315479.jpg' },
  'about/where-we-are/': { photo: 'shared/images/site/valley-reservoir.jpg' },
  'about/where-we-are/around-the-valley/': { photo: 'shared/images/site/valley-obelisk.jpg' },
  'activities/': { photo: 'shared/images/site/water-canoe-reflect.jpg' },
  'activities/adventure-on-land/': { photo: 'shared/images/site/land-ghyll-waterfall.jpg' },
  'activities/adventure-on-water/': { photo: 'shared/images/site/water-kayak-green.jpg' },
  'activities/bushcraft/': { photo: 'shared/images/bushcraft-marshmallows.jpg' },
  'activities/environmental-education/': { photo: 'shared/images/site/env-stream.jpg' },
  'activities/plan-your-visit/': { photo: 'shared/images/site/bring-muddy.jpg' },
  'activities/roman-history/': { photo: 'shared/images/site/roman-shields.jpg' },
  'activities/team-building/': { photo: 'shared/images/site/team-rope.jpg' },
  'advice-and-guidance/training/': { photo: 'shared/images/site/advice-owc.jpg' },
  'contact/': { photo: 'shared/images/site/stay-front.jpg' },
  'courses-and-clubs/activity-courses/': { photo: 'shared/images/site/course-caving.jpg' },
  'courses-and-clubs/holiday-clubs/': { photo: 'shared/images/site/club-group.jpg' },
  'courses-and-clubs/outdoor-awards/': { photo: 'shared/images/site/award-dofe-group.jpg' },
  'stay/': { photo: 'shared/images/site/stay-front.jpg' },
}

export const DESCRIPTIONS = {
  'activities/': 'Adventurous activities, environmental education, bushcraft, Roman history and team building days for schools and groups at the Castleshaw Centre, Delph.',
  'activities/adventure-on-land/': 'Ghyll scrambling, rock climbing, abseiling, caving, hill walking and orienteering in the South Pennines.',
  'activities/adventure-on-water/': 'Kayaking, canoeing, rafted canoeing, raft building and stand up paddleboarding on Pennine reservoir water.',
  'activities/bushcraft/': 'Shelter building, fire lighting and campcraft with qualified bushcraft instructors.',
  'activities/environmental-education/': 'Primary science and geography days and secondary field studies in the Castleshaw Valley.',
  'activities/roman-history/': 'Roman fort days, the Industrial Revolution, Victorian Delph and local history trails.',
  'activities/team-building/': 'Team building for primary classes, secondary groups and adult away days.',
  'activities/plan-your-visit/': 'Booking, what to bring, information for group leaders and free resources for teachers.',
  'advice-and-guidance/': 'Educational visit sign-off, Evolve, EVC training and a 24/7 critical incident line for schools, academies, trusts, colleges and youth services, from Oldham Council’s advisers at the Castleshaw Centre.',
  'advice-and-guidance/training/': 'EVC, Visit Leader, MoVE, First Aid and MiDAS training for school and youth staff.',
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
  'news/': 'News from the Castleshaw Centre, Delph: people, projects and what has been happening.',
  'contact/': 'Contact the Castleshaw Centre: 0161 770 8595.',
  'privacy/': 'How Oldham Council’s young people’s services and this website use your information, and the cookies we use.',
  'accessibility/': 'How accessible the Castleshaw Centre website is, and how to report a problem.',
}
