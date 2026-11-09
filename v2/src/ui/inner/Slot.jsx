import M from '../../content/imagery.json'
import { ROOT } from '../../lib'
import RS from '../../content/responsive.json'

// Imagery slots: each place on the site that shows a manifest image (content/imagery.json).
// slot(id) gives everything a <picture> needs: AVIF, WebP and JPEG srcsets, size, alt and crop.
const base = (iid) => `${ROOT}shared/images/gen/${iid}`
const set = (iid, ext) => M.images[iid].widths.map((w) => `${base(iid)}-${w}.${ext} ${w}w`).join(', ')

export function slot(id, n = 0) {
  const s = M.slots[id]
  const iid = s.images ? s.images[n] : s.image
  const im = M.images[iid]
  return {
    id, iid, source: im.source,
    src: `${base(iid)}-${im.widths[im.widths.length - 1]}.jpg`,
    avif: set(iid, 'avif'), webp: set(iid, 'webp'), jpg: set(iid, 'jpg'),
    width: im.w, height: im.h,
    alt: Array.isArray(s.alt) ? s.alt[n] : s.alt,
    pos: s.pos, posMobile: s.posMobile, sizes: s.sizes || '100vw',
  }
}

export const slotHref = (id, w) => { const s = slot(id); return { href: `${base(s.iid)}-${w}.avif`, srcset: s.avif, sizes: s.sizes } }

// The <img> part, shared by <Picture> and ShapedImage. Decorative images (empty alt) are hidden from screen readers.
export function SlotImg({ s, sizes, priority = false, className = '' }) {
  return (
    <>
      <source type="image/avif" srcSet={s.avif} sizes={sizes || s.sizes} />
      <source type="image/webp" srcSet={s.webp} sizes={sizes || s.sizes} />
      <img
        className={`slot-img ${className}`} src={s.src} srcSet={s.jpg} sizes={sizes || s.sizes}
        width={s.width} height={s.height} alt={s.alt} aria-hidden={s.alt ? undefined : true}
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async"
        style={{ '--pos': s.pos || '50% 50%', '--pos-m': s.posMobile || s.pos || '50% 50%' }}
      />
    </>
  )
}

export function Picture({ slot: id, n, sizes, priority, className = '', imgClassName = '' }) {
  return <picture className={`slot ${className}`}><SlotImg s={slot(id, n)} sizes={sizes} priority={priority} className={imgClassName} /></picture>
}

// Phone- and tablet-sized WebP copies of a site photo (scripts/responsive.py), as a srcset,
// or Sanity's own sizes for a Sanity photo; null for anything else (generated images, logos, other sites' images).
export function responsive(src) {
  // a photo from Sanity: its image service makes the sizes
  if (src && src.startsWith('https://cdn.sanity.io/')) {
    const u = src.split('?')[0]
    return [480, 960].map((w) => `${u}?w=${w}&fit=max&auto=format&q=75 ${w}w`).join(', ')
  }
  if (!src || !src.startsWith(ROOT)) return null
  const rel = src.slice(ROOT.length).split('?')[0]
  const m = RS[rel]
  if (!m) return null
  const stem = rel.slice('shared/images/'.length).replace(/\.[a-z]+$/i, '')
  return m.widths.map((w) => `${ROOT}shared/images/rs/${stem}-${w}.webp ${w}w`).join(', ')
}

// The address of one WebP copy of a site photo, the smallest at least `want` pixels wide
// (or the largest there is), for code that loads an image itself, such as a WebGL texture.
export function responsiveUrl(src, want = 960) {
  if (!src || !src.startsWith(ROOT)) return src
  const rel = src.slice(ROOT.length).split('?')[0]
  const m = RS[rel]
  if (!m) return src
  const w = m.widths.find((x) => x >= want) || m.widths[m.widths.length - 1]
  return `${ROOT}shared/images/rs/${rel.slice('shared/images/'.length).replace(/\.[a-z]+$/i, '')}-${w}.webp`
}

// A site photo with its WebP sizes offered first; the original JPEG stays as the fallback.
// Same props as <img>, plus sizes (how wide it is shown).
export function Photo({ src, sizes = '(max-width: 599px) 92vw, 50vw', ...img }) {
  const set = responsive(src)
  if (!set) return <img src={src} {...img} />
  return (
    <picture className="photo">
      <source type="image/webp" srcSet={set} sizes={sizes} />
      <img src={src} {...img} />
    </picture>
  )
}
