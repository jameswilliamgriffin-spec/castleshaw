// Full-page screenshots of one page at the six test sizes into qa/mobile-after/<slug>/.
// Navigate to http://localhost:4175/#"route/" first (the route in the hash).
async (page) => {
  const r = JSON.parse(decodeURIComponent(new URL(page.url()).hash.slice(1) || '""'));
  const slug = r.replace(/\/$/, '').replace(/\//g, '--') || 'home';
  const OUT = `/Users/James/Desktop/0 Code Projects/Castle Shaw/site/qa/mobile-after/${slug}/`;
  const cdp = await page.context().newCDPSession(page);
  for (const [w, h] of [[320, 568], [360, 740], [390, 844], [430, 932], [768, 1024], [844, 390]]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 2, mobile: true });
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://localhost:4175/' + r, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { document.querySelectorAll('img').forEach((i) => { i.loading = 'eager' }); for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)) } scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600)) });
    await page.screenshot({ path: `${OUT}${w}x${h}.jpg`, type: 'jpeg', quality: 50, fullPage: true, scale: 'css' });
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  return slug;
}
