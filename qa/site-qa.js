// Phase 6 click-through on a phone (390×844, touch). Checks:
// - the menu: opens; Escape and the back button close it; every link in it lands on a page with a heading
// - the header: 44px controls; steps away on scroll down and comes back on scroll up; the "On this page" row sits below it
// - the footer: accordion groups open; every link resolves; Back to top reaches the top
// - the fixed buttons: the homepage Call/Sound bar shows in the journey and tucks away at the contact panel;
//   the advice quote bar shows mid-page and steps aside at the emergency band and the form
// Use with browser_run_code_unsafe (filename). Returns the problems, and a count of what passed.
async (page) => {
  const B = 'http://localhost:4175/';
  const cdp = await page.context().newCDPSession(page);
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await page.setViewportSize({ width: 390, height: 844 });
  const bad = [], ok = {};
  const pass = (k) => { ok[k] = (ok[k] || 0) + 1 };
  const expanded = () => page.evaluate(() => document.querySelector('.hd-menu').getAttribute('aria-expanded'));

  // 1. menu
  await page.goto(B + 'stay/', { waitUntil: 'networkidle' });
  await page.click('.hd-menu'); await page.waitForTimeout(700);
  const menuLinks = await page.evaluate(() => [...document.querySelectorAll('#menu a[href]')].map((a) => a.href).filter((h) => h.startsWith(location.origin)));
  if (await expanded() !== 'true') bad.push('menu did not open'); else pass('menu opens');
  await page.keyboard.press('Escape'); await page.waitForTimeout(500);
  if (await expanded() !== 'false') bad.push('Escape did not close the menu'); else pass('Escape closes the menu');
  await page.click('.hd-menu'); await page.waitForTimeout(600);
  await page.goBack(); await page.waitForTimeout(700);
  if (!page.url().includes('/stay/') || await expanded() === 'true') bad.push('back button did more than close the menu: ' + page.url()); else pass('back button closes the menu');
  for (const u of [...new Set(menuLinks.map((h) => h.split('#')[0]))]) {
    const res = await page.goto(u, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(150);
    const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent.trim());
    if (!res || res.status() >= 400 || !h1) bad.push(`menu link ${u}: ${res && res.status()} ${h1 ? '' : '(no heading)'}`); else pass('menu links land');
  }

  // 2. header
  await page.goto(B + 'activities/plan-your-visit/', { waitUntil: 'networkidle' });
  const hd = await page.evaluate(() => [...document.querySelectorAll('.hd a, .hd button')].filter((e) => e.getBoundingClientRect().width).map((e) => { const b = e.getBoundingClientRect(); return [String(e.className || e.tagName).split(' ')[0], Math.round(b.width), Math.round(b.height)] }));
  hd.forEach(([n, w, h]) => { if (w < 43.5 || h < 43.5) bad.push(`header target ${n} ${w}×${h}`); else pass('header targets 44px') });
  await page.evaluate(async () => { for (let y = 0; y < 2400; y += 200) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) } });
  await page.waitForTimeout(500);
  const hidden = await page.evaluate(() => document.querySelector('.hd').getBoundingClientRect().bottom <= 2);
  await page.evaluate(async () => { for (let y = 2400; y > 1600; y -= 100) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)) } });
  await page.waitForTimeout(600);
  const back = await page.evaluate(() => document.querySelector('.hd').getBoundingClientRect().bottom > 40);
  if (!hidden) bad.push('header did not step away on scroll down'); else pass('header steps away on scroll');
  if (!back) bad.push('header did not come back on scroll up'); else pass('header comes back');
  const otp = await page.evaluate(() => { const o = document.querySelector('.otp'); if (!o) return null; const b = o.getBoundingClientRect(), h = document.querySelector('.hd').getBoundingClientRect(); return { top: Math.round(b.top), hdBottom: Math.round(h.bottom) } });
  if (otp && otp.top < otp.hdBottom - 1) bad.push(`"On this page" row under the header: ${JSON.stringify(otp)}`); else pass('"On this page" row clear of the header');

  // 3. footer
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight)); await page.waitForTimeout(800);
  for (const t of await page.$$('.ft-tog')) {
    await t.click(); await page.waitForTimeout(250)
    if (await t.getAttribute('aria-expanded') !== 'true') bad.push('a footer group did not open'); else pass('footer groups open')
    await t.click(); await page.waitForTimeout(150)
  }
  const ftLinks = await page.evaluate(() => [...document.querySelectorAll('footer a[href]')].map((a) => a.href).filter((h) => h.startsWith(location.origin)));
  for (const u of [...new Set(ftLinks.map((h) => h.split('#')[0]))]) { const r = await page.request.get(u); if (r.status() >= 400) bad.push(`footer link ${u} ${r.status()}`); else pass('footer links resolve') }
  await page.click('.ft-top'); await page.waitForTimeout(1600);
  if (await page.evaluate(() => scrollY) > 50) bad.push('Back to top did not reach the top'); else pass('Back to top');

  // 4. fixed buttons
  await page.goto(B, { waitUntil: 'networkidle' }); await page.waitForTimeout(2000);
  await page.evaluate(async () => { const j = document.querySelector('.j-block-first'); const to = j ? j.getBoundingClientRect().top + scrollY + 200 : 3000; for (let y = 0; y < to; y += 300) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)) } });
  await page.waitForTimeout(900);
  const bar = await page.evaluate(() => { const c = document.querySelector('.j-controls'); if (!c) return null; return { on: c.classList.contains('is-on'), call: Math.round(document.querySelector('.j-call')?.getBoundingClientRect().height || 0) } });
  if (!bar || !bar.on) bad.push('homepage Call/Sound bar not showing in the journey ' + JSON.stringify(bar)); else pass('homepage Call bar shows');
  if (bar && bar.call < 43.5) bad.push('homepage Call button under 44px');
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView()); await page.waitForTimeout(1200);
  if (await page.evaluate(() => document.querySelector('.j-controls')?.classList.contains('is-on'))) bad.push('Call bar still over the contact panel'); else pass('Call bar tucks away at the contact panel');
  await page.goto(B + 'advice-and-guidance/', { waitUntil: 'networkidle' });
  const qbar = () => page.evaluate(() => document.querySelector('.qbar')?.classList.contains('is-on'));
  await page.evaluate(() => document.getElementById('included').scrollIntoView()); await page.waitForTimeout(900);
  if (!await qbar()) bad.push('advice quote bar not showing mid-page'); else pass('advice quote bar shows');
  await page.evaluate(() => document.getElementById('emergency').scrollIntoView({ block: 'center' })); await page.waitForTimeout(900);
  if (await qbar()) bad.push('advice quote bar over the emergency band'); else pass('quote bar steps aside at the emergency band');
  await page.evaluate(() => document.getElementById('quote').scrollIntoView()); await page.waitForTimeout(900);
  if (await qbar()) bad.push('advice quote bar over the form'); else pass('quote bar steps aside at the form');

  await cdp.send('Emulation.clearDeviceMetricsOverride');
  return JSON.stringify({ problems: bad, passed: ok }, null, 1);
}
