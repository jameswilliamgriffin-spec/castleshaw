// Conversion events (enquiry sent, guide downloaded, phone tapped and so on). They go to
// Google Analytics once the visitor has accepted statistics (window.__csStats, set by
// CookieBanner), and to Plausible or Vercel Web Analytics if either is installed.
export function track(name, props = {}) {
  try {
    if (window.__csStats) window.gtag?.('event', name, props)
    window.plausible?.(name, { props })
    window.va?.('event', { name, ...props })
    if (import.meta.env.DEV) console.debug('[track]', name, props)
  } catch { /* analytics must never break the page */ }
}
