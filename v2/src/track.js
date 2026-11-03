// Conversion events. Sends to whichever cookieless analytics the live site uses
// (Plausible or Vercel Web Analytics); does nothing if neither is installed.
export function track(name, props = {}) {
  try {
    window.plausible?.(name, { props })
    window.va?.('event', { name, ...props })
    if (import.meta.env.DEV) console.debug('[track]', name, props)
  } catch { /* analytics must never break the page */ }
}
