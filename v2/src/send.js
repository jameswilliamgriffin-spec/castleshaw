// Sends a website form to the centre's inbox through Web3Forms (web3forms.com).
// The access key is tied to castleshaw.centre@oldham.gov.uk: every submission is emailed there,
// and it can't send anywhere else, so it is safe to keep in the page. To send to a different
// inbox, create a new key for that address on web3forms.com and replace it here.
export const WEB3FORMS_KEY = '461804ff-d278-4d1a-be98-a45c41e2003f'

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim())

// fields: { 'Label shown in the email': value }. Empty values are left out.
// replyTo: the sender's email, so replying to the email answers them.
export async function sendForm(fields, { subject, replyTo } = {}) {
  const body = {
    access_key: WEB3FORMS_KEY,
    subject: subject || 'Website enquiry',
    from_name: 'Castleshaw Centre website',
    ...(isEmail(replyTo) ? { replyto: String(replyTo).trim() } : {}),
    ...Object.fromEntries(Object.entries(fields).filter(([, v]) => String(v ?? '').trim())),
  }
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  })
  const out = await res.json().catch(() => ({}))
  if (!res.ok || out.success === false) throw new Error(out.message || `Web3Forms answered ${res.status}`)
}

// Which page a form was sent from, for the email.
export const pageName = () => (/\/(index\.html)?$/.test(location.pathname) && !/\/[^/]+\/$/.test(location.pathname) ? 'Homepage' : (document.title || '').replace(/ \| Castleshaw Centre$/, '')) + ' (' + location.pathname + ')'
