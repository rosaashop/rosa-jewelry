const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('PAGE[' + location + ']: ' + e.message.slice(0, 100)));
  page.on('console', m => { if (m.type() === 'error' && !m.text().includes('401')) errs.push('CON: ' + m.text().slice(0, 120)); });
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000/#/login', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => { document.getElementById('au-phone').value = '09120000000'; document.getElementById('au-pass').value = 'admin123'; doAuth('login'); });
  await new Promise(r => setTimeout(r, 1800));
  const routes = ['', 'products', 'categories', 'orders', 'customers', 'coupons', 'content', 'settings'];
  for (const r of routes) {
    await page.goto('http://localhost:3000/#/admin' + (r ? '/' + r : ''), { waitUntil: 'networkidle0' });
    await new Promise(res => setTimeout(res, 1200));
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    console.log('route', r || 'dash', 'sw:', sw);
    await page.screenshot({ path: 'd-' + (r || 'dash') + '.png' });
  }
  console.log('ERRORS:', errs.length ? errs.join(' | ') : 'none');
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
