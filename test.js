const { JSDOM, VirtualConsole } = require('jsdom');
const BASE = 'http://localhost:3000';
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if (!/Could not parse CSS/.test(String(e))) errors.push('JSDOM: ' + e.message); });
vc.on('error', (...a) => errors.push('CONSOLE: ' + a.join(' ')));

async function open(hash) {
  const dom = await JSDOM.fromURL(BASE + '/' + hash, {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(window) {
      window.fetch = (input, init) => globalThis.fetch(new URL(String(input), BASE), init);
      window.scrollTo = () => {};
      window.confirm = () => true;
      window.addEventListener('error', e => errors.push('PAGE: ' + e.message));
    }
  });
  await new Promise(r => setTimeout(r, 2500));
  return dom;
}
const txt = d => d.window.document.body.textContent;

(async () => {
  const d1 = await open('#/');
  const b = txt(d1);
  console.log('HOME len=', d1.window.document.getElementById('app').innerHTML.length);
  console.log('has hero:', !!d1.window.document.querySelector('.hero .slide.on'), '| cards:', d1.window.document.querySelectorAll('.pcard').length, '| cats:', d1.window.document.querySelectorAll('.cat').length);
  console.log('footer:', b.includes('خدمات مشتری') || b.includes('Customer care'));

  const d2 = await open('#/product/moon-pendant');
  console.log('PRODUCT:', d2.window.document.querySelector('.pinfo h1')?.textContent, '| thumbs:', d2.window.document.querySelectorAll('.gal .thumbs button').length, '| tabs:', d2.window.document.querySelectorAll('.tabs button').length);

  const d3 = await open('#/shop?filter=sale');
  console.log('SHOP sale cards:', d3.window.document.querySelectorAll('.pcard').length);

  const d4 = await open('#/cart');
  console.log('CART empty msg:', txt(d4).includes('سبد شما خالی'));

  const d5 = await open('#/login');
  console.log('LOGIN form:', !!d5.window.document.getElementById('au-phone'));

  // login as admin via UI state
  const d6 = await open('#/admin');
  console.log('ADMIN redirects to login:', d6.window.location.hash);

  console.log('ERRORS:', errors.length ? errors.slice(0, 12) : 'none');
  process.exit(0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
