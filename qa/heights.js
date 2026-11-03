// Page heights of every page at 320, 390 and 768 (mobile emulation), to show a shared change leaves normal text sizes alone.
async (page) => {
  const routes = ["", "about/", "about/accreditation/", "about/history/", "about/news/", "about/our-team/", "about/what-people-say/", "about/where-we-are/", "about/where-we-are/around-the-valley/", "activities/", "activities/adventure-on-land/", "activities/adventure-on-water/", "activities/bushcraft/", "activities/environmental-education/", "activities/plan-your-visit/", "activities/roman-history/", "activities/team-building/", "advice-and-guidance/", "advice-and-guidance/emergency-support/", "advice-and-guidance/get-a-quote/", "advice-and-guidance/guidance-and-resources/", "advice-and-guidance/how-it-works/", "advice-and-guidance/our-advisers/", "advice-and-guidance/questions/", "advice-and-guidance/service-agreement/", "advice-and-guidance/training/", "advice-and-guidance/who-its-for/", "contact/", "courses-and-clubs/", "courses-and-clubs/activity-courses/", "courses-and-clubs/holiday-clubs/", "courses-and-clubs/outdoor-awards/", "privacy/", "stay/"];
  const cdp = await page.context().newCDPSession(page);
  const out = {};
  for (const [w, h] of [[320, 568], [390, 844], [768, 1024]]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: true });
    await page.setViewportSize({ width: w, height: h });
    for (const r of routes) {
      await page.goto('http://localhost:4175/' + r, { waitUntil: 'load' });
      await page.waitForTimeout(250);
      (out[r || '/'] ||= []).push(await page.evaluate(() => document.body.scrollHeight));
    }
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  return JSON.stringify(out);
}
