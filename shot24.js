const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  const el = await page.$('.pcard .prices');
  await el.screenshot({ path: 's-price.png' });
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
