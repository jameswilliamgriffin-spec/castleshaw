import { useEffect, useState } from 'react'
import { PRIVACY } from '../data'
import './cookie-banner.css'

// A minimal cookie banner. The site needs no cookies to work, so the banner only exists
// once visitor statistics are switched on. STATS_ID is the Google Analytics measurement ID
// (G-…); VITE_GA_ID in Vercel overrides it. Empty: no banner and no statistics.
// Statistics load only after "Accept"; the choice is remembered on this device,
// and "Cookie settings" in the footer reopens the banner.
export const STATS_ID = import.meta.env.VITE_GA_ID || ''
const KEY = 'cs-cookies'
const read = () => { try { return localStorage.getItem(KEY) } catch { return null } }
const save = (v) => { try { localStorage.setItem(KEY, v) } catch { /* private mode: ask again next time */ } }

function loadStats() {
  if (window.__csStats || !STATS_ID) return
  window.__csStats = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  const s = document.createElement('script')
  s.async = true
  window.gtag('js', new Date())
  window.gtag('config', STATS_ID, { anonymize_ip: true })
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(STATS_ID)}`
  document.head.appendChild(s)
}

export function openCookieSettings() { window.dispatchEvent(new Event('cs-cookie-settings')) }

export default function CookieBanner() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!STATS_ID) return
    const choice = read()
    if (choice === 'yes') loadStats()
    else if (!choice) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener('cs-cookie-settings', reopen)
    return () => window.removeEventListener('cs-cookie-settings', reopen)
  }, [])
  if (!STATS_ID || !open) return null
  const choose = (v) => { save(v); setOpen(false); if (v === 'yes') loadStats() }
  return (
    <div className="ckb" role="region" aria-label="Cookies">
      <p>We&rsquo;d like to use cookies to see how people use this website. <a href={`${PRIVACY}#cookies`}>About cookies</a></p>
      <div className="ckb-btns">
        <button type="button" className="ckb-yes" onClick={() => choose('yes')}>Accept</button>
        <button type="button" className="ckb-no" onClick={() => choose('no')}>Reject</button>
      </div>
    </div>
  )
}
