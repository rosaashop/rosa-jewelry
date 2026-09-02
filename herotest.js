const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 4000));
  const st = await page.evaluate(() => { const v = document.querySelector('.hero-video video'); return { ready: !!document.querySelector('.hero-video.ready'), dur: v ? v.duration : 0, w: v ? v.videoWidth : 0 }; });
  console.log('video:', JSON.stringify(st));
  await page.screenshot({ path: 'hero-new.png' });
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
