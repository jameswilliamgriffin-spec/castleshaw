import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import '@fontsource-variable/bricolage-grotesque/index.css'
import '@fontsource-variable/literata/index.css'
import './styles.css'
import './inner.css'
import Shell from './ui/inner/Shell'
import { PAGES, DESCRIPTIONS, TITLES } from './site.mjs'
import { HOME, reduced } from './lib'
import * as activities from './pages/activities'
import * as advice from './pages/advice'
import * as stay from './pages/stay'
import * as courses from './pages/courses'
import * as about from './pages/about'
import * as misc from './pages/misc'
import './ui/mobile.css'

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
  'advice-and-guidance/': advice.Landing,
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

const first = window.__PAGE
if (!REGISTRY[first]) console.error(`No page component for ${first}`)
if (!PAGES.some((p) => p.path === first)) console.error(`${first} is not in site.mjs`)

// The v2 path of a URL ('activities/bushcraft/'), or null if it isn't an inner page we draw here.
function pathOf(url) {
  const u = new URL(url, location.href)
  const home = new URL(HOME)
  if (u.origin !== home.origin || !u.pathname.startsWith(home.pathname)) return null
  let p = u.pathname.slice(home.pathname.length)
  if (p && !p.endsWith('/')) p += '/'
  return REGISTRY[p] ? p : null
}

function setHead(path) {
  const page = PAGES.find((p) => p.path === path)
  if (!page) return
  document.title = `${TITLES[path] || page.long || page.title} | Castleshaw Centre`
  document.querySelector('meta[name="description"]')?.setAttribute('content', DESCRIPTIONS[path] || '')
  window.__PAGE = path
}

// Pages in a section are tabs of one place: the links under the hero swap the page in
// place, crossfading, and keep the link bar where it was instead of jumping to the top.
function App() {
  const [path, setPath] = useState(first)

  useEffect(() => {
    const swap = (next, push) => {
      const bar = document.querySelector('.subnav')
      const keep = bar ? Math.max(0, bar.getBoundingClientRect().top) : 0
      const update = () => {
        flushSync(() => setPath(next))
        setHead(next)
        // a link in the open menu replaces the menu's history entry, so back goes to the previous page
        if (push) history[history.state?.csMenu ? 'replaceState' : 'pushState']({ path: next }, '', HOME + next)
        const nbar = document.querySelector('.subnav')
        if (nbar) {
          window.scrollTo(0, Math.max(0, nbar.getBoundingClientRect().top + scrollY - keep))
          const ul = nbar.querySelector('ul')
          const on = nbar.querySelector('[aria-current="page"]')
          if (ul && on) ul.scrollLeft = on.offsetLeft - (ul.clientWidth - on.offsetWidth) / 2
        }
        const h1 = document.querySelector('.ph-h1')
        if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }) }
      }
      if (document.startViewTransition && !reduced()) document.startViewTransition(update)
      else update()
    }

    const onClick = (e) => {
      const a = e.target.closest('.subnav a')
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const next = pathOf(a.href)
      if (!next) return // e.g. the advice landing page, which has its own entry
      e.preventDefault()
      if (next !== window.__PAGE) swap(next, true)
    }
    const onPop = () => {
      const next = pathOf(location.href)
      if (!next) location.reload()
      else if (next !== window.__PAGE) swap(next, false)
    }
    history.replaceState({ path: first }, '')
    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPop)
    return () => { document.removeEventListener('click', onClick); window.removeEventListener('popstate', onPop) }
  }, [])

  const Page = REGISTRY[path]
  return <Shell path={path}>{Page ? <Page key={path} path={path} /> : null}</Shell>
}

createRoot(document.getElementById('root')).render(<App />)

// The page is drawn after load, so the browser can't find a #section on its own.
if (location.hash.length > 1) {
  requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView())
}
