// Finds words split across two lines (mid-word breaks) at phone widths, at normal text size.
async (page) => {
  const routes = ["", "about/", "about/accreditation/", "about/history/", "about/our-team/", "about/what-people-say/", "about/where-we-are/", "about/where-we-are/around-the-valley/", "accessibility/", "activities/", "activities/adventure-on-land/", "activities/adventure-on-water/", "activities/bushcraft/", "activities/environmental-education/", "activities/plan-your-visit/", "activities/roman-history/", "activities/team-building/", "advice-and-guidance/", "advice-and-guidance/training/", "contact/", "courses-and-clubs/", "courses-and-clubs/activity-courses/", "courses-and-clubs/holiday-clubs/", "courses-and-clubs/outdoor-awards/", "news/", "news/a-peak-district-ambassador-centre/", "news/bushcraft-sessions/", "news/our-new-centre-manager/", "news/raising-the-roof/", "news/sup-er/", "news/the-end-of-another-era/", "privacy/", "stay/"];
  const cdp = await page.context().newCDPSession(page);
  const out = {};
  for (const [w, h] of [[320, 568], [360, 740], [390, 844], [768, 1024]]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: true });
    await page.setViewportSize({ width: w, height: h });
    for (const r of routes) {
      await page.goto('http://localhost:4175/' + r, { waitUntil: 'load' });
      await page.waitForTimeout(300);
      const words = await page.evaluate(() => {
        const found = [];
        const walker = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const el = n.parentElement; if (!el || !el.getClientRects().length) continue;
          const re = /[^\s ‑-]{4,}/g; let m;
          while ((m = re.exec(n.data))) {
            const range = document.createRange(); range.setStart(n, m.index); range.setEnd(n, m.index + m[0].length);
            const rects = [...range.getClientRects()].filter((x) => x.width > 0);
            if (rects.length > 1 && Math.abs(rects[0].top - rects[rects.length - 1].top) > 4) found.push(m[0].slice(0, 30));
          }
        }
        return [...new Set(found)].slice(0, 6);
      });
      if (words.length) (out[r || '/'] ||= {})[w] = words;
    }
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  return JSON.stringify(out, null, 1);
}
