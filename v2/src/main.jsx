import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@fontsource-variable/bricolage-grotesque/index.css'
import '@fontsource-variable/literata/index.css'
import './styles.css'
import App from './App'
import './ui/mobile.css'

gsap.registerPlugin(ScrollTrigger)
createRoot(document.getElementById('root')).render(<App />)
