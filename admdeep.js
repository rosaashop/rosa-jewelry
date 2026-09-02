const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 140)));
  page.on('console', m => { if (m.type() === 'error' && !m.text().includes('401')) errs.push('CON: ' + m.text().slice(0, 140)); });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/#/login', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => { document.getElementById('au-phone').value = '09120000000'; document.getElementById('au-pass').value = 'admin123'; doAuth('login'); });
  await new Promise(r => setTimeout(r, 1500));
  // order detail
  await page.goto('http://localhost:3000/#/admin/orders', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => { const b = document.querySelector('.tbl tbody tr .ibtn, .tbl tbody tr button'); if (b) b.click(); });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'd-order.png' });
  // product edit modal
  await page.goto('http://localhost:3000/#/admin/products', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => { window.pEdit ? pEdit(document.querySelector('.tbl tbody tr') ? undefined : undefined) : null; });
  const hasEdit = await page.evaluate(() => { const btns = [...document.querySelectorAll('.tbl .ibtn')]; return btns.length; });
  await page.evaluate(() => { const btns = [...document.querySelectorAll('.tbl .ibtn')]; if (btns[1]) btns[1].click(); else if (btns[0]) btns[0].click(); });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: 'd-prodedit.png' });
  // customers & coupons
  await page.goto('http://localhost:3000/#/admin/customers', { waitUntil: 'networkidle0' }); await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: 'd-customers.png' });
  await page.goto('http://localhost:3000/#/admin/coupons', { waitUntil: 'networkidle0' }); await new Promise(r => setTimeout(r, 900));
  await page.screenshot({ path: 'd-coupons.png' });
  console.log('edit buttons found:', hasEdit);
  console.log('ERRORS:', errs.length ? errs.join(' | ') : 'none');
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
