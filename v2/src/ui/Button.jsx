import { useRef } from 'react'
import { useMagnet, goTo } from '../lib'

// Pill button. The label rolls up and is replaced by a copy of itself on hover.
export default function Button({ children, to, href, onClick, tone = 'ink', size, ...rest }) {
  const ref = useRef(null)
  useMagnet(ref)
  const cls = `b b-${tone}${size ? ` b-${size}` : ''}`
  const body = (
    <span className="b-roll" aria-hidden="false">
      <span className="b-t">{children}</span>
      <span className="b-t b-t2" aria-hidden="true">{children}</span>
    </span>
  )
  const click = (e) => { if (to) { e.preventDefault(); goTo(to) } onClick?.(e) }
  return href || to
    ? <a ref={ref} className={cls} href={href || `#${to}`} onClick={click} {...rest}>{body}</a>
    : <button ref={ref} type="button" className={cls} onClick={click} {...rest}>{body}</button>
}
