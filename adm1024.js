const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });
  await page.goto('http://localhost:3000/#/login', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => { document.getElementById('au-phone').value = '09120000000'; document.getElementById('au-pass').value = 'admin123'; doAuth('login'); });
  await new Promise(r => setTimeout(r, 1500));
  console.log('1024 sw:', await page.evaluate(() => document.documentElement.scrollWidth));
  await page.screenshot({ path: 'd-1024.png' });
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
