// Health check: every page at 1440 (desktop) and 390 (phone): console and page errors, failed requests,
// horizontal overflow (against the device width), and internal links that don't resolve to a built page or anchor.
async (page) => {
  const routes = ["", "about/", "about/accreditation/", "about/history/", "about/news/", "about/our-team/", "about/what-people-say/", "about/where-we-are/", "about/where-we-are/around-the-valley/", "activities/", "activities/adventure-on-land/", "activities/adventure-on-water/", "activities/bushcraft/", "activities/environmental-education/", "activities/plan-your-visit/", "activities/roman-history/", "activities/team-building/", "advice-and-guidance/", "advice-and-guidance/emergency-support/", "advice-and-guidance/get-a-quote/", "advice-and-guidance/guidance-and-resources/", "advice-and-guidance/how-it-works/", "advice-and-guidance/our-advisers/", "advice-and-guidance/questions/", "advice-and-guidance/service-agreement/", "advice-and-guidance/training/", "advice-and-guidance/who-its-for/", "contact/", "courses-and-clubs/", "courses-and-clubs/activity-courses/", "courses-and-clubs/holiday-clubs/", "courses-and-clubs/outdoor-awards/", "privacy/", "stay/"];
  const pages = new Set(routes.map((r) => '/' + r));
  const cdp = await page.context().newCDPSession(page);
  const out = { errors: {}, failed: {}, over: {}, links: {} };
  const ids = {};
  for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
    if (mobile) await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: true });
    else await cdp.send('Emulation.clearDeviceMetricsOverride');
    await page.setViewportSize({ width: w, height: h });
    for (const r of routes) {
      const errs = [], fails = [];
      const onC = (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 120)) };
      const onE = (e) => errs.push(e.message.slice(0, 120));
      const onR = (res) => { if (res.status() >= 400 && res.url().startsWith('http://localhost')) fails.push(res.status() + ' ' + res.url().replace('http://localhost:4175', '')) };
      page.on('console', onC); page.on('pageerror', onE); page.on('response', onR);
      await page.goto('http://localhost:4175/' + r, { waitUntil: 'networkidle' });
      const res = await page.evaluate(async (W) => {
        document.querySelectorAll('img').forEach((i) => { i.loading = 'eager' });
        for (let y = 0; y < document.body.scrollHeight; y += 700) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)) }
        await new Promise((r) => setTimeout(r, 400));
        const clipped = (e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).overflowX !== 'visible') return true; return false };
        const over = [...document.querySelectorAll('main *, footer *')].filter((e) => { const b = e.getBoundingClientRect(); return b.width && b.right > W + 1 && !clipped(e) && getComputedStyle(e).position !== 'fixed' }).slice(0, 2).map((e) => e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0] + '@' + Math.round(e.getBoundingClientRect().right));
        const links = [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => h && !/^(https?:|mailto:|tel:)/.test(h));
        return { over, links: [...new Set(links)], ids: [...document.querySelectorAll('[id]')].map((e) => e.id), path: location.pathname };
      }, w);
      page.off('console', onC); page.off('pageerror', onE); page.off('response', onR);
      const k = (r || '/') + ' @' + w;
      if (errs.length) out.errors[k] = [...new Set(errs)].slice(0, 3);
      if (fails.length) out.failed[k] = [...new Set(fails)].slice(0, 4);
      if (res.over.length) out.over[k] = res.over;
      ids[res.path] = new Set(res.ids);
      if (!mobile) for (const l of res.links) {
        const u = new URL(l, 'http://localhost:4175' + res.path);
        const p = u.pathname.endsWith('/') ? u.pathname : u.pathname;
        const isPage = pages.has(p);
        const isFile = /\.[a-z0-9]{2,5}$/i.test(p);
        if (!isPage && !isFile) (out.links[res.path] ||= []).push(l);
        else if (u.hash && isPage) (out.links.__anchors ||= []).push([res.path, p, u.hash.slice(1)]);
      }
    }
  }
  // anchors: the target id exists on the target page
  const anchors = out.links.__anchors || []; delete out.links.__anchors;
  const missing = anchors.filter(([, p, id]) => ids[p] && !ids[p].has(decodeURIComponent(id)) && id !== 'top' && id !== 'main');
  if (missing.length) out.links.missingAnchors = [...new Set(missing.map((m) => m[0] + ' -> ' + m[1] + '#' + m[2]))];
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  return JSON.stringify(out, null, 1);
}
