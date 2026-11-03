import M from '../../content/imagery.json'
import { ROOT } from '../../lib'

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
