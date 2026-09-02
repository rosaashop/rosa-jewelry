const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => document.querySelectorAll('.pcard')[2].scrollIntoView({ block: 'center' }));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 's-card.png' });
  await page.evaluate(() => document.querySelector('.pcard .qadd').click());
  await new Promise(r => setTimeout(r, 700));
  console.log('cart badge:', await page.evaluate(() => (document.querySelector('.hicon .cnt') || {}).textContent));
  // mobile view of card
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 800));
  console.log('mobile sw:', await page.evaluate(() => document.documentElement.scrollWidth));
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
