const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 140)));
  page.on('console', m => { if (m.type() === 'error' && !m.text().includes('401')) errs.push('CON: ' + m.text().slice(0, 140)); });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('home og:title:', await page.evaluate(() => (document.querySelector('meta[property="og:title"]') || {}).content));
  console.log('home jsonld has WebSite:', await page.evaluate(() => (document.getElementById('jsonld-page') || { textContent: '' }).textContent.includes('WebSite')));
  await page.goto('http://localhost:3000/#/login', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => { document.getElementById('au-phone').value = '09120000000'; document.getElementById('au-pass').value = 'admin123'; doAuth('login'); });
  await new Promise(r => setTimeout(r, 1500));
  await page.goto('http://localhost:3000/#/admin/payments', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  console.log('payments fields:', await page.evaluate(() => ['py-cn', 'py-gw', 'py-pr', 'py-tk'].map(i => !!document.getElementById(i)).join(',')));
  await page.screenshot({ path: 't-pay.png' });
  await page.goto('http://localhost:3000/#/admin/seo', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('seo score el:', await page.evaluate(() => (document.querySelector('.card .num') || {}).textContent));
  await page.screenshot({ path: 't-seo.png' });
  // run auto seo
  await page.evaluate(() => seoAuto());
  await new Promise(r => setTimeout(r, 4000));
  console.log('after auto, products fixed? re-rendered:', await page.evaluate(() => location.hash));
  // product page jsonld
  await page.goto('http://localhost:3000/#/product/' + 'moon-circle-pendant', { waitUntil: 'networkidle0' }).catch(() => {});
  await new Promise(r => setTimeout(r, 1500));
  console.log('product jsonld Product:', await page.evaluate(() => (document.getElementById('jsonld-page') || { textContent: '' }).textContent.includes('"Product"')));
  console.log('ERRORS:', errs.length ? errs.join(' | ') : 'none');
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
