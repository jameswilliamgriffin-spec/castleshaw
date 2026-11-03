// Mobile checks for one page, at the six test sizes, plus 200% text zoom at 390.
// Use with the Playwright MCP tool browser_run_code_unsafe (filename). First navigate to
// http://localhost:4175/#"route/"  (the route, in quotes, in the hash; "" for the homepage).
// Returns per size: horizontal overflow, elements past the right edge, targets under 44px,
// heading skips, sentence text under 16px, console errors and page height.
async (page) => {
  const r = JSON.parse(decodeURIComponent(new URL(page.url()).hash.slice(1) || '""'));
  const cdp = await page.context().newCDPSession(page);
  const out = {};
  for (const [w, h] of [[320, 568], [360, 740], [390, 844], [430, 932], [768, 1024], [844, 390]]) {
    const errs = []; const onE = (e) => errs.push(e.message); const onC = (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 140)) };
    page.on('pageerror', onE); page.on('console', onC);
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: true });
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://localhost:4175/' + r, { waitUntil: 'networkidle' });
    out[`${w}x${h}`] = await page.evaluate(async (W) => {
      document.querySelectorAll('img').forEach((i) => { i.loading = 'eager' });
      for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)) }
      scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600));
      document.querySelectorAll('.ft-tog[aria-expanded="false"]').forEach((b) => b.click()); await new Promise((r) => setTimeout(r, 400));
      // W is the device width: with mobile emulation innerWidth grows when content overflows, hiding it
      const vis = (e) => { const b = e.getBoundingClientRect(); const s = getComputedStyle(e); return b.width > 0 && b.height > 0 && s.visibility !== 'hidden' && +s.opacity > .05 };
      const clipped = (e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).overflowX !== 'visible') return true; return false };
      const name = (e) => (e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : '')).slice(0, 36);
      const wide = [...document.querySelectorAll('body *')].filter((e) => { const b = e.getBoundingClientRect(); return b.right > W + 1 && b.width > 0 && vis(e) && !clipped(e) }).map(name);
      const ctrls = [...document.querySelectorAll('a[href], button, input, select, textarea, summary, [role="tab"]')].filter((e) => vis(e) && !e.closest('[inert]') && !e.closest('.sr-only') && e.type !== 'hidden' && !(getComputedStyle(e).display === 'inline' && e.closest('p, li, dd, td, blockquote')));
      const small = ctrls.filter((e) => { const b = e.getBoundingClientRect(); return b.left > -50 && (b.height < 43.5 || b.width < 43.5) }).map((e) => `${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)} ${name(e)} "${e.textContent.trim().slice(0, 18)}"`);
      const hs = [...document.querySelectorAll('main h1, main h2, main h3, main h4')]; let skip = 0, last = 1; for (const x of hs) { const l = +x.tagName[1]; if (l > last + 1) skip++; last = l }
      const smallText = [...document.querySelectorAll('main p, main li, main dd, main figcaption, main blockquote, main label')].filter((e) => vis(e) && e.textContent.trim().split(/\s+/).length >= 6 && parseFloat(getComputedStyle(e).fontSize) < 15.5 && !e.closest('.crumbs')).map((e) => Math.round(parseFloat(getComputedStyle(e).fontSize)) + 'px ' + name(e));
      return { over: document.documentElement.scrollWidth - W, wide: [...new Set(wide)].slice(0, 5), small: [...new Set(small)].slice(0, 8), skip, smallText: [...new Set(smallText)].slice(0, 5), h: document.body.scrollHeight, h1: document.querySelectorAll('main h1').length };
    }, w);
    out[`${w}x${h}`].errs = errs; page.off('pageerror', onE); page.off('console', onC);
  }
  // 200% text zoom at 390
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:4175/' + r, { waitUntil: 'networkidle' });
  out.zoom200 = await page.evaluate(async () => {
    document.documentElement.style.fontSize = '200%'; await new Promise((r) => setTimeout(r, 500));
    const W = 390;
    const wide = [...document.querySelectorAll('body *')].filter((e) => { const b = e.getBoundingClientRect(); if (b.right <= W + 1 || !b.width) return false; for (let p = e.parentElement; p; p = p.parentElement) if (getComputedStyle(p).overflowX !== 'visible') return false; return true }).map((e) => e.tagName.toLowerCase() + '.' + (e.className || '').toString().split(' ')[0]);
    return { over: document.documentElement.scrollWidth - W, wide: [...new Set(wide)].slice(0, 5) };
  });
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false });
  // desktop height, to confirm desktop is unchanged
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:4175/' + r, { waitUntil: 'networkidle' });
  out.desktopH = await page.evaluate(() => document.body.scrollHeight);
  return JSON.stringify(out);
}
