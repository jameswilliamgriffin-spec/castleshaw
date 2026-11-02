import { createRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque/index.css'
import '@fontsource-variable/literata/index.css'
import './styles.css'
import './inner.css'
import Shell from './ui/inner/Shell'
import { PAGES } from './site.mjs'
import * as activities from './pages/activities'
import * as advice from './pages/advice'
import * as stay from './pages/stay'
import * as courses from './pages/courses'
import * as about from './pages/about'
import * as misc from './pages/misc'

// Which component renders which path. Every page in site.mjs must appear here.
const REGISTRY = {
  'activities/': activities.Hub,
  'activities/adventure-on-land/': activities.Land,
  'activities/adventure-on-water/': activities.Water,
  'activities/bushcraft/': activities.Bushcraft,
  'activities/environmental-education/': activities.Environment,
  'activities/roman-history/': activities.History,
  'activities/team-building/': activities.Team,
  'activities/plan-your-visit/': activities.Plan,
  'advice-and-guidance/how-it-works/': advice.How,
  'advice-and-guidance/service-agreement/': advice.Agreement,
  'advice-and-guidance/who-its-for/': advice.Who,
  'advice-and-guidance/training/': advice.Training,
  'advice-and-guidance/emergency-support/': advice.Emergency,
  'advice-and-guidance/guidance-and-resources/': advice.Resources,
  'advice-and-guidance/our-advisers/': advice.Advisers,
  'advice-and-guidance/questions/': advice.Questions,
  'advice-and-guidance/get-a-quote/': advice.Quote,
  'stay/': stay.Stay,
  'courses-and-clubs/': courses.Hub,
  'courses-and-clubs/holiday-clubs/': courses.Clubs,
  'courses-and-clubs/activity-courses/': courses.ActivityCourses,
  'courses-and-clubs/outdoor-awards/': courses.Awards,
  'about/': about.Hub,
  'about/where-we-are/': about.Where,
  'about/where-we-are/around-the-valley/': about.Valley,
  'about/our-team/': about.Team,
  'about/accreditation/': about.Accreditation,
  'about/what-people-say/': about.Say,
  'about/history/': about.History,
  'about/news/': about.News,
  'contact/': misc.Contact,
  'privacy/': misc.Privacy,
}

const path = window.__PAGE
const Page = REGISTRY[path]
if (!Page) console.error(`No page component for ${path}`)
if (!PAGES.some((p) => p.path === path)) console.error(`${path} is not in site.mjs`)

createRoot(document.getElementById('root')).render(<Shell path={path}>{Page ? <Page path={path} /> : null}</Shell>)

// The page is drawn after load, so the browser can't find a #section on its own.
if (location.hash.length > 1) {
  requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView())
}
