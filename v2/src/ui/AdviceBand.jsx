import ShapedImage from './shape/ShapedImage'
import { useReveal } from './Squiggle'
import { ROOT, ADVICE } from '../lib'
import { track } from '../track'
import './advice-band.css'

// The homepage's call to action for the educational visits advice service: one of the
// centre's main services, for schools planning any trip, not just a visit here.
// Shown as a card in the scroll journey (Journey.jsx), on paper over the film.
export default function AdviceBand() {
  const ref = useReveal()
  return (
    <section className="adb adb-card" aria-labelledby="adb-h" ref={ref}>
      <div className="adb-in">
        <div className="adb-copy">
          <p className="adb-kicker">For schools and settings</p>
          <h2 id="adb-h" className="adb-h">Running a trip, anywhere? We&rsquo;ll sign it off.</h2>
          <p>Oldham Council&rsquo;s educational visits advisers are based here at Castleshaw. We check and approve visit plans on Evolve, train your staff, and stay on the end of the phone until everyone is home.</p>
          <ul className="adb-points">
            <li>Visit forms reviewed within 10 working days</li>
            <li>One free EVC training place a year</li>
            <li>A 24/7 critical incident line</li>
          </ul>
          <div className="adb-actions">
            <a className="adb-btn" href={ADVICE} onClick={() => track('Advice link', { place: 'homepage' })}>Educational visits advice</a>
            <a className="adb-link" href={`${ADVICE}#quote`} onClick={() => track('Quote button', { place: 'homepage' })}>Get a quote</a>
          </div>
        </div>
        <ShapedImage className="adb-img" src={`${ROOT}shared/images/generated/hands-carabiner.webp`} alt="Hands checking a locked carabiner on a climbing rope" shape="blob-5" backdrop="offset" accent="pale-blue" offset="br" aspect="4/5" width={1122} height={1402} />
      </div>
    </section>
  )
}
