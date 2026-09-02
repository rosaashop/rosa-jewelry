/* ROSA router & boot */
function shade(hex, f) { const n = parseInt(hex.slice(1), 16); const d = x => Math.max(0, Math.round(x * f)); return '#' + [d(n >> 16 & 255), d(n >> 8 & 255), d(n & 255)].map(x => x.toString(16).padStart(2, '0')).join(''); }
function applyVars() {
  const c = S.settings.colors, r = document.documentElement.style;
  r.setProperty('--accent', c.accent); r.setProperty('--accent-dk', shade(c.accent, .82)); r.setProperty('--soft', c.soft); r.setProperty('--blush', c.blush); r.setProperty('--ink', c.ink);
  const hv = S.settings.hero || {};
  r.setProperty('--hero-h', (hv.h || 460) + 'px'); r.setProperty('--hero-hm', (hv.hm || 500) + 'px');
  let f = document.querySelector('link[rel="icon"]'); if (!f) { f = document.createElement('link'); f.rel = 'icon'; document.head.appendChild(f); } f.href = S.settings.favicon;
}
async function boot() {
  S.settings = await API.get('/settings');
  S.pagesCache = await API.get('/pages').catch(() => ({}));
  if (!LANG) LANG = S.settings.defaultLang || 'fa';
  applyLang(); applyVars();
  try { S.user = await API.get('/me'); } catch (e) { S.user = null; }
  render();
}
async function render() {
  const hash = location.hash.slice(2) || '';
  const [pathPart, queryPart] = hash.split('?');
  const parts = pathPart.split('/').filter(Boolean);
  const q = new URLSearchParams(queryPart || '');
  const app = document.getElementById('app');
  if (S.settings.maintenance && parts[0] !== 'admin' && !(S.user && S.user.role === 'admin')) {
    app.innerHTML = `<div class="maint"><div><img src="${S.settings.logoUrl}" style="height:90px;margin:0 auto 20px;mix-blend-mode:multiply"><h1>${t('maint_title')}</h1><p style="color:var(--muted)">${t('maint_desc')}</p></div></div>`;
    return;
  }
  if (parts[0] === 'admin') { app.innerHTML = await adminRoute(parts.slice(1)); window.scrollTo(0, 0); return; }
  const r = parts[0] || '';
  let html = '';
  if (r === '') html = await pageHome();
  else if (r === 'shop') html = await pageShop(q);
  else if (r === 'category') { q.set('cat', parts[1]); html = await pageShop(q); }
  else if (r === 'product') html = await pageProduct(parts[1]);
  else if (r === 'cart') html = pageCart();
  else if (r === 'checkout') html = pageCheckout();
  else if (r === 'pay') html = await pagePay(parts[1]);
  else if (r === 'success') html = await pageSuccess(parts[1]);
  else if (r === 'wishlist') html = await pageWishlist();
  else if (r === 'login') html = pageAuth('login');
  else if (r === 'register') html = pageAuth('register');
  else if (r === 'account') html = await pageAccount();
  else if (r === 'order') html = await pageOrder(parts[1]);
  else if (r === 'track') html = pageTrack();
  else if (r === 'about') html = pageAbout();
  else if (r === 'contact') html = pageContact();
  else if (r === 'faq') html = await pageFaq();
  else if (r === 'terms') html = pageStatic('terms', 'terms');
  else if (r === 'privacy') html = pageStatic('privacy', 'privacy');
  else if (r === 'shipping') html = pageStatic('shipping', 'shipping_ret');
  else html = `<div class="container empty" style="padding:120px 20px">${IC.box}<h2>${t('notfound')}</h2></div>`;
  app.innerHTML = headerHTML() + html + footerHTML();
  const navMap = { '': 'home', shop: 'shop', category: 'shop', product: 'shop', about: 'about', contact: 'contact' };
  const on = navMap[r]; if (on) { const a = document.querySelector(`nav.main a[data-nav="${on}"]`); if (a) a.classList.add('on'); }
  const hv = document.querySelector('#hero.hero-video');
  if (hv) requestAnimationFrame(() => requestAnimationFrame(() => hv.classList.add('go')));
  if (document.getElementById('pg-key')) pgLoad();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', render);
boot();
