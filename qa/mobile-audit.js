// Mobile audit: run via the Playwright MCP tool (browser_run_code_unsafe, filename).
// Emulates a touch phone with CDP, measures each page at six viewports and screenshots four.
async (page) => {
  // routes come from the current page's hash: navigate to http://localhost:4175/#["stay/",...] first
  const ROUTES = JSON.parse(decodeURIComponent(new URL(page.url()).hash.slice(1) || '[""]'));
  const VIEW = [[320, 568, 1], [360, 740, 0], [390, 844, 1], [430, 932, 0], [768, 1024, 1], [844, 390, 1]];
  const OUT = '/Users/James/Desktop/0 Code Projects/Castle Shaw/site/qa/mobile-before/';
  const cdp = await page.context().newCDPSession(page);
  const res = {};
  for (const r of ROUTES) {
    const slug = (r.replace(/\/$/, '').replace(/\//g, '--')) || 'home';
    for (const [w, h, shot] of VIEW) {
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: w < 1000 });
      await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
      await page.setViewportSize({ width: w, height: h });
      await page.goto('http://localhost:4175/' + r, { waitUntil: 'networkidle' });
      const m = await page.evaluate(async () => {
        document.querySelectorAll('img').forEach((i) => { i.loading = 'eager' });
        for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)) }
        scrollTo(0, 0); await new Promise((r) => setTimeout(r, 700));
        const W = innerWidth, sy = scrollY;
        const vis = (e) => { const s = getComputedStyle(e); const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05 };
        const clipped = (e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') return true } return false };
        const name = (e) => (e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.') : '')).slice(0, 40);
        const all = [...document.querySelectorAll('body *')];
        const wide = all.filter((e) => { const b = e.getBoundingClientRect(); return b.right > W + 1 && b.width > 0 && vis(e) && !clipped(e) }).map(name);
        const textOver = [...document.querySelectorAll('h1, h2, h3, p, li, a, button, dd, dt, span')].filter((e) => vis(e) && e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX === 'visible' && e.clientWidth > 0 && !e.closest('[aria-hidden="true"]')).map(name);
        const main = document.querySelector('main') || document.body;
        const small = [...main.querySelectorAll('p, li, dd, td, figcaption, label, blockquote')].filter((e) => vis(e) && e.textContent.trim().length > 30 && parseFloat(getComputedStyle(e).fontSize) < 15.5).map((e) => Math.round(parseFloat(getComputedStyle(e).fontSize)) + ':' + name(e));
        const tiny = [...main.querySelectorAll('*')].filter((e) => vis(e) && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2) && parseFloat(getComputedStyle(e).fontSize) < 12).map((e) => Math.round(parseFloat(getComputedStyle(e).fontSize)) + ':' + name(e));
        const ctrls = [...document.querySelectorAll('a[href], button, input, select, textarea, summary, [role="button"], [role="tab"], label:has(input)')].filter((e) => vis(e) && !e.closest('[inert]') && !(getComputedStyle(e).display === 'inline' && e.closest('p, li, dd, td, blockquote')));
        const rects = ctrls.map((e) => [e, e.getBoundingClientRect()]);
        const smallT = rects.filter(([, b]) => b.height < 43.5 || b.width < 43.5).map(([e, b]) => `${Math.round(b.width)}x${Math.round(b.height)}:${name(e)}`);
        let close = 0; for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) { const a = rects[i][1], b = rects[j][1]; if (rects[i][0].contains(rects[j][0]) || rects[j][0].contains(rects[i][0])) continue; const gx = Math.max(b.left - a.right, a.left - b.right), gy = Math.max(b.top - a.bottom, a.top - b.bottom); if (gx < 8 && gy < 8 && (gx > -1 || gy > -1) && Math.max(gx, gy) >= 0 && Math.max(gx, gy) < 8) close++ }
        const fixed = all.filter((e) => { const p = getComputedStyle(e).position; return (p === 'fixed' || p === 'sticky') && vis(e) }).map((e) => { const b = e.getBoundingClientRect(); return [name(e), getComputedStyle(e).position, Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height)] });
        const inputs = [...document.querySelectorAll('input:not([type=hidden]):not([type=checkbox]):not([type=radio]), select, textarea')].filter(vis).filter((e) => parseFloat(getComputedStyle(e).fontSize) < 16).map((e) => Math.round(parseFloat(getComputedStyle(e).fontSize)) + ':' + (e.name || e.id));
        const noDims = [...main.querySelectorAll('img')].filter((i) => vis(i) && !i.getAttribute('width') && getComputedStyle(i).aspectRatio === 'auto').length;
        const h = document.body.scrollHeight;
        return { over: document.documentElement.scrollWidth - W, wide: [...new Set(wide)].slice(0, 6), textOver: [...new Set(textOver)].slice(0, 5), small: [...new Set(small)].slice(0, 6), smallN: small.length, tiny: [...new Set(tiny)].slice(0, 6), tinyN: tiny.length, targets: smallT.length, targetEg: [...new Set(smallT)].slice(0, 8), close, fixed, inputs, noDims, h };
      });
      if (shot) await page.screenshot({ path: `${OUT}${slug}/${w}x${h}.jpg`, type: 'jpeg', quality: 50, fullPage: true, scale: 'css' });
      // merge the six viewports into one compact record per page
      const R = res[slug] || (res[slug] = { over: 0, wide: [], textOver: [], small: [], tiny: [], targets390: 0, targetEg: [], close390: 0, inputs: [], noDims: 0, fixed390: [], h: {} });
      R.over = Math.max(R.over, m.over); R.wide = [...new Set([...R.wide, ...m.wide.map((x) => x + '@' + w)])].slice(0, 6);
      R.textOver = [...new Set([...R.textOver, ...m.textOver])].slice(0, 5); R.small = [...new Set([...R.small, ...m.small])].slice(0, 5); R.tiny = [...new Set([...R.tiny, ...m.tiny])].slice(0, 5);
      R.inputs = [...new Set([...R.inputs, ...m.inputs])]; R.noDims = Math.max(R.noDims, m.noDims); R.h[w] = m.h;
      if (w === 390) { R.targets390 = m.targets; R.targetEg = m.targetEg.slice(0, 6); R.close390 = m.close; R.fixed390 = m.fixed.filter((f) => f[0] !== 'a.skip').map((f) => f.slice(0, 2).join(' ')) }
    }
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false });
  return JSON.stringify(res);
}
