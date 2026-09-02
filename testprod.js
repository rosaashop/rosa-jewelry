const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:3000/#/product/layered-necklace', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1800));
  console.log('og:type:', await page.evaluate(() => (document.querySelector('meta[property="og:type"]') || {}).content));
  console.log('jsonld Product:', await page.evaluate(() => (document.getElementById('jsonld-page') || { textContent: '' }).textContent.includes('"Product"')));
  console.log('canonical:', await page.evaluate(() => (document.querySelector('link[rel="canonical"]') || {}).href));
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
