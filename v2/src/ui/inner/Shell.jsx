import { useCallback, useState } from 'react'
import { Header, Menu } from '../Top'
import { Footer } from '../Contact'
import { PAGES } from '../../site.mjs'
import { ROOT } from '../../lib'

// The calm frame for every inner page: header, section pages, content, footer.
// No smooth-scroll library, custom cursor or scroll effects here, unlike the homepage.
export default function Shell({ path, children }) {
  const [menu, setMenu] = useState(false)
  const close = useCallback(() => setMenu(false), [])
  const page = PAGES.find((p) => p.path === path)
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header open={menu} setOpen={setMenu} count={0} current={page?.section} />
      <Menu open={menu} close={close} />
      <main id="main" className="inner">
        {children}
      </main>
      <Footer />
      <a className="versions" href={ROOT}>All versions</a>
    </>
  )
}
