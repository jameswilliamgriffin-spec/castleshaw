// Vercel serverless function: receives the enquiry form and emails it to the centre.
//
// Not yet live. The site's forms only post here once VITE_ENQUIRY_ENDPOINT=/api/enquiry is
// set at build time. Until then they run as a preview and send nothing.
//
// To switch it on (see content/OPEN-QUESTIONS.md, "Enquiry form email"):
//   1. Sign up for GOV.UK Notify (free for councils) and create an email template with
//      ((name)), ((org)), ((role)), ((email)), ((phone)), ((type)), ((message)), ((guide)), ((source)).
//   2. In Vercel, set NOTIFY_API_KEY, NOTIFY_TEMPLATE_ID and ENQUIRY_TO (the centre's inbox),
//      and VITE_ENQUIRY_ENDPOINT=/api/enquiry, then redeploy.
// Another mail service (Resend, Postmark, Microsoft 365 via Power Automate) can replace send().

import { createHmac } from 'node:crypto'

const FIELDS = ['name', 'org', 'role', 'email', 'phone', 'type', 'message', 'guide', 'source']
const recent = new Map() // best-effort rate limit per warm instance: 5 a minute per address

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { NOTIFY_API_KEY, NOTIFY_TEMPLATE_ID, ENQUIRY_TO } = process.env
  if (!NOTIFY_API_KEY || !NOTIFY_TEMPLATE_ID || !ENQUIRY_TO) return res.status(503).json({ error: 'Enquiries are not set up yet' })

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  const now = Date.now()
  const hits = (recent.get(ip) || []).filter((t) => now - t < 60_000)
  if (hits.length >= 5) return res.status(429).json({ error: 'Too many enquiries, please try again shortly' })
  recent.set(ip, [...hits, now])

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
  // Spam: the hidden "website" field filled in, or the form sent within three seconds.
  if (body.website || Number(body.elapsed) < 3000) return res.status(200).json({ ok: true })

  const data = Object.fromEntries(FIELDS.map((k) => [k, String(body[k] ?? '').slice(0, k === 'message' ? 4000 : 200).trim()]))
  if (!data.name || !data.org || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return res.status(400).json({ error: 'Missing name, organisation or a valid email' })

  try {
    await send({ key: NOTIFY_API_KEY, template: NOTIFY_TEMPLATE_ID, to: ENQUIRY_TO, data })
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('enquiry send failed', e.message)
    return res.status(502).json({ error: 'Could not send' })
  }
}

// GOV.UK Notify: the API key ends with the service id and secret (36 characters each).
async function send({ key, template, to, data }) {
  const service = key.slice(-73, -37), secret = key.slice(-36)
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const head = b64({ typ: 'JWT', alg: 'HS256' }), claims = b64({ iss: service, iat: Math.floor(Date.now() / 1000) })
  const sig = createHmac('sha256', secret).update(`${head}.${claims}`).digest('base64url')
  const r = await fetch('https://api.notifications.service.gov.uk/v2/notifications/email', {
    method: 'POST',
    headers: { Authorization: `Bearer ${head}.${claims}.${sig}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email_address: to, template_id: template, personalisation: { ...data, phone: data.phone || 'Not given', message: data.message || 'None', guide: data.guide ? 'Yes' : 'No' } }),
  })
  if (!r.ok) throw new Error(`Notify ${r.status}`)
}
