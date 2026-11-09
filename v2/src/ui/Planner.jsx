import { useMemo, useRef, useState } from 'react'
import { AREAS, WHO, AGES, LENGTH, BY_AGE } from '../data'
import { Photo } from './inner/Slot'
import Button from './Button'

export function suggest(age, length, picks) {
  const out = [...picks].filter((id) => id !== 'stay').slice(0, 4)
  for (const id of BY_AGE[age || 'mixed']) if (out.length < 3 && !out.includes(id)) out.push(id)
  if (length === 'nights' || picks.has('stay')) out.push('stay')
  return out
}

function message(who, age, length, ids) {
  const w = WHO.find((x) => x[0] === who)?.[1].toLowerCase() || 'a group'
  const a = AGES.find((x) => x[0] === age)?.[1].toLowerCase()
  const names = ids.map((id) => AREAS.find((x) => x.id === id).title.toLowerCase())
  return `Hello Castleshaw. We are ${w}${a ? ` (${a})` : ''} thinking about ${length === 'nights' ? 'a residential stay' : 'a day visit'}. We are interested in ${names.join(', ')}. Could you tell us about dates and prices?`
}

const STEPS = ['who', 'age', 'length', 'likes', 'result']

export default function Planner({ picks, toggle, onEnquire }) {
  const [step, setStep] = useState(0)
  const [who, setWho] = useState('')
  const [age, setAge] = useState('')
  const [length, setLength] = useState('')
  const ids = useMemo(() => suggest(age, length, picks), [age, length, picks])
  const head = useRef(null)
  const go = (n) => { setStep(n); requestAnimationFrame(() => head.current?.focus()) }
  const pick = (set, v) => { set(v); setTimeout(() => go(step + 1), 260) }

  const one = (legend, value, set, opts) => (
    <fieldset className="pl-q">
      <legend ref={head} tabIndex={-1}>{legend}</legend>
      <div className="pl-opts">
        {opts.map(([v, l]) => (
          <label key={v} className={`opt${value === v ? ' opt-on' : ''}`}>
            <input type="radio" name={legend} checked={value === v} onChange={() => pick(set, v)} />
            <span>{l}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )

  return (
    <section className="pl" id="plan" aria-labelledby="pl-h">
      <div className="pl-intro">
        <h2 id="pl-h" className="h2">Plan your visit</h2>
        <p>Answer four questions and we will suggest a mix. Nothing is sent until you choose to enquire.</p>
      </div>
      <div className="pl-card">
        <div className="pl-trail" aria-hidden="true">
          <svg viewBox="0 0 400 24" preserveAspectRatio="none"><path d="M4 14 C60 2 110 22 170 12 S280 4 330 14 S380 16 396 10" /></svg>
          <i style={{ left: `${(step / (STEPS.length - 1)) * 100}%` }} />
        </div>
        <p className="pl-count">{step < 4 ? `Question ${step + 1} of 4` : 'Your suggestion'}</p>
        <div className="pl-stage" key={step}>
          {step === 0 && one('Who is coming?', who, setWho, WHO)}
          {step === 1 && one('How old are they?', age, setAge, AGES)}
          {step === 2 && one('How long for?', length, setLength, LENGTH)}
          {step === 3 && (
            <fieldset className="pl-q">
              <legend ref={head} tabIndex={-1}>What are they into? Pick any.</legend>
              <div className="pl-opts pl-opts-img">
                {AREAS.filter((a) => a.id !== 'stay').map((a) => (
                  <label key={a.id} className={`opt opt-img${picks.has(a.id) ? ' opt-on' : ''}`} style={{ '--c': a.accent }}>
                    <input type="checkbox" checked={picks.has(a.id)} onChange={() => toggle(a.id)} />
                    <Photo src={a.img} sizes="(max-width: 599px) 45vw, 20vw" alt="" loading="lazy" style={{ objectPosition: a.pos }} />
                    <span>{a.short}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          {step === 4 && (
            <div className="pl-res">
              <h3 ref={head} tabIndex={-1}>A good day out for you might be</h3>
              <ul>
                {ids.map((id, i) => {
                  const a = AREAS.find((x) => x.id === id)
                  return (
                    <li key={id} style={{ '--c': a.accent, '--i': i }}>
                      <Photo src={a.img} sizes="(max-width: 599px) 30vw, 12vw" alt="" style={{ objectPosition: a.pos }} />
                      <span><strong>{a.title}</strong>{a.text.split('. ')[0]}.</span>
                    </li>
                  )
                })}
              </ul>
              <p className="pl-note">The final mix depends on age, numbers and the weather. We will talk it through with you.</p>
            </div>
          )}
        </div>
        <div className="pl-nav">
          {step > 0 && <button type="button" className="txt" onClick={() => go(step - 1)}>Back</button>}
          {step === 3 && <Button tone="ink" onClick={() => go(4)}>See my suggestion</Button>}
          {step < 3 && <button type="button" className="txt" onClick={() => go(step + 1)}>Skip</button>}
          {step === 4 && <Button tone="moss" onClick={() => onEnquire(message(who, age, length, ids))}>Enquire about this</Button>}
          {step === 4 && <button type="button" className="txt" onClick={() => go(0)}>Start again</button>}
        </div>
      </div>
    </section>
  )
}
