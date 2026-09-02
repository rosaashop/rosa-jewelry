const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push('PAGE: ' + e.message.slice(0, 120)));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('https://rosa-jewelry.rosaashop.workers.dev/#/login', { waitUntil: 'networkidle0', timeout: 45000 });
  await new Promise(r => setTimeout(r, 1200));
  await page.evaluate(() => { document.getElementById('au-phone').value = '09120000000'; document.getElementById('au-pass').value = 'admin123'; doAuth('login'); });
  await new Promise(r => setTimeout(r, 2000));
  console.log('live desktop admin sw:', await page.evaluate(() => document.documentElement.scrollWidth), '| sidebar visible:', await page.evaluate(() => getComputedStyle(document.querySelector('.admin .side')).display));
  await page.screenshot({ path: 'live-d-dash.png' });
  console.log('ERRORS:', errs.join(' | ') || 'none');
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
