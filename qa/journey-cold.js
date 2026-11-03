// Journey frame timing on a cold first pass (no warm-up), 4x CPU, Fast 3G-ish network, DPR 3.
async (page) => {
  const cdp = await page.context().newCDPSession(page);
  const out = {};
  for (const [w, h] of [[390, 844], [844, 390]]) {
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 3, mobile: true });
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    await page.setViewportSize({ width: w, height: h });
    await page.goto('http://localhost:4175/', { waitUntil: 'networkidle' }); await page.waitForTimeout(2000);
    const info = await page.evaluate(() => { const b = document.querySelector('.journey').getBoundingClientRect(); return { top: b.top + scrollY, height: b.height } });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    out[`${w}x${h}`] = await page.evaluate(async ({ top, height }) => {
      const dts = []; let last = performance.now(), on = true;
      const tick = (t) => { dts.push(t - last); last = t; if (on) requestAnimationFrame(tick) }; requestAnimationFrame(tick);
      // a reader's pace: about 400px a second
      for (let y = top - innerHeight; y < top + height - innerHeight; y += 12) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)) }
      on = false; dts.sort((a, b) => a - b);
      return { median: +dts[dts.length >> 1].toFixed(1), p95: +dts[Math.floor(dts.length * .95)].toFixed(1), over50: dts.filter((d) => d > 50).length, n: dts.length, stills: document.querySelector('.journey').classList.contains('is-stills') };
    }, info);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: false });
  }
  await cdp.send('Emulation.clearDeviceMetricsOverride');
  return out;
}
