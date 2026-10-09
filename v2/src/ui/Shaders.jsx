import { useEffect, useRef } from 'react'
import { makeGL, whileVisible, NOISE } from '../gl'
import { fine } from '../lib'

// 1. Hero sky: slow clouds and a warm glow that sits behind the sun.
const SKY = `uniform vec2 uRes;uniform float uTime;uniform vec2 uSun;${NOISE}
void main(){
  vec2 px=vec2(vUv.x,1.-vUv.y)*uRes;
  vec3 top=vec3(.66,.85,.95), low=vec3(.80,.92,.98);
  vec3 col=mix(low,top,smoothstep(.1,1.,vUv.y));
  vec2 q=vec2(vUv.x*uRes.x/uRes.y,vUv.y)*2.4;
  q.x+=uTime*.012;
  float c=fbm(q+fbm(q*.7+vec2(uTime*.02,0.)));
  c=smoothstep(.55,.88,c)*smoothstep(.2,.75,vUv.y);
  col=mix(col,vec3(1.),c*.6);
  float d=length(px-uSun)/uRes.y;
  col+=vec3(1.,.95,.8)*.14*exp(-d*d*16.);
  gl_FragColor=vec4(col,1.);
}`

export function SkyGL({ sunRef }) {
  const cv = useRef(null)
  useEffect(() => {
    const g = makeGL(cv.current, SKY, { scale: 0.6 })
    if (!g) return
    cv.current.classList.add('gl-on')
    const stop = whileVisible(cv.current, (t) => g.draw((gl, u, s) => {
      const r = cv.current.getBoundingClientRect(), sr = sunRef.current?.getBoundingClientRect()
      const sx = sr ? sr.left + sr.width / 2 - r.left : r.width * 0.8, sy = sr ? sr.top + sr.height / 2 - r.top : r.height * 0.25
      gl.uniform2f(u('uRes'), s.w, s.h); gl.uniform1f(u('uTime'), t); gl.uniform2f(u('uSun'), sx * s.dpr, sy * s.dpr)
    }))
    return () => { stop(); g.destroy() }
  }, [sunRef])
  return <canvas ref={cv} className="gl gl-sky" aria-hidden="true" />
}

// 2. Photos: still until touched, then a ripple spreads from the pointer.
//    Fast scrolling adds a slight wave and a little colour fringing.
const RIPPLE = `uniform sampler2D uTex;uniform vec2 uRes,uImg,uPos,uMouse;uniform float uHover,uVel,uTime;
vec2 cover(vec2 uv){float ra=uRes.x/uRes.y,ri=uImg.x/uImg.y;vec2 s=ra>ri?vec2(1.,ri/ra):vec2(ra/ri,1.);return (uv-.5)*s+.5+(uPos-.5)*(1.-s);}
void main(){
  vec2 uv=vec2(vUv.x,1.-vUv.y);
  vec2 d=uv-uMouse;d.x*=uRes.x/uRes.y;float r=length(d);
  float w=sin(r*42.-uTime*5.)*exp(-r*4.5)*.011*uHover;
  vec2 off=(d/(r+.0001))*w;
  off.y+=sin(uv.x*9.+uTime*2.)*.007*uVel;
  vec2 t=cover(uv+off);
  float ca=abs(w)*1.2+abs(uVel)*.003;
  vec3 col=vec3(texture2D(uTex,t+vec2(ca,0.)).r,texture2D(uTex,t).g,texture2D(uTex,t-vec2(ca,0.)).b);
  gl_FragColor=vec4(col,1.);
}`

