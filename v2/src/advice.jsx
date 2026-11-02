import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@fontsource-variable/bricolage-grotesque/index.css'
import '@fontsource-variable/literata/index.css'
import './styles.css'
import './inner.css'
import './advice.css'
import AdvicePage from './ui/advice/AdvicePage'

gsap.registerPlugin(ScrollTrigger)
createRoot(document.getElementById('root')).render(<AdvicePage />)
