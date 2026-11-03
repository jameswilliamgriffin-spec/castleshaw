// Six small, slightly hand-drawn icons for the activity areas, on a 24px grid with one
// 2px stroke. They take the colour of their category through currentColor; pathLength
// lets the active one draw itself in.
const ICONS = {
  land: ['M2.4 19.6c2.7-3.1 4.3-5.4 6.2-4.9 1.7.5 2.4-4.1 5-6.4 1.9-1.6 3.8 3.2 8 7.7', 'M2.6 20.5h18.8', 'M18.4 3.5a2.4 2.4 0 1 1-.2 0z'],
  water: ['M2.5 8.4c1.9-1.5 3.4-1.5 5.1 0s3.2 1.6 4.9 0 3.3-1.6 5 .1c1.3 1.2 2.6 1.4 4 .2', 'M2.5 13.4c1.9-1.5 3.4-1.4 5.1.1s3.2 1.5 4.9-.1 3.3-1.5 5 .1c1.3 1.1 2.6 1.3 4 .1', 'M5.5 18.4c1.6-1.3 3-1.3 4.5 0s3 1.4 4.5 0 3-1.3 4.2.1'],
  bushcraft: ['M12 3.4c1 2.6 4 4.3 4 7.7a4 4 0 0 1-8 0c0-1.6.9-2.7 1.6-3.5.2 1.4.9 2.1 1.6 2.3-.5-2.2.1-4.5.8-6.5z', 'M4.6 20.6l14.8-4.3', 'M19.4 20.6L4.6 16.3'],
  environment: ['M5 19.2c-.6-7.3 3.7-13.1 14.1-14.1.7 9.7-4.5 14.3-11.7 13.7', 'M5 19.2c3-4.1 6.2-7.1 10-9.1', 'M18.4 15.2c1.2 1.6 1.9 2.7 1.9 3.5a1.9 1.9 0 0 1-3.8 0c0-.8.7-1.9 1.9-3.5z'],
  roman: ['M5.1 15.2c-.1-5.1 3-8.8 6.9-8.8s7.1 3.6 7 8.8', 'M7.3 6.3c1.7-2.5 7.9-2.6 9.5-.1', 'M5.1 15.2v3.7l3 1.2v-4.8M18.9 15.2v3.7l-3 1.2v-4.8', 'M3.9 15.2h16.2'],
  stay: ['M3 11.6l9-7.3 9.1 7.3', 'M5.4 9.9V20.2h13.2V9.9', 'M10.2 20.2v-5.1h3.6v5.1', 'M16 7.5V4.6h2.1v4.6'],
}

export default function AreaIcon({ id, className = '' }) {
  const paths = ICONS[id] || ICONS.land
  return (
    <svg className={`aicon ${className}`} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {paths.map((d) => <path key={d} d={d} pathLength="1" />)}
    </svg>
  )
}
