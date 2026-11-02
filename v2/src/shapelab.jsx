// Shape lab (dev only): every image shape, backdrop and accent, to pick favourites.
import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/bricolage-grotesque/index.css'
import '@fontsource-variable/literata/index.css'
import './styles.css'
import './inner.css'
import ShapedImage from './ui/shape/ShapedImage'
import { SHAPE_NAMES } from './ui/shape/shapes'
import { ROOT } from './lib'

const photo = (n) => `${ROOT}shared/images/site/${n}.jpg`
const PHOTOS = ['water-kayak-green', 'land-ghyll-waterfall', 'club-group', 'env-stream', 'roman-shields', 'team-rope', 'stay-front', 'award-dofe-walk', 'water-canoe-reflect', 'course-caving', 'bushcraft-fire', 'history-building-now', 'valley-reservoir']
const BACKDROPS = ['none', 'offset', 'ring', 'dots']
const ACCENTS = ['lime', 'pale-blue', 'navy']

function Lab() {
  const [backdrop, setBackdrop] = useState('offset')
  const [accent, setAccent] = useState('lime')
  const [offset, setOffset] = useState('br')
  const [float, setFloat] = useState(false)
  const [aspect, setAspect] = useState('4/5')
  const Seg = ({ label, value, set, options }) => (
    <fieldset className="lab-seg"><legend>{label}</legend>
      {options.map((o) => <label key={String(o)}><input type="radio" checked={value === o} onChange={() => set(o)} />{String(o)}</label>)}
    </fieldset>
  )
  return (
    <main className="inner lab">
      <header className="lab-head">
        <h1 className="h2i">Shape lab</h1>
        <p>Every shape with a photo from the site. Hover for the backdrop shift; scroll to see the entry. Tell me the token name, for example &ldquo;use blob-4 for the Activities page&rdquo;. This page only exists on the dev server.</p>
        <div className="lab-controls">
          <Seg label="Backdrop" value={backdrop} set={setBackdrop} options={BACKDROPS} />
          <Seg label="Accent" value={accent} set={setAccent} options={ACCENTS} />
          <Seg label="Offset" value={offset} set={setOffset} options={['br', 'bl', 'tr', 'tl']} />
          <Seg label="Aspect" value={aspect} set={setAspect} options={['4/5', '1/1', '16/10', '3/4']} />
          <Seg label="Float" value={float} set={setFloat} options={[false, 'circle', 'blob', 'squiggle']} />
        </div>
      </header>
      <ul className="lab-grid">
        {SHAPE_NAMES.map((name, i) => (
          <li key={name}>
            <ShapedImage src={photo(PHOTOS[i % PHOTOS.length])} alt="" shape={name} backdrop={backdrop} accent={accent} offset={offset} float={float} aspect={aspect} />
            <code>{name}</code>
          </li>
        ))}
      </ul>
      <h2 className="h2i lab-sub">Every backdrop and accent</h2>
      <ul className="lab-grid lab-grid-s">
        {BACKDROPS.flatMap((b) => ACCENTS.map((a, j) => (
          <li key={b + a}>
            <ShapedImage src={photo(PHOTOS[(j + BACKDROPS.indexOf(b) * 3) % PHOTOS.length])} alt="" shape={SHAPE_NAMES[(j * 3 + BACKDROPS.indexOf(b)) % 10]} backdrop={b} accent={a} offset={['br', 'bl', 'tl'][j]} />
            <code>{b} / {a}</code>
          </li>
        )))}
      </ul>
    </main>
  )
}

const css = document.createElement('style')
css.textContent = `
.lab { padding: 3rem var(--g) 6rem; max-width: 90rem; margin: 0 auto; }
.lab-head { position: sticky; top: 0; z-index: 5; background: var(--chalk); padding: 1rem 0; border-bottom: 1px solid var(--line); }
.lab-head p { max-width: 50rem; font-size: .95rem; margin: .5rem 0 1rem; }
.lab-controls { display: flex; flex-wrap: wrap; gap: .6rem 1.5rem; font: 600 .85rem var(--disp); }
.lab-seg { display: flex; gap: .3rem; align-items: center; border: 0; padding: 0; margin: 0; }
.lab-seg legend { float: left; margin-right: .5rem; color: var(--deep); }
.lab-seg label { display: inline-flex; gap: .3rem; align-items: center; padding: .25rem .6rem; border-radius: 99px; background: #fff; box-shadow: 0 0 0 1px var(--line); cursor: pointer; }
.lab-grid { list-style: none; padding: 0; margin: 2.5rem 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr)); gap: 3rem 2.5rem; }
.lab-grid-s { grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); }
.lab-grid code { display: block; margin-top: .8rem; font: 650 .95rem var(--disp); color: var(--deep); }
.lab-sub { margin-top: 3rem; }
`
document.head.appendChild(css)
createRoot(document.getElementById('root')).render(<Lab />)
