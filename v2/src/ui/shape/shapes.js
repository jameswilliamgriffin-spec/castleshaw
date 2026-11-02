// The image shape library. Each organic shape is a handful of anchor points, smoothed
// into a closed curve (Catmull-Rom to cubic Bézier, so there are no corners) and then
// normalised to fill a 0–1 box. They are used as <clipPath clipPathUnits="objectBoundingBox">,
// so one path fits any image size. CSS refers to them by token: var(--shape-blob-3).

const POINTS = {
  'blob-1': [[.5, .02], [.86, .12], [.98, .5], [.84, .9], [.42, .98], [.08, .78], [.04, .32]], // round-ish
  'blob-2': [[.42, 0], [.78, .08], [.96, .38], [.9, .78], [.6, 1], [.22, .92], [.04, .6], [.12, .2]], // tall, leaning left
  'blob-3': [[.48, 0], [.76, .16], [.86, .5], [.98, .8], [.6, 1], [.12, .92], [.06, .6], [.22, .2]], // pear
  'blob-4': [[.22, .04], [.66, 0], [.96, .22], [1, .6], [.8, .94], [.5, .9], [.2, .98], [0, .62]], // bean, a soft dent below
  'blob-5': [[.1, .06], [.62, 0], [.96, .14], [1, .6], [.86, .94], [.36, 1], [.02, .82], [0, .36]], // squarish pebble
  'blob-6': [[.36, .02], [.84, 0], [1, .3], [.92, .72], [.62, 1], [.16, .94], [0, .62], [.1, .22]], // leaning right
  'blob-7': [[.56, 0], [.92, .2], [.98, .6], [.7, .94], [.3, 1], [.04, .7], [.16, .24]], // tilted egg
  'blob-8': [[.04, .2], [.4, .02], [.9, .06], [1, .48], [.82, .92], [.38, 1], [.04, .72]], // stone, flatter top
  'blob-9': [[.5, .04], [.86, .02], [1, .4], [.9, .78], [.58, 1], [.18, .92], [0, .56], [.14, .16]], // gentle wobble
  'pebble-wide': [[.08, .24], [.42, .02], [.82, .04], [1, .4], [.9, .82], [.5, 1], [.12, .9], [0, .56]], // for wide images
}

const fixed = (n) => +n.toFixed(4)

function smooth(pts) {
  const n = pts.length
  const segs = []
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n]
    segs.push([p1, [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6], p2])
  }
  // Fit the curve's true extent to the 0–1 box, so the image fills its frame.
  let x0 = 1, y0 = 1, x1 = 0, y1 = 0
  for (const [a, b, c, d] of segs) {
    for (let t = 0; t <= 1; t += 0.02) {
      const u = 1 - t
      const x = u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0]
      const y = u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1]
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y)
    }
  }
  const f = ([x, y]) => `${fixed((x - x0) / (x1 - x0))} ${fixed((y - y0) / (y1 - y0))}`
  return `M${f(segs[0][0])}` + segs.map(([, b, c, d]) => ` C${f(b)} ${f(c)} ${f(d)}`).join('') + ' Z'
}

export const SHAPES = {
  ...Object.fromEntries(Object.entries(POINTS).map(([k, p]) => [k, smooth(p)])),
  circle: 'M.5 0 A.5 .5 0 1 1 .5 1 A.5 .5 0 1 1 .5 0 Z',
  // Kept for the odd doorway or building, not the default.
  arch: 'M0 .5 A.5 .5 0 0 1 1 .5 L1 .97 Q1 1 .97 1 L.03 1 Q0 1 0 .97 Z',
  // Documents, maps and drawings: a soft rectangle that never crops their edges.
  soft: 'M.04 0 L.96 0 Q1 0 1 .04 L1 .96 Q1 1 .96 1 L.04 1 Q0 1 0 .96 L0 .04 Q0 0 .04 0 Z',
}

export const BLOBS = Object.keys(POINTS).filter((k) => k.startsWith('blob-'))
export const SHAPE_NAMES = Object.keys(SHAPES)

// One hidden <svg> of clip paths for the whole page, added once.
if (typeof document !== 'undefined' && !document.getElementById('shape-defs')) {
  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  svg.id = 'shape-defs'
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden'
  const defs = document.createElementNS(ns, 'defs')
  for (const [name, d] of Object.entries(SHAPES)) {
    const cp = document.createElementNS(ns, 'clipPath')
    cp.id = `shp-${name}`
    cp.setAttribute('clipPathUnits', 'objectBoundingBox')
    const path = document.createElementNS(ns, 'path')
    path.setAttribute('d', d)
    cp.appendChild(path)
    defs.appendChild(cp)
  }
  svg.appendChild(defs)
  document.body.prepend(svg)
}

// A small, stable hash, so a given photo always gets the same shape and colour.
export function pick(key, list, salt = 0) {
  let h = 2166136261 ^ salt
  for (let i = 0; i < key.length; i++) h = Math.imul(h ^ key.charCodeAt(i), 16777619)
  return list[Math.abs(h) % list.length]
}