export function RippleImage({ src, pos = '50% 50%', alt = '' }) {
  const wrap = useRef(null), cv = useRef(null)
  useEffect(() => {
    const canvas = cv.current
    const g = makeGL(canvas, RIPPLE)
    if (!g) return
    const [px, py] = pos.split(' ').map((v) => parseFloat(v) / 100)
    const st = { mx: 0.5, my: 0.5, hover: 0, target: 0, vel: 0, dirty: true }
    let stop = () => {}, alive = true
    const img = new Image()
    img.decoding = 'async'
    img.src = src
    img.decode().then(() => {
      if (!alive) return
      g.texture(img)
      canvas.classList.add('gl-on')
      stop = whileVisible(canvas, (t) => {
        st.hover += (st.target - st.hover) * 0.06
        const v = Math.max(-1, Math.min(1, (window.__lenis?.velocity || 0) / 40))
        st.vel += (v - st.vel) * 0.1
        if (!st.dirty && st.hover < 0.002 && Math.abs(st.vel) < 0.002) return // still image: no redraw needed
        st.dirty = false
        g.draw((gl, u, s) => {
          gl.uniform2f(u('uRes'), s.w, s.h); gl.uniform2f(u('uImg'), img.naturalWidth, img.naturalHeight)
          gl.uniform2f(u('uPos'), px, py); gl.uniform2f(u('uMouse'), st.mx, st.my)
          gl.uniform1f(u('uHover'), st.hover); gl.uniform1f(u('uVel'), st.vel); gl.uniform1f(u('uTime'), t)
        })
      })
    }).catch(() => {})
    const el = wrap.current
    const mv = (e) => { const r = canvas.getBoundingClientRect(); st.mx = (e.clientX - r.left) / r.width; st.my = (e.clientY - r.top) / r.height; st.target = 1 }
    const lv = () => { st.target = 0 }
    const rs = () => { st.dirty = true }
    if (fine()) { el.addEventListener('pointermove', mv); el.addEventListener('pointerleave', lv) }
    addEventListener('resize', rs)
    return () => { alive = false; stop(); g.destroy(); el.removeEventListener('pointermove', mv); el.removeEventListener('pointerleave', lv); removeEventListener('resize', rs) }
  }, [src, pos])
  return (
    <div className="media" ref={wrap}>
      <img src={src} alt={alt} loading="lazy" style={{ objectPosition: pos }} />
      <canvas ref={cv} className="gl gl-img" aria-hidden="true" />
    </div>
  )
}

// 3. Contact band: deep reservoir water with slow, map-like ripple lines.
//    Kept dark so white text on top still passes contrast.
const WATER = `uniform vec2 uRes,uMouse;uniform float uTime;${NOISE}
void main(){
  vec2 p=vUv*vec2(uRes.x/uRes.y,1.)*1.5;
  float t=uTime*.12;
  vec2 w=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
  float n=fbm(p*1.5+w*1.7+t);
  float l=pow(1.-abs(sin(n*9.)),12.);
  vec3 base=vec3(.012,.29,.43);
  vec3 col=base+vec3(.01,.04,.05)*n+vec3(.03,.08,.1)*l*.45;
  vec2 px=vec2(vUv.x,1.-vUv.y)*uRes;
  float m=length(px-uMouse)/uRes.y;
  col+=vec3(.02,.05,.07)*exp(-m*m*10.);
  col=mix(base,col,smoothstep(1.,.92,vUv.y));
  gl_FragColor=vec4(col,1.);
}`

export function WaterGL() {
  const cv = useRef(null)
  useEffect(() => {
    const canvas = cv.current
    const g = makeGL(canvas, WATER, { scale: 0.5 })
    if (!g) return
    canvas.classList.add('gl-on')
    const m = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const host = canvas.parentElement
    const mv = (e) => { const r = canvas.getBoundingClientRect(); m.tx = e.clientX - r.left; m.ty = e.clientY - r.top; if (m.x < -999) { m.x = m.tx; m.y = m.ty } }
    if (fine()) host.addEventListener('pointermove', mv)
    const stop = whileVisible(canvas, (t) => {
      m.x += (m.tx - m.x) * 0.08; m.y += (m.ty - m.y) * 0.08
      g.draw((gl, u, s) => { gl.uniform2f(u('uRes'), s.w, s.h); gl.uniform1f(u('uTime'), t); gl.uniform2f(u('uMouse'), m.x * s.dpr, m.y * s.dpr) })
    })
    return () => { stop(); g.destroy(); host.removeEventListener('pointermove', mv) }
  }, [])
  return <canvas ref={cv} className="gl gl-water" aria-hidden="true" />
}
