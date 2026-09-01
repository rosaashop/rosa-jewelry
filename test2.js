const { JSDOM, VirtualConsole } = require('jsdom');
const BASE = 'http://localhost:3000';
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { if (!/Could not parse CSS/.test(String(e))) errors.push('JSDOM: ' + e.message); });
vc.on('error', (...a) => errors.push('CONSOLE: ' + a.join(' ')));

async function login(phone, pass) {
  const r = await fetch(BASE + '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, password: pass }) });
  return (await r.json()).token;
}
async function open(hash, { token, cart } = {}) {
  const dom = await JSDOM.fromURL(BASE + '/' + hash, {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(window) {
      window.fetch = (input, init) => globalThis.fetch(new URL(String(input), BASE), init);
      window.scrollTo = () => {}; window.confirm = () => true;
      if (token) window.localStorage.setItem('rosa_token', token);
      if (cart) window.localStorage.setItem('rosa_cart', JSON.stringify(cart));
      window.addEventListener('error', e => errors.push('PAGE: ' + e.message));
    }
  });
  await new Promise(r => setTimeout(r, 2200));
  return dom;
}
const go = async (dom, hash, wait = 1800) => { dom.window.location.hash = hash; await new Promise(r => setTimeout(r, wait)); };

(async () => {
  const admTok = await login('09120000000', 'admin123');
  const usrTok = await login('09121112233', '1234');

  const d = await open('#/admin', { token: admTok });
  console.log('DASH revenue shown:', d.window.document.body.textContent.includes('فروش کل'), '| chart cols:', d.window.document.querySelectorAll('.chart .col').length);
  await go(d, '#/admin/products'); console.log('PRODUCTS rows:', d.window.document.querySelectorAll('.tbl tr').length);
  await go(d, '#/admin/orders'); console.log('ORDERS rows:', d.window.document.querySelectorAll('.tbl tr').length);
  const oid = 'o4';
  await go(d, '#/admin/orders/' + oid); console.log('ORDER DETAIL receipt box:', !!d.window.document.querySelector('.receipt-box'), '| status select:', !!d.window.document.getElementById('oo-status'));
  await go(d, '#/admin/settings'); console.log('SETTINGS inputs:', d.window.document.querySelectorAll('.admin .inp, .admin .sel').length);
  await go(d, '#/admin/content'); console.log('CONTENT reviews rows:', d.window.document.querySelectorAll('.tbl').length);
  await go(d, '#/admin/coupons'); console.log('COUPONS rows:', d.window.document.querySelectorAll('.tbl tr').length);
  await go(d, '#/admin/sliders'); console.log('SLIDERS rows:', d.window.document.querySelectorAll('.tbl tr').length);
  d.window.close();

  const cart = [{ pid: 'p1', qty: 1, color: 'طلایی', size: '', price: 2850000, name: { fa: 'گردنبند آویز حلقه ماه', en: 'x' }, image: '/assets/img/products/n1.jpg' }];
  const d2 = await open('#/cart', { token: usrTok, cart });
  console.log('CART line:', !!d2.window.document.querySelector('.cart-line'), '| freebar:', !!d2.window.document.querySelector('.freebar'));
  await go(d2, '#/checkout');
  console.log('CHECKOUT pay buttons:', d2.window.document.querySelectorAll('#v-pay button').length, '| cardbox hidden:', d2.window.document.getElementById('cardbox').classList.contains('hidden'));
  await go(d2, '#/account');
  console.log('ACCOUNT orders:', d2.window.document.querySelectorAll('#atab0 .card').length);
  await go(d2, '#/order/o1');
  console.log('INVOICE timeline steps:', d2.window.document.querySelectorAll('.tl .step').length);
  await go(d2, '#/track'); console.log('TRACK form:', !!d2.window.document.getElementById('tr-code'));
  await go(d2, '#/faq'); console.log('FAQ items:', d2.window.document.querySelectorAll('.faq-item').length);
  // language switch
  d2.window.eval("setLang('en')"); await new Promise(r => setTimeout(r, 1500));
  console.log('EN mode dir:', d2.window.document.documentElement.dir, '| h1:', d2.window.document.querySelector('.page-head h1')?.textContent || d2.window.document.body.textContent.slice(0, 40));
  console.log('ERRORS:', errors.length ? errors.slice(0, 15) : 'none');
  process.exit(0);
})().catch(e => { console.error('FATAL', e); process.exit(1); });
