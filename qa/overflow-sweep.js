// Overflow sweep: every page at 320, 390 and 768, plus 200% text zoom at 320 and 390, measured against the device width
// (with mobile emulation innerWidth grows when content overflows, so it can't be the reference).
// Use with browser_run_code_unsafe (filename). Reports only pages with a problem, and the widest offenders.
async (page) => {
  const routes = ["", "about/", "about/accreditation/", "about/history/", "about/our-team/", "about/what-people-say/", "about/where-we-are/", "about/where-we-are/around-the-valley/", "activities/", "activities/adventure-on-land/", "activities/adventure-on-water/", "activities/bushcraft/", "activities/environmental-education/", "activities/plan-your-visit/", "activities/roman-history/", "activities/team-building/", "advice-and-guidance/", "advice-and-guidance/training/", "contact/", "courses-and-clubs/", "courses-and-clubs/activity-courses/", "courses-and-clubs/holiday-clubs/", "courses-and-clubs/outdoor-awards/", "news/", "news/a-peak-district-ambassador-centre/", "news/bushcraft-sessions/", "news/our-new-centre-manager/", "news/raising-the-roof/", "news/sup-er/", "news/the-end-of-another-era/", "privacy/", "stay/"];
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  const bad = {};
  for (const [w, h, zoom] of [[320, 568, 0], [390, 844, 0], [768, 1024, 0], [320, 568, 1], [390, 844, 1]]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: true });
    await page.setViewportSize({ width: w, height: h });
    for (const r of routes) {
      await page.goto('http://localhost:4175/' + r, { waitUntil: 'load' });
      const res = await page.evaluate(async ([W, zoom]) => {
        if (zoom) document.documentElement.style.fontSize = '200%';
        await new Promise((r) => setTimeout(r, 350));
        const sw = document.documentElement.scrollWidth;
        if (sw <= W + 1) return null;
        const clipped = (e) => { for (let p = e.parentElement; p && p !== document.body; p = p.parentElement) if (getComputedStyle(p).overflowX !== 'visible') return true; return false };
        const off = [...document.querySelectorAll('body *')].filter((e) => { const b = e.getBoundingClientRect(); return b.width && b.right > W + 1 && !clipped(e) })
          .map((e) => ({ n: (e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/)[0] : '')).slice(0, 30), r: Math.round(e.getBoundingClientRect().right) }))
          .sort((a, b) => b.r - a.r);
        // keep the deepest distinct offenders
        return { sw, off: [...new Map(off.map((o) => [o.n, o])).values()].slice(0, 4).map((o) => o.n + '@' + o.r) };
      }, [w, zoom]);
      if (res) (bad[r || '/'] ||= {})[w + (zoom ? 'z' : '')] = res.sw + ' ' + res.off.join(' ');
    }
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  return JSON.stringify(bad, null, 1);
}
