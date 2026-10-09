const B = 'https://www.castleshawcentre.com'

export const PHONE = '0161 770 8595'
export const PHONE_HREF = 'tel:+441617708595'
export const FACEBOOK = 'https://www.facebook.com/castleshawcentre'
export const W3W = 'cherubs.campfires.liked'

export const NAV_MAIN = [
  ['What we do', `${B}/what-we-do.html`],
  ['Where we are', `${B}/where-we-are.html`],
  ['The Team', `${B}/the-team.html`],
  ['Accreditation', `${B}/accreditation.html`],
  ['Testimonials', `${B}/testimonials.html`],
]

export const NAV_ALL = [
  ['Welcome', './'],
  ['Where we are', `${B}/where-we-are.html`],
  ['What we do', `${B}/what-we-do.html`],
  ['The Team', `${B}/the-team.html`],
  ['Accreditation', `${B}/accreditation.html`],
  ['Testimonials', `${B}/testimonials.html`],
  ['Advice and Guidance', `${B}/advice-and-guidance.html`],
  ['Information for Group Leaders', `${B}/information-for-group-leaders.html`],
  ['Resources for Teachers', `${B}/resources-for-teachers.html`],
  ['Image Gallery: Hall of Fame', `${B}/image-gallery--hall-of-fame.html`],
  ['News', `${B}/news.html`],
  ['Holiday Activities 2026', `${B}/holiday-activities-2026.html`],
  ['Things to do', `${B}/things-to-do.html`],
  ['Nick Price 1958-2016', `${B}/nick-price-1958-2016.html`],
  ['Back in the day', `${B}/back-in-the-day.html`],
  ['Centre History', `${B}/centre-history.html`],
  ['Privacy Notice', `${B}/privacy-notice.html`],
]

// accent = the tone the page takes on; on = readable text colour on that tone
export const AREAS = [
  {
    id: 'land', title: 'Adventures on land', short: 'Land',
    img: '../shared/images/land-ghyll.jpg', pos: '50% 40%',
    accent: '#8dba08', on: '#14221a', tint: '#dbe9a8',
    text: 'Ghyll scrambling up Pennine streams, climbing, trekking and orienteering. Real hills, proper kit, and a team who know every wet rock.',
  },
  {
    id: 'water', title: 'Adventures in the water', short: 'Water',
    img: '../shared/images/water-consent.jpg', pos: '50% 45%',
    accent: '#0480bc', on: '#ffffff', tint: '#bfe4f7',
    text: 'Kayaking and canoeing on reservoir water. Wet suits, buoyancy aids, and a fair chance of getting wet whichever way up you finish.',
  },
  {
    id: 'bushcraft', title: 'Bushcraft', short: 'Bushcraft',
    img: '../shared/images/bushcraft-marshmallows.jpg', pos: '50% 50%',
    accent: '#e5832c', on: '#14221a', tint: '#f6d9b6',
    text: 'Light a fire, keep it going, and toast something over it. Sticks, knots and shelter-building for anyone who likes mud on their knees.',
  },
  {
    id: 'environment', title: 'Environmental Education', short: 'Environment',
    img: '../shared/images/environmental-education.jpg', pos: '50% 60%',
    accent: '#c1d284', on: '#14221a', tint: '#e6edc4',
    text: 'Habitats, river studies and mapwork on real ground. Children come back to school able to talk about what they found.',
  },
  {
    id: 'roman', title: 'Roman History Specialists', short: 'Romans',
    img: '../shared/images/roman-session.jpg', pos: '45% 40%',
    accent: '#b7342b', on: '#ffffff', tint: '#efc8c2',
    text: 'Helmets on, shields up, wooden swords out. A Roman day on the moor, with the Pennine hills standing in for the edge of the empire.',
  },
  {
    id: 'stay', title: 'Accommodation, catering and venue hire', short: 'Stay',
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

// Grouped for the menu and footer (v2): the same pages as NAV_ALL, sorted by what people come for
export const NAV_GROUPS = [
  ['Plan a visit', ['What we do', 'Where we are', 'Information for Group Leaders', 'Advice and Guidance', 'Resources for Teachers', 'Holiday Activities 2026', 'Things to do']],
  ['About the centre', ['The Team', 'Accreditation', 'Testimonials', 'Image Gallery: Hall of Fame', 'News', 'Centre History', 'Back in the day', 'Nick Price 1958-2016']],
]
export const navHref = (t) => (NAV_ALL.find(([n]) => n === t) || [])[1]
