// A very small WebGL helper: one full-screen triangle and a fragment shader.
// Each shader runs only while its element is on screen, and draws a single frame under reduced motion.
import { reduced } from './lib'

const VERT = 'attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}'

export const NOISE = `
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
`

export function makeGL(canvas, frag, { scale = 1 } = {}) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
  if (!gl) return null
  const sh = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s)
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null }
    return s
  }
  const vs = sh(gl.VERTEX_SHADER, VERT), fs = sh(gl.FRAGMENT_SHADER, 'precision mediump float;varying vec2 vUv;' + frag)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null
  gl.useProgram(prog)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const cache = {}
  const u = (n) => (n in cache ? cache[n] : (cache[n] = gl.getUniformLocation(prog, n)))
  const size = { w: 1, h: 1, dpr: 1 }
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5) * scale
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h) }
    Object.assign(size, { w, h, dpr })
  }
  return {
    gl, u, size,
    draw(set) { resize(); set && set(gl, u, size); gl.drawArrays(gl.TRIANGLES, 0, 3) },
    texture(img) {
      const t = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, t)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
      return t
    },
    destroy() { gl.getExtension('WEBGL_lose_context')?.loseContext() },
  }
}

// Run frame(t) every animation frame while el is visible. Returns a stop function.
export function whileVisible(el, frame) {
  if (reduced()) { requestAnimationFrame(() => frame(4)); return () => {} }
  let raf = 0, on = false
  const t0 = performance.now()
  const tick = (now) => { frame((now - t0) / 1000); raf = requestAnimationFrame(tick) }
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !on) { on = true; raf = requestAnimationFrame(tick) }
    else if (!e.isIntersecting && on) { on = false; cancelAnimationFrame(raf) }
  }, { rootMargin: '100px' })
  io.observe(el)
  return () => { io.disconnect(); cancelAnimationFrame(raf) }
}
