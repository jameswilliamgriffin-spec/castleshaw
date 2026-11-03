import { useEffect, useMemo, useRef } from 'react'
import { SHAPES } from './shapes'
import { Squiggle, useReveal } from '../Squiggle'
import { reduced } from '../../lib'
import { SlotImg } from '../inner/Slot'
import './shapes.css'

const FLOATS = ['circle', 'blob', 'squiggle']

// Photos in organic shapes, with optional depth behind and a small accent floating nearby.
//   shape     one of SHAPES (blob-1 … blob-9, pebble-wide, circle, arch, soft)
//   backdrop  'none' | 'offset' | 'ring' | 'dots'
//   accent    'lime' | 'pale-blue' | 'navy'
//   offset    'br' | 'bl' | 'tr' | 'tl', where the backdrop peeks out
//   float     true, or 'circle' | 'blob' | 'squiggle', for a floating accent
//   aspect    '4/5', '1/1', '16/10' …
// picture: a manifest slot (slot() in ui/inner/Slot.jsx), drawn as a responsive <picture>.
export default function ShapedImage({
  src, alt = '', shape = 'blob-1', backdrop = 'none', accent = 'lime', offset = 'br',
  float = false, floatAt, aspect = '4/5', pos, shadow = false, depth = false,
  priority = false, width = 1200, height = 1500, className = '', style, caption, picture,
}) {
  if (picture) src = picture.src
  const ref = useReveal()
  const floatRef = useRef(null)
  const name = SHAPES[shape] ? shape : 'blob-1'
  const sibling = useMemo(() => {
    const blobs = Object.keys(SHAPES).filter((k) => k.startsWith('blob-'))
    return blobs[(blobs.indexOf(name) + 3 + blobs.length) % blobs.length] || 'blob-4'
  }, [name])
  const floatKind = float === true ? FLOATS[(name.length + src.length) % FLOATS.length] : float
  const at = floatAt || { br: 'tl', bl: 'tr', tr: 'bl', tl: 'br' }[offset]
  // Each floating accent drifts on its own timing, so no two move in step.
  const drift = useMemo(() => ({
    '--fd': `${(6 + Math.random() * 3).toFixed(2)}s`,
    '--fdl': `${(-Math.random() * 6).toFixed(2)}s`,
    '--fy': `${(8 + Math.random() * 4).toFixed(1)}px`,
    '--fr': `${(1.5 + Math.random() * 2.5).toFixed(1)}deg`,
  }), [])

  // A gentle parallax on the floating accent: a few per cent against the page.
  useEffect(() => {
    const el = floatRef.current
    if (!el || reduced()) return
    let raf = 0, live = false
    const tick = () => {
      raf = 0
      const r = el.parentElement.getBoundingClientRect()
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - innerHeight / 2) * -0.05).toFixed(1)}px, 0)`
    }
    const onScroll = () => { if (live && !raf) raf = requestAnimationFrame(tick) }
    const io = new IntersectionObserver(([e]) => { live = e.isIntersecting; if (live) onScroll() })
    io.observe(el.parentElement)
    addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [floatKind])

  const clip = `var(--shape-${name})`
  return (
    <figure
      ref={ref}
      className={`shp shp--${backdrop} shp--o-${offset} shp--${accent}${shadow ? ' shp--shadowed' : ''} ${className}`}
      style={{ '--ar': aspect, ...style }}
    >
      <span className="shp-stage">
        {backdrop === 'offset' && depth && <span className="shp-back shp-back2" style={{ '--clip': `var(--shape-${sibling})` }} aria-hidden="true" />}
        {backdrop === 'offset' && <span className="shp-back" style={{ '--clip': clip }} aria-hidden="true" />}
        {backdrop === 'ring' && (
          <svg className="shp-ring" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
            <path d={SHAPES[name]} vectorEffect="non-scaling-stroke" />
          </svg>
        )}
        {backdrop === 'dots' && (
          <svg className="shp-dots" viewBox="0 0 60 60" aria-hidden="true">
            {[[6, 6], [24, 6], [42, 6], [6, 24], [24, 24], [6, 42], [42, 24], [24, 42]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4" />)}
          </svg>
        )}
        <span className="shp-lift">
          <span className="shp-mask" style={{ '--clip': clip }}>
            {picture
              ? <picture><SlotImg s={picture} priority={priority} className="shp-img" /></picture>
              : <img className="shp-img" src={src} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" style={pos ? { objectPosition: pos } : undefined} />}
          </span>
        </span>
        {floatKind && (
          <span className={`shp-float shp-at-${at}`} ref={floatRef} aria-hidden="true">
            <span className={`shp-float-in shp-f-${floatKind}`} style={drift}>
              {floatKind === 'blob' && <span className="shp-f-blob-in" style={{ '--clip': `var(--shape-${sibling})` }} />}
              {floatKind === 'squiggle' && <Squiggle i={name.length} className="shp-f-sq" />}
            </span>
          </span>
        )}
      </span>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
