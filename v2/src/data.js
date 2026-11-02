import { HOME } from './lib'
import { SECTIONS } from './site.mjs'

export const PHONE = '0161 770 8595'
export const PHONE_HREF = 'tel:+441617708595'
export const FACEBOOK = 'https://www.facebook.com/castleshawcentre'
export const W3W = 'cherubs.campfires.liked'

export const EMAIL = 'castleshaw.centre@oldham.gov.uk'
export const INCIDENT = '0161 633 1803'
export const INCIDENT_HREF = 'tel:+441616331803'
export const ADDRESS = ['Waterworks Road', 'Delph', 'Oldham', 'OL3 5LZ']

// Navigation, built from the site map in site.mjs. Links are relative to the current page.
export const href = (path) => HOME + path
export const NAV_MAIN = SECTIONS.map((s) => [s.title, href(s.path)])
export const NAV_SECTIONS = SECTIONS.map((s) => ({ ...s, href: href(s.path), children: s.children.map((c) => ({ ...c, href: href(c.path) })) }))
export const PRIVACY = href('privacy/')
export const CONTACT = href('contact/')

// accent = the tone the page takes on; on = readable text colour on that tone
export const AREAS = [
  {
    id: 'land', page: 'activities/adventure-on-land/', title: 'Adventures on land', short: 'Land',
    img: '../shared/images/land-ghyll.jpg', pos: '50% 40%',
    accent: '#8dba08', on: '#14221a', tint: '#dbe9a8',
    text: 'Ghyll scrambling up Pennine streams, climbing, trekking and orienteering. Real hills, proper kit, and a team who know every wet rock.',
  },
  {
    id: 'water', page: 'activities/adventure-on-water/', title: 'Adventures in the water', short: 'Water',
    img: '../shared/images/water-consent.jpg', pos: '50% 45%',
    accent: '#0480bc', on: '#ffffff', tint: '#bfe4f7',
    text: 'Kayaking and canoeing on reservoir water. Wet suits, buoyancy aids, and a fair chance of getting wet whichever way up you finish.',
  },
  {
    id: 'bushcraft', page: 'activities/bushcraft/', title: 'Bushcraft', short: 'Bushcraft',
    img: '../shared/images/bushcraft-marshmallows.jpg', pos: '50% 50%',
    accent: '#e5832c', on: '#14221a', tint: '#f6d9b6',
    text: 'Light a fire, keep it going, and toast something over it. Sticks, knots and shelter-building for anyone who likes mud on their knees.',
  },
  {
    id: 'environment', page: 'activities/environmental-education/', title: 'Environmental Education', short: 'Environment',
    img: '../shared/images/environmental-education.jpg', pos: '50% 60%',
    accent: '#c1d284', on: '#14221a', tint: '#e6edc4',
    text: 'Habitats, river studies and mapwork on real ground. Children come back to school able to talk about what they found.',
  },
  {
    id: 'roman', page: 'activities/roman-history/', title: 'Roman History Specialists', short: 'Romans',
    img: '../shared/images/roman-session.jpg', pos: '45% 40%',
    accent: '#b7342b', on: '#ffffff', tint: '#efc8c2',
    text: 'Helmets on, shields up, wooden swords out. A Roman day on the moor, with the Pennine hills standing in for the edge of the empire.',
  },
  {
    id: 'stay', page: 'stay/', title: 'Accommodation, catering and venue hire', short: 'Stay',
    img: '../shared/images/centre-building.jpg', pos: '40% 40%',
    accent: '#bfe4f7', on: '#14221a', tint: '#e3f2fa',
    text: 'Self-catering accommodation for small groups, a hall with AV and IT facilities, and meals if you would rather someone else did the cooking.',
  },
]

export const AGES = [
  ['early', 'Reception to Year 2'],
  ['primary', 'Years 3 to 6'],
  ['secondary', 'Secondary'],
  ['mixed', 'Mixed ages or adults'],
]
export const WHO = [
  ['school', 'A school class'],
  ['youth', 'A youth group'],
  ['family', 'Family and friends'],
]
export const LENGTH = [
  ['day', 'A day visit'],
  ['nights', 'A residential stay'],
]
export const BY_AGE = {
  early: ['environment', 'bushcraft', 'roman', 'land'],
  primary: ['roman', 'land', 'environment', 'water'],
  secondary: ['land', 'water', 'bushcraft'],
  mixed: ['land', 'water', 'bushcraft', 'environment'],
}

// Real words from the Testimonials and Accreditation pages
export const QUOTES = [
  { t: 'Best day Ever!', by: 'A parent, after the Summer Holiday Club', big: true },
  { t: 'One of the highlights was jumping in puddles! Something that they are often prevented from doing but because of appropriate outdoor clothing it was not a problem.', by: 'Thorp Primary, Year 1' },
  { t: 'Excellent trip as always. Very patient with reception children!', by: 'St Annes RC Greenacres' },
  { t: 'The children made lots of progress in maps in a short space of time.', by: 'St Hugh’s C of E Primary, Year 4' },
  { t: 'Your enthusiasm and passion for outdoor activity and children shine through.', by: 'A parent' },
  { t: 'The centre has a welcoming and friendly feel to those staying, and the consistent staff team contributes positively to the experience.', by: 'LOtC inspection, November 2023' },
]

// Hall of Fame pieces for the postbag (children's drawings and letters only, no faces)
export const POSTBAG = [
  { k: 'q', i: 0 },
  { k: 'img', src: '../shared/images/gallery/g-6315479.jpg', alt: 'A painting of hills, a stream and a bridge with the words Thank you Rod' },
  { k: 'q', i: 1 },
  { k: 'img', src: '../shared/images/gallery/g-5743290.jpg', alt: 'A hand-made poster: Castleshaw Centre, it is amazing, have a lovely walk with friends' },
  { k: 'q', i: 3 },
  { k: 'img', src: '../shared/images/gallery/g-7160946.jpg', alt: 'A colourful drawing of a rainbow over a hill' },
  { k: 'q', i: 2 },
  { k: 'img', src: '../shared/images/gallery/g-3478808.jpg', alt: 'A typed thank-you letter from Year 6 pupils about canoeing, climbing and orienteering' },
  { k: 'q', i: 4 },
  { k: 'img', src: '../shared/images/gallery/g-8159649.jpg', alt: 'A drawing of a goat beside a gate' },
  { k: 'q', i: 5 },
  { k: 'img', src: '../shared/images/gallery/g-2127949.jpg', alt: 'A drawing of a green hill with a gateway and the word Castleshaw' },
]
