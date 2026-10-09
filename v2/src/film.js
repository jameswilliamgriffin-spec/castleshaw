// Scroll-scrubbed film: a WebP frame sequence painted to a canvas.
// Frames load progressively (every 8th, then 4th, 2nd, all) so scrubbing works
// almost immediately and gets smoother as the rest arrive. Missing frames fall
// back to the nearest loaded one, so it never shows a blank.

export function filmSource() {
  const small = matchMedia('(max-width: 760px)').matches
  return { dir: small ? 'mobile' : 'desktop' }
}

export function prefersStills() {
  const c = navigator.connection
  // only genuinely constrained connections; Chrome's early estimates can read '3g' on fast links
  const slow = !!c && (c.saveData || c.effectiveType === 'slow-2g' || c.effectiveType === '2g')
  return slow || matchMedia('(prefers-reduced-motion: reduce)').matches
}

export class Film {
  constructor(canvas, manifest, base) {
    this.cv = canvas
    this.ctx = canvas.getContext('2d', { alpha: false })
    this.m = manifest
    this.base = base
    this.frames = new Array(manifest.count)
    this.want = 0
    this.cur = 0
    this.drawn = -1
    this.started = false
    this.resize()
  }

  url(i) { return `${this.base}/${this.m.prefix}${String(i + 1).padStart(4, '0')}.${this.m.ext}` }

  load() {
    if (this.started) return
    this.started = true
    const order = []
    const seen = new Set()
    for (const step of [16, 8, 4, 2, 1]) for (let i = 0; i < this.m.count; i += step) if (!seen.has(i)) { seen.add(i); order.push(i) }
    let next = 0
    const pump = () => {
      if (next >= order.length) return
      const i = order[next++]
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => { (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => { this.frames[i] = img; if (i === 0 || Math.abs(i - Math.round(this.cur)) < 20) this.drawn = -1; pump() }) }
      img.onerror = pump
      img.src = this.url(i)
    }
    for (let k = 0; k < 6; k++) pump() // six requests in flight
  }

  nearest(i) {
    if (this.frames[i]) return this.frames[i]
    for (let d = 1; d < this.m.count; d++) {
      if (this.frames[i - d]) return this.frames[i - d]
      if (this.frames[i + d]) return this.frames[i + d]
    }
    return null
  }

  resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    const w = Math.round(this.cv.clientWidth * dpr), h = Math.round(this.cv.clientHeight * dpr)
    if (w && h && (this.cv.width !== w || this.cv.height !== h)) { this.cv.width = w; this.cv.height = h; this.drawn = -1 }
  }

  // progress 0..1 -> frame; eased toward the target for smooth scrubbing
  set(p) { this.want = Math.max(0, Math.min(1, p)) * (this.m.count - 1) }

  tick() {
    this.cur += (this.want - this.cur) * 0.18
    if (Math.abs(this.want - this.cur) < 0.01) this.cur = this.want
    const i = Math.round(this.cur)
    if (i === this.drawn) return
    const img = this.nearest(i)
    if (!img) return
    // cover-fit, centred: matches the SVG illustration (xMidYMid slice) exactly
    const { width: W, height: H } = this.cv
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight)
    const w = img.naturalWidth * s, h = img.naturalHeight * s
    this.ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h)
    this.drawn = this.frames[i] ? i : -1
    if (!this.ready) { this.ready = true; this.cv.classList.add('ready') }
  }
}
