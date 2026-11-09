// Desktop regression at 1440: full-page screenshots of five pages from the current build (:4175)
// and the pre-mobile baseline (:4176, commit ba30607), with reduced motion so animations don't differ.
// Saves qa/_tmp/desk/{base,now}-<slug>.png; compare them with qa/desktop-diff.py.
async (page) => {
  const dir = '/Users/James/Desktop/0 Code Projects/Castle Shaw/site/qa/_tmp/desk/';
  const routes = ['', 'stay/', 'activities/adventure-on-land/', 'about/what-people-say/', 'advice-and-guidance/'];
  const out = [];
  for (const [tag, port] of [['base', 4176], ['now', 4175]]) {
    const p = await page.context().newPage();
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.setViewportSize({ width: 1440, height: 900 });
    for (const r of routes) {
      const slug = r.replace(/\/$/, '').replace(/\//g, '--') || 'home';
      await p.goto(`http://localhost:${port}/` + r, { waitUntil: 'networkidle' });
      await p.evaluate(async () => {
        try { sessionStorage.setItem('cs-intro', '1') } catch {}
        document.querySelectorAll('img').forEach((i) => { i.loading = 'eager' });
        for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)) }
        scrollTo(0, 0); await new Promise((r) => setTimeout(r, 900));
      });
      await p.waitForLoadState('networkidle');
      const h = await p.evaluate(() => document.body.scrollHeight);
      await p.screenshot({ path: `${dir}${tag}-${slug}.png`, fullPage: true });
      out.push(`${tag} ${slug} ${h}`);
    }
    await p.close();
  }
  return out.join('\n');
}
