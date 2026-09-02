const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 120)));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('qadd buttons on home:', await page.evaluate(() => document.querySelectorAll('.pcard .qadd').length));
  await page.evaluate(() => document.querySelector('.pcard .qadd').click());
  await new Promise(r => setTimeout(r, 800));
  console.log('cart badge:', await page.evaluate(() => (document.querySelector('.hicon .cnt') || {}).textContent));
  await page.goto('http://localhost:3000/#/login', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => { document.getElementById('au-phone').value = '09120000000'; document.getElementById('au-pass').value = 'admin123'; doAuth('login'); });
  await new Promise(r => setTimeout(r, 1500));
  console.log('side-user buttons:', await page.evaluate(() => [...document.querySelectorAll('.side-user button')].map(b => b.textContent.trim()).join(' | ')));
  console.log('logo in sidebar visible size:', await page.evaluate(() => { const i = document.querySelector('.admin .side .brand img'); const r = i.getBoundingClientRect(); return Math.round(r.width) + 'x' + Math.round(r.height); }));
  // password change flow
  await page.evaluate(() => pwModal());
  await new Promise(r => setTimeout(r, 500));
  await page.evaluate(() => { document.getElementById('pw-cur').value = 'admin123'; document.getElementById('pw-new').value = 'admin1234'; document.getElementById('pw-new2').value = 'admin1234'; pwSave(); });
  await new Promise(r => setTimeout(r, 1500));
  const ok1 = await page.evaluate(async () => { try { const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone: '09120000000', password: 'admin1234' }) }); return r.ok; } catch (e) { return false; } });
  console.log('new password works:', ok1);
  // revert
  await page.evaluate(async () => { const t = localStorage.getItem('rosa_token'); await fetch('/api/me', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + t }, body: JSON.stringify({ password: 'admin123' }) }); });
  // settings page: no card fields
  await page.goto('http://localhost:3000/#/admin/settings', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));
  console.log('settings still has st-cn?', await page.evaluate(() => !!document.getElementById('st-cn')));
  // logout
  await page.evaluate(() => logout());
  await new Promise(r => setTimeout(r, 1000));
  console.log('after logout hash:', await page.evaluate(() => location.hash));
  console.log('ERRORS:', errs.length ? errs.join(' | ') : 'none');
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
