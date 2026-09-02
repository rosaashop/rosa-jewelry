/* ROSA storefront pages */
function setMeta(title, desc) {
  document.title = title;
  let m = document.querySelector('meta[name="description"]'); if (!m) { m = document.createElement('meta'); m.name = 'description'; document.head.appendChild(m); }
  if (desc) m.content = desc;
}
const secHead = (eye, title, more) => `<div class="shead"><div class="t"><div class="eyebrow">${eye}</div><h2>${title}</h2></div>${more ? `<a class="more" href="${more[1]}">${more[0]} ${arrEnd()}</a>` : ''}</div>`;

/* ---------------- HOME ---------------- */
async function pageHome() {
  setMeta(L(S.settings.seo.title), L(S.settings.seo.desc));
  const [sliders, cats, nw, best, sale] = await Promise.all([
    API.get('/sliders'), API.get('/categories'),
    API.get('/products?filter=new&limit=8'), API.get('/products?sort=best&limit=8'), API.get('/products?filter=sale&limit=8')
  ]);
  S.cats = cats;
  return `
  <div class="hero" id="hero">
    ${sliders.map((s, i) => `<div class="slide ${i === 0 ? 'on' : ''}">
      <div class="txt"><div class="eyebrow">${esc(L(S.settings.brand))} · ${esc(L(S.settings.tagline))}</div><h1>${esc(L(s.title))}</h1>${(S.settings.slider || {}).sub === false ? '' : `<p>${esc(L(s.subtitle))}</p>`}<a class="btn rose" href="${s.link}">${t('shop_now')}</a></div>
      <div class="img"><img src="${s.image}" alt="${esc(L(s.title))}"></div>
    </div>`).join('')}
    <div class="dots">${sliders.map((s, i) => `<button class="${i === 0 ? 'on' : ''}" onclick="slideGo(${i})"></button>`).join('')}</div>
    ${sliders.length > 1 ? `<button class="arr prev" onclick="slideGo(W.slide-1)">${IC.arrL}</button><button class="arr next" onclick="slideGo(W.slide+1)">${IC.arrR}</button>` : ''}
  </div>
  <section class="blk"><div class="container">
    ${secHead(t('cats_eye'), t('cats_title'))}
    <div class="cats">${cats.map(c => `<a class="cat" href="#/category/${c.slug}"><div class="im"><img loading="lazy" src="${c.image}" alt="${esc(L(c.name))}"></div><b>${esc(L(c.name))}</b></a>`).join('')}</div>
  </div></section>
  <section class="blk alt"><div class="container">
    ${secHead(t('new_eye'), t('new_title'), [t('view_all'), '#/shop?filter=new'])}
    <div class="grid">${nw.map(cardHTML).join('')}</div>
  </div></section>
  <section class="blk"><div class="container">
    ${secHead(t('best_eye'), t('best_title'), [t('view_all'), '#/shop?sort=best'])}
    <div class="grid">${best.map(cardHTML).join('')}</div>
  </div></section>
  <section class="blk alt"><div class="container">
    ${secHead(t('sale_eye'), t('sale_title'), [t('view_all'), '#/shop?filter=sale'])}
    <div class="grid">${sale.map(cardHTML).join('')}</div>
  </div></section>
  <section class="blk"><div class="container about-split">
    <div class="im brand-panel"><img src="${S.settings.logoUrl}" alt="${esc(L(S.settings.brand))}"></div>
    <div>
      <div class="eyebrow" style="font-size:11.5px;letter-spacing:.2em;color:var(--accent-dk);font-weight:700">${t('about_eye')}</div>
      <h2>${t('about_title')}</h2>
      <p>${esc(L(S.settings.footerAbout))}</p>
      <a class="btn outline" href="#/about">${t('about_more')}</a>
      <div class="sig">
        <div><b class="num">${faNum(7)}</b><span>${LANG === 'fa' ? 'سال تجربه' : 'years'}</span></div>
        <div><b class="num">${faNum(120)}+</b><span>${LANG === 'fa' ? 'قطعه منتخب' : 'curated pieces'}</span></div>
        <div><b class="num">${faNum(5400)}+</b><span>${LANG === 'fa' ? 'مشتری خوشحال' : 'happy clients'}</span></div>
      </div>
    </div>
  </div></section>
  <section class="blk alt"><div class="container">
    <div class="benefits">
      <div class="benefit">${IC.truck}<b>${t('b1t')}</b><span>${t('b1d')}</span></div>
      <div class="benefit">${IC.shield}<b>${t('b2t')}</b><span>${t('b2d')}</span></div>
      <div class="benefit">${IC.card}<b>${t('b3t')}</b><span>${t('b3d')}</span></div>
      <div class="benefit">${IC.head}<b>${t('b4t')}</b><span>${t('b4d')}</span></div>
    </div>
  </div></section>`;
}
let slideT;
window.W = { slide: 0 };
function slideGo(i) {
  const slides = document.querySelectorAll('#hero .slide'), dots = document.querySelectorAll('#hero .dots button');
  if (!slides.length) return;
  W.slide = (i + slides.length) % slides.length;
  slides.forEach((s, k) => s.classList.toggle('on', k === W.slide));
  dots.forEach((d, k) => d.classList.toggle('on', k === W.slide));
  clearInterval(slideT); slideT = setInterval(() => slideGo(W.slide + 1), 6000);
}

/* ---------------- SHOP ---------------- */
async function pageShop(q) {
  setMeta(t('shop') + ' | ' + L(S.settings.brand), L(S.settings.seo.desc));
  const cats = S.cats.length ? S.cats : await API.get('/categories'); S.cats = cats;
  const cat = q.get('cat') || '', filter = q.get('filter') || '', sort = q.get('sort') || 'new', search = q.get('q') || '';
  const params = new URLSearchParams(); if (cat) params.set('cat', cat); if (filter) params.set('filter', filter); if (search) params.set('q', search); params.set('sort', sort);
  const list = await API.get('/products?' + params);
  return `<div class="container">
    <div class="page-head"><div class="crumbs"><a href="#/">${t('home')}</a> / <span>${search ? `${t('search_in')} «${esc(search)}»` : t('shop')}</span></div>
    <h1>${search ? `${t('search_in')} «${esc(search)}»` : filter === 'sale' ? t('sale_title') : filter === 'new' ? t('new_title') : t('shop')}</h1></div>
    <div class="toolbar">
      <div class="chips">
        <a class="chip ${!cat ? 'on' : ''}" href="#/shop${filter ? '?filter=' + filter : ''}">${t('all')}</a>
        ${cats.map(c => `<a class="chip ${cat === c.slug ? 'on' : ''}" href="#/category/${c.slug}">${esc(L(c.name))}</a>`).join('')}
      </div>
      <select class="sel" style="width:auto;margin-inline-start:auto" onchange="shopSort(this.value)">
        ${['new', 'best', 'cheap', 'exp', 'discount'].map(s => `<option value="${s}" ${sort === s ? 'selected' : ''}>${t('sort_' + s)}</option>`).join('')}
      </select>
    </div>
    <div style="font-size:12.5px;color:var(--muted);margin-bottom:14px" class="num">${faNum(list.length)} ${t('results')}</div>
    <div class="grid" style="padding-bottom:60px">${list.map(cardHTML).join('') || `<div class="empty" style="grid-column:1/-1">${IC.box}<p>${t('notfound')}</p></div>`}</div>
  </div>`;
}
function shopSort(v) { const h = location.hash.split('?')[0]; const q = new URLSearchParams(location.hash.split('?')[1] || ''); q.set('sort', v); q.delete('filter'); location.hash = h + '?' + q; }

/* ---------------- PRODUCT ---------------- */
async function pageProduct(slug) {
  const p = await API.get('/products/' + slug).catch(() => null);
  if (!p) return `<div class="container empty">${IC.box}<p>${t('notfound')}</p></div>`;
  S.prods[p.id] = p;
  setMeta(L(p.seo.title), L(p.seo.desc));
  const cat = (S.cats || []).find(c => c.id === p.categoryId);
  const rel = await API.get('/products?cat=' + (cat ? cat.slug : '') + '&limit=4');
  const avg = p.reviews.length ? Math.round(p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length) : 0;
  return `<div class="container" style="padding-bottom:60px">
    <div class="page-head"><div class="crumbs"><a href="#/">${t('home')}</a> / <a href="#/shop">${t('shop')}</a> / ${cat ? `<a href="#/category/${cat.slug}">${esc(L(cat.name))}</a> /` : ''} <span>${esc(L(p.name))}</span></div></div>
    <div class="pd">
      <div class="gal">
        <div class="main" id="zoombox" onmousemove="zoomMove(event)" onmouseleave="zoomOut()"><img id="zoomimg" src="${p.images[0]}" alt="${esc(L(p.name))}"></div>
        <div class="thumbs">${p.images.map((im, i) => `<button class="${i === 0 ? 'on' : ''}" onclick="galGo(${i},this)"><img src="${im}"></button>`).join('')}</div>
      </div>
      <div class="pinfo">
        <div class="bgs" style="position:static;display:flex;gap:6px">${p.discount > 0 ? `<span class="badge sale num">${faNum(p.discount)}${LANG === 'fa' ? '٪' : '%'} ${t('off')}</span>` : ''}${p.isNew ? `<span class="badge new">${t('new_eye')}</span>` : ''}</div>
        <h1>${esc(L(p.name))}</h1>
        <div class="meta">${starsHTML(avg)} <span class="num">(${faNum(p.reviews.length)})</span> · <span class="num">${faNum(p.sold)} ${t('sold')}</span></div>
        <div class="big-price">${priceHTML(p, true)}</div>
        <div class="stock ${p.stock === 0 ? 'no' : p.stock <= 5 ? 'low' : 'ok'}">${p.stock === 0 ? t('out_stock') : p.stock <= 5 ? t('low_stock').replace('%n', faNum(p.stock)) : t('in_stock')}</div>
        ${p.colors.length ? `<div style="margin-top:16px"><label class="f">${t('color')}</label><div class="vopt" id="v-color">${p.colors.map((c, i) => `<button class="${i === 0 ? 'on' : ''}" onclick="vPick('v-color',this)">${c}</button>`).join('')}</div></div>` : ''}
        ${p.sizes.length ? `<div style="margin-top:12px"><label class="f">${t('size')}</label><div class="vopt" id="v-size">${p.sizes.map((s, i) => `<button class="${i === 0 ? 'on' : ''}" onclick="vPick('v-size',this)">${s}</button>`).join('')}</div></div>` : ''}
        <div class="pacts">
          <div class="qty"><button onclick="qq(-1)">−</button><b id="qq" class="num">۱</b><button onclick="qq(1)">+</button></div>
          <button class="btn rose" ${p.stock === 0 ? 'disabled' : ''} onclick="addThis('${p.id}')">${IC.bag} ${t('add_cart')}</button>
          <button class="hicon ${S.wish.includes(p.id) ? 'wish on' : ''}" style="border:1px solid var(--line);border-radius:10px;width:48px;height:48px" onclick="toggleWish('${p.id}',this)">${IC.heart}</button>
        </div>
        <div class="tabs">
          <button class="on" onclick="ptab(0,this)">${t('desc')}</button>
          <button onclick="ptab(1,this)">${t('specs')}</button>
          <button onclick="ptab(2,this)">${t('reviews')} <span class="num">(${faNum(p.reviews.length)})</span></button>
        </div>
        <div id="ptab0" class="prose">${(L(p.desc) || '').split('\n').map(x => `<p>${esc(x)}</p>`).join('')}</div>
        <div id="ptab1" class="hidden"><table class="spec-tbl">${(L(p.specs) || []).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table></div>
        <div id="ptab2" class="hidden">
          ${p.reviews.map(r => `<div class="review"><div class="rh"><b>${esc(r.name)}</b>${starsHTML(r.rating)}<span style="font-size:11px;color:var(--muted)">${fmtDate(r.date)}</span></div><p style="font-size:13.5px;color:#4d4642">${esc(r.text)}</p></div>`).join('') || `<p style="color:var(--muted);font-size:13px;padding:10px 0">${t('no_reviews')}</p>`}
          <div class="card" style="margin-top:18px;padding:18px">
            <div class="field"><label class="f">${t('your_name')}</label><input class="inp" id="rv-name" value="${S.user ? esc(S.user.name) : ''}"></div>
            <div class="field"><label class="f">${t('reviews')}</label><div class="vopt" id="v-rate">${[5, 4, 3, 2, 1].map(i => `<button class="${i === 5 ? 'on' : ''}" onclick="vPick('v-rate',this)">${'★'.repeat(i)}</button>`).join('')}</div></div>
            <div class="field"><textarea class="inp" id="rv-text" rows="3" placeholder="${t('review_ph')}"></textarea></div>
            <button class="btn sm" onclick="submitReview('${p.id}')">${t('submit_review')}</button>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top:70px">${secHead('', t('related'))}<div class="grid">${rel.filter(r => r.id !== p.id).map(cardHTML).join('')}</div></div>
  </div>`;
}
function galGo(i, btn) {
  const imgs = document.querySelectorAll('.gal .thumbs button');
  imgs.forEach(b => b.classList.remove('on')); btn.classList.add('on');
  document.getElementById('zoomimg').src = btn.querySelector('img').src;
}
function zoomMove(e) { const b = e.currentTarget, r = b.getBoundingClientRect(); const x = ((e.clientX - r.left) / r.width) * 100, y = ((e.clientY - r.top) / r.height) * 100; const im = document.getElementById('zoomimg'); im.style.transformOrigin = `${x}% ${y}%`; im.style.transform = 'scale(1.9)'; }
function zoomOut() { const im = document.getElementById('zoomimg'); if (im) im.style.transform = 'scale(1)'; }
function vPick(id, btn) { document.querySelectorAll('#' + id + ' button').forEach(b => b.classList.remove('on')); btn.classList.add('on'); }
function vGet(id) { const b = document.querySelector('#' + id + ' button.on'); return b ? b.textContent.trim() : ''; }
function qq(d) { const el = document.getElementById('qq'); let v = parseInt(el.dataset.v || '1') + d; v = Math.max(1, Math.min(9, v)); el.dataset.v = v; el.textContent = faNum(v); }
async function addThis(pid) { const qty = parseInt(document.getElementById('qq').dataset.v || '1'); await addToCart(pid, qty, vGet('v-color'), vGet('v-size')); }
function ptab(i, btn) { document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('on')); btn.classList.add('on'); [0, 1, 2].forEach(k => document.getElementById('ptab' + k).classList.toggle('hidden', k !== i)); }
async function submitReview(pid) {
  const rating = (vGet('v-rate').match(/★/g) || []).length || 5;
  await API.post('/reviews', { pid, name: document.getElementById('rv-name').value, rating, text: document.getElementById('rv-text').value });
  toast(t('review_thanks')); document.getElementById('rv-text').value = '';
}

/* ---------------- CART ---------------- */
function pageCart() {
  setMeta(t('cart_title') + ' | ' + L(S.settings.brand));
  if (!S.cart.length) return `<div class="container empty" style="padding:110px 20px">${IC.bag}<h2>${t('empty_cart')}</h2><p style="margin:10px 0 22px"></p><a class="btn rose" href="#/shop">${t('continue_shop')}</a></div>`;
  const { subtotal, shipping, freeMin } = cartCalc();
  const pct = Math.min(100, Math.round(subtotal / freeMin * 100));
  return `<div class="container" style="padding-bottom:70px"><div class="page-head"><h1>${t('cart_title')}</h1></div>
  <div class="split">
    <div class="card" style="padding:10px 22px">
      ${S.cart.map((i, k) => `<div class="cart-line">
        <div class="im"><a href="#/product/${i.pid}"><img src="${i.image}"></a></div>
        <div><b style="font-size:13.5px">${esc(L(i.name))}</b><div style="font-size:11.5px;color:var(--muted)">${[i.color, i.size].filter(Boolean).join(' · ')}</div><div class="price num" style="font-size:13px;margin-top:4px">${fmtPrice(i.price)}<small>${t('toman')}</small></div></div>
        <div class="qty" style="transform:scale(.85)"><button onclick="cq(${k},-1)">−</button><b class="num">${faNum(i.qty)}</b><button onclick="cq(${k},1)">+</button></div>
        <div class="price num">${fmtPrice(i.price * i.qty)}<small>${t('toman')}</small></div>
        <button class="ibtn danger" onclick="cq(${k},0)">${IC.trash}</button>
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="freebar">${subtotal >= freeMin ? t('free_done') : t('free_left').replace('%n', fmtPrice(freeMin - subtotal))}<div class="bar"><i style="width:${pct}%"></i></div></div>
      <div class="sumrow"><span>${t('subtotal')}</span><span class="num">${fmtPrice(subtotal)} ${t('toman')}</span></div>
      <div class="sumrow"><span>${t('shipping')}</span><span class="num">${shipping ? fmtPrice(shipping) : t('shipping_free')}</span></div>
      <div class="sumrow total"><span>${t('total')}</span><span class="num">${fmtPrice(subtotal + shipping)} ${t('toman')}</span></div>
      <a class="btn rose wide" style="margin-top:16px" href="#/checkout">${t('checkout')}</a>
      <a class="btn ghost wide" style="margin-top:8px" href="#/shop">${t('continue_shop')}</a>
    </div>
  </div></div>`;
}
function cq(k, d) { if (d === 0) S.cart.splice(k, 1); else { S.cart[k].qty += d; if (S.cart[k].qty < 1) S.cart.splice(k, 1); } saveCart(); chromeBadges(); render(); }

/* ---------------- CHECKOUT ---------------- */
let CO = { coupon: null, receiptUrl: '' };
function pageCheckout() {
  setMeta(t('co_title') + ' | ' + L(S.settings.brand));
  if (!S.cart.length) return `<div class="container empty">${IC.bag}<h2>${t('empty_cart')}</h2><a class="btn rose" style="margin-top:16px" href="#/shop">${t('continue_shop')}</a></div>`;
  CO = { coupon: null, receiptUrl: '', method: 'gateway' };
  const { subtotal, shipping } = cartCalc();
  return `<div class="container" style="padding-bottom:70px"><div class="page-head"><div class="crumbs"><a href="#/cart">${t('cart_title')}</a> / <span>${t('co_title')}</span></div><h1>${t('co_title')}</h1></div>
  <div class="split">
    <div>
      <div class="card">
        <h3 style="margin-bottom:16px">${t('info_title')}</h3>
        <div class="formgrid">
          <div class="field"><label class="f">${t('name')}</label><input class="inp" id="co-name" value="${S.user ? esc(S.user.name) : ''}"></div>
          <div class="field"><label class="f">${t('phone')}</label><input class="inp num" id="co-phone" dir="ltr" value="${S.user ? esc(S.user.phone) : ''}"></div>
        </div>
        <div class="field"><label class="f">${t('address')}</label><textarea class="inp" id="co-addr" rows="2"></textarea></div>
        <div class="formgrid">
          <div class="field"><label class="f">${t('city')}</label><input class="inp" id="co-city"></div>
          <div class="field"><label class="f">${t('postal')}</label><input class="inp num" id="co-postal" dir="ltr"></div>
        </div>
        <div class="field"><label class="f">${t('note')}</label><input class="inp" id="co-note"></div>
      </div>
      <div class="card" style="margin-top:18px">
        <h3 style="margin-bottom:16px">${t('pay_method')}</h3>
        <div class="vopt" id="v-pay">
          <button class="on" onclick="payPick('gateway',this)">${IC.card} ${t('pay_gateway')}</button>
          <button onclick="payPick('card',this)">${IC.card} ${t('pay_card')}</button>
        </div>
        <div id="cardbox" class="hidden" style="margin-top:16px">
          <p style="font-size:12.5px;color:var(--muted);background:var(--soft);border-radius:10px;padding:12px 14px;margin-bottom:14px">${t('card_notice')}</p>
          <div class="field"><label class="f">${t('card_number')}</label><div class="inp num" dir="ltr" style="text-align:center;font-weight:800;letter-spacing:.06em">${S.settings.payment.cardNumber} <button class="copy-btn" onclick="copyTxt('${S.settings.payment.cardNumber.replace(/-/g, '')}')">کپی</button></div></div>
          <div class="field"><label class="f">${t('sheba')}</label><div class="inp num" dir="ltr" style="text-align:center;font-size:12px">${S.settings.payment.sheba}</div></div>
          <div class="formgrid">
            <div class="field"><label class="f">${t('upload_receipt')}</label><input type="file" accept="image/*" class="inp" onchange="upReceipt(this)"></div>
            <div class="field"><label class="f">${t('tracking_no')}</label><input class="inp num" id="co-trackno" dir="ltr"></div>
          </div>
          <div id="recprev" style="font-size:12px;color:var(--ok)"></div>
        </div>
      </div>
    </div>
    <div class="card" id="cosum">
      <h3 style="margin-bottom:14px">${t('cart_title')}</h3>
      ${S.cart.map(i => `<div class="sumrow"><span class="num">${esc(L(i.name))} × ${faNum(i.qty)}</span><span class="num">${fmtPrice(i.price * i.qty)}</span></div>`).join('')}
      <div style="display:flex;gap:8px;margin:12px 0"><input class="inp" id="co-coupon" placeholder="${t('coupon_ph')}"><button class="btn ghost sm" onclick="applyCoupon()">${t('apply_coupon')}</button></div>
      <div id="couponmsg" style="font-size:12px;margin-bottom:8px"></div>
      <div id="cosumrows">${coSumRows()}
      <button class="btn rose wide" style="margin-top:16px" onclick="placeOrder()">${t('place_order')}</button></div>
    </div>
  </div></div>`;
}
function coSumRows() {
  const { subtotal, shipping } = cartCalc();
  const d = CO.coupon ? CO.coupon.discount : 0;
  const sh = (subtotal - d) >= (S.settings.shipping.freeMin) ? 0 : shipping;
  return `<div class="sumrow"><span>${t('subtotal')}</span><span class="num">${fmtPrice(subtotal)}</span></div>
  ${d ? `<div class="sumrow"><span>${t('coupon_ph')}</span><span class="num" style="color:var(--ok)">−${fmtPrice(d)}</span></div>` : ''}
  <div class="sumrow"><span>${t('shipping')}</span><span class="num">${sh ? fmtPrice(sh) : t('shipping_free')}</span></div>
  <div class="sumrow total"><span>${t('total')}</span><span class="num">${fmtPrice(subtotal - d + sh)} ${t('toman')}</span></div>`;
}
function payPick(m, btn) { CO.method = m; document.querySelectorAll('#v-pay button').forEach(b => b.classList.remove('on')); btn.classList.add('on'); document.getElementById('cardbox').classList.toggle('hidden', m !== 'card'); }
function copyTxt(s) { navigator.clipboard && navigator.clipboard.writeText(s); toast('✓'); }
async function upReceipt(input) {
  fileToData(input, async data => { const r = await API.post('/upload', { data }); CO.receiptUrl = r.url; document.getElementById('recprev').textContent = '✓ ' + t('upload'); });
}
async function applyCoupon() {
  const code = document.getElementById('co-coupon').value.trim(); const { subtotal } = cartCalc();
  try { CO.coupon = await API.post('/coupon', { code, subtotal }); document.getElementById('couponmsg').innerHTML = `<span style="color:var(--ok)">✓ ${t('coupon_ok')}</span>`; }
  catch (e) { CO.coupon = null; document.getElementById('couponmsg').innerHTML = `<span style="color:var(--err)">${t('coupon_bad')}</span>`; }
  document.getElementById('cosumrows').innerHTML = coSumRows() + `<button class="btn rose wide" style="margin-top:16px" onclick="placeOrder()">${t('place_order')}</button>`;
}
async function placeOrder() {
  const info = { name: document.getElementById('co-name').value.trim(), phone: document.getElementById('co-phone').value.trim(), address: document.getElementById('co-addr').value.trim(), city: document.getElementById('co-city').value.trim(), postal: document.getElementById('co-postal').value.trim() };
  if (!info.name || !info.phone || !info.address) return toast(t('name') + ' / ' + t('phone') + ' / ' + t('address'));
  if (CO.method === 'card' && !CO.receiptUrl) return toast(t('upload_receipt'));
  const o = await API.post('/orders', { items: S.cart.map(i => ({ pid: i.pid, qty: i.qty, color: i.color, size: i.size })), info, note: document.getElementById('co-note').value, method: CO.method, coupon: CO.coupon ? CO.coupon.code : '', receipt: { url: CO.receiptUrl, tracking: (document.getElementById('co-trackno') || {}).value || '' } });
  S.cart = []; saveCart(); chromeBadges();
  if (CO.method === 'gateway') location.hash = '#/pay/' + o.id; else location.hash = '#/success/' + o.id;
}

/* ---------------- gateway sim ---------------- */
async function pagePay(id) {
  const o = await API.get('/orders/' + id);
  setMeta(t('pay_sim_title'));
  return `<div class="container" style="max-width:520px;padding:70px 20px">
    <div class="card" style="text-align:center">
      <div style="width:56px;height:56px;border-radius:50%;background:var(--soft);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;color:var(--accent)">${IC.card}</div>
      <h2 style="margin-bottom:6px">${t('pay_sim_title')} — ${esc(S.settings.payment.gatewayName)}</h2>
      <p style="font-size:12.5px;color:var(--muted);margin-bottom:18px">${t('pay_sim_note').replace('%g', esc(S.settings.payment.gatewayName))}</p>
      <div class="sumrow total" style="border:none;margin:0"><span>${t('total')}</span><span class="num">${fmtPrice(o.total)} ${t('toman')}</span></div>
      <p class="num" style="font-size:12px;color:var(--muted);margin:6px 0 20px">${t('order_code')}: ${o.code}</p>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="btn rose" onclick="paySim('${o.id}',true)">${t('pay_now')}</button>
        <button class="btn outline" onclick="paySim('${o.id}',false)">${t('pay_fail')}</button>
      </div>
    </div>
  </div>`;
}
async function paySim(id, ok) { await API.post(`/orders/${id}/pay`, { success: ok }); location.hash = ok ? '#/success/' + id : '#/order/' + id; }

function pageSuccess(id) {
  return API.get('/orders/' + id).then(o => {
    setMeta(t('order_success'));
    return `<div class="container" style="max-width:560px;padding:80px 20px;text-align:center">
      <div style="width:70px;height:70px;border-radius:50%;background:#e0efe4;color:var(--ok);display:flex;align-items:center;justify-content:center;margin:0 auto 18px">${IC.check}</div>
      <h1 style="margin-bottom:8px">${t('order_success')}</h1>
      <p style="color:var(--muted);font-size:13.5px">${t('order_code')}: <b class="num">${o.code}</b> · ${stPill(o.status)}</p>
      ${o.method === 'card' ? `<p style="font-size:12.5px;color:var(--warn);margin-top:10px">${t('card_notice')}</p>` : ''}
      <div style="display:flex;gap:10px;justify-content:center;margin-top:26px">
        <a class="btn" href="#/order/${o.id}">${t('view_order')}</a>
        <a class="btn outline" href="#/shop">${t('back_home')}</a>
      </div>
    </div>`;
  });
}

/* ---------------- WISHLIST ---------------- */
async function pageWishlist() {
  setMeta(t('wishlist') + ' | ' + L(S.settings.brand));
  const all = await API.get('/products?limit=100');
  const list = all.filter(p => S.wish.includes(p.id));
  return `<div class="container" style="padding-bottom:70px"><div class="page-head"><h1>${t('wishlist')}</h1></div>
  ${list.length ? `<div class="grid">${list.map(cardHTML).join('')}</div>` : `<div class="empty">${IC.heart}<h2>${t('wishlist')}</h2><a class="btn rose" style="margin-top:18px" href="#/shop">${t('continue_shop')}</a></div>`}</div>`;
}

/* ---------------- AUTH ---------------- */
function pageAuth(mode) {
  setMeta(t(mode === 'login' ? 'login_title' : 'register_title'));
  return `<div class="container" style="max-width:440px;padding:70px 20px">
    <div class="card">
      <h2 style="text-align:center;margin-bottom:20px">${t(mode === 'login' ? 'login_title' : 'register_title')}</h2>
      ${mode === 'register' ? `<div class="field"><label class="f">${t('name')}</label><input class="inp" id="au-name"></div>` : ''}
      <div class="field"><label class="f">${t('phone')}</label><input class="inp num" id="au-phone" dir="ltr" placeholder="09xxxxxxxxx"></div>
      <div class="field"><label class="f">${t('password')}</label><input class="inp" id="au-pass" type="password" dir="ltr"></div>
      <button class="btn rose wide" onclick="doAuth('${mode}')">${t(mode === 'login' ? 'submit_login' : 'submit_reg')}</button>
      <p style="text-align:center;font-size:12.5px;margin-top:14px"><a href="#/${mode === 'login' ? 'register' : 'login'}" style="color:var(--accent-dk);font-weight:700">${t(mode === 'login' ? 'no_account' : 'have_account')}</a></p>
      <p style="text-align:center;font-size:11px;color:var(--muted);margin-top:14px;background:var(--bg-soft);border-radius:8px;padding:8px">${t('demo_hint')}</p>
    </div>
  </div>`;
}
async function doAuth(mode) {
  const phone = document.getElementById('au-phone').value.trim(), password = document.getElementById('au-pass').value;
  const body = { phone, password }; if (mode === 'register') body.name = document.getElementById('au-name').value.trim();
  try {
    const r = await API.post('/auth/' + mode, body);
    API.token = r.token; localStorage.setItem('rosa_token', r.token); S.user = r.user;
    toast(t('welcome') + ' ' + r.user.name);
    location.hash = r.user.role === 'admin' ? '#/admin' : '#/account';
  } catch (e) { toast(e.code === 'phone-exists' ? '⚠' : '✕'); }
}

/* ---------------- ACCOUNT ---------------- */
async function pageAccount() {
  if (!S.user) { location.hash = '#/login'; return ''; }
  setMeta(t('my_account'));
  const orders = await API.get('/orders');
  return `<div class="container" style="padding-bottom:70px"><div class="page-head"><h1>${t('my_account')} — ${esc(S.user.name)}</h1></div>
  <div class="split" style="grid-template-columns:240px 1fr">
    <div class="card" style="padding:12px">
      <button class="chip on wide" style="width:100%;text-align:start;margin-bottom:6px" onclick="atab(0,this)">${t('orders')}</button>
      <button class="chip wide" style="width:100%;text-align:start;margin-bottom:6px" onclick="atab(1,this)">${t('profile')}</button>
      <button class="chip wide" style="width:100%;text-align:start;margin-bottom:6px" onclick="logout()">${t('logout')}</button>
      ${S.user.role === 'admin' ? `<a class="chip" style="width:100%;text-align:start;display:block" href="#/admin">${t('admin')}</a>` : ''}
    </div>
    <div>
      <div id="atab0">${orders.length ? orders.map(o => `<div class="card" style="margin-bottom:12px;display:flex;gap:14px;align-items:center;flex-wrap:wrap">
        <b class="num">${o.code}</b><span style="font-size:11.5px;color:var(--muted)">${fmtDate(o.createdAt)}</span>${stPill(o.status)}
        <span class="price num" style="margin-inline-start:auto">${fmtPrice(o.total)}<small>${t('toman')}</small></span>
        <a class="btn sm outline" href="#/order/${o.id}">${t('view')}</a>
      </div>`).join('') : `<div class="empty">${IC.box}<p>${t('empty_orders')}</p></div>`}</div>
      <div id="atab1" class="card hidden">
        <div class="field"><label class="f">${t('name')}</label><input class="inp" id="pf-name" value="${esc(S.user.name)}"></div>
        <div class="field"><label class="f">${t('password')}</label><input class="inp" id="pf-pass" type="password" dir="ltr" placeholder="••••••"></div>
        <button class="btn sm" onclick="saveProfile()">${t('save')}</button>
      </div>
    </div>
  </div></div>`;
}
function atab(i, btn) { btn.parentElement.querySelectorAll('.chip').forEach(b => b.classList.remove('on')); btn.classList.add('on'); [0, 1].forEach(k => { const el = document.getElementById('atab' + k); if (el) el.classList.toggle('hidden', k !== i); }); }
async function saveProfile() {
  const body = { name: document.getElementById('pf-name').value.trim() };
  const p = document.getElementById('pf-pass').value; if (p) body.password = p;
  await API.put('/me', body); S.user.name = body.name; toast(t('saved'));
}
async function logout() { await API.post('/auth/logout', {}); API.token = ''; localStorage.removeItem('rosa_token'); S.user = null; location.hash = '#/'; }

/* ---------------- ORDER DETAIL (invoice + timeline) ---------------- */
async function pageOrder(id) {
  const o = await API.get('/orders/' + id);
  setMeta(t('orders') + ' ' + o.code);
  const flow = ['pending_payment', 'paid', 'preparing', 'shipped', 'delivered'];
  const curIdx = o.status === 'canceled' ? -1 : flow.indexOf(o.status);
  return `<div class="container" style="padding-bottom:70px">
    <div class="page-head"><div class="crumbs"><a href="#/account">${t('my_account')}</a> / <span>${o.code}</span></div><h1>${t('invoice')} <span class="num">${o.code}</span></h1></div>
    <div class="split">
      <div>
        <div class="card" style="padding:10px 22px">
          ${o.items.map(i => `<div class="cart-line" style="grid-template-columns:70px 1fr auto">
            <div class="im" style="width:70px;height:70px"><img src="${i.image}"></div>
            <div><b style="font-size:13.5px">${esc(L(i.name))}</b><div style="font-size:11.5px;color:var(--muted)">${[i.color, i.size].filter(Boolean).join(' · ')} · <span class="num">×${faNum(i.qty)}</span></div></div>
            <div class="price num">${fmtPrice(i.price * i.qty)}<small>${t('toman')}</small></div>
          </div>`).join('')}
          <div style="padding:14px 0">
            <div class="sumrow"><span>${t('subtotal')}</span><span class="num">${fmtPrice(o.subtotal)}</span></div>
            ${o.discount ? `<div class="sumrow"><span>${t('coupon_ph')} ${o.couponCode}</span><span class="num" style="color:var(--ok)">−${fmtPrice(o.discount)}</span></div>` : ''}
            <div class="sumrow"><span>${t('shipping')}</span><span class="num">${o.shipping ? fmtPrice(o.shipping) : t('shipping_free')}</span></div>
            <div class="sumrow total"><span>${t('total')}</span><span class="num">${fmtPrice(o.total)} ${t('toman')}</span></div>
          </div>
        </div>
        ${o.method === 'card' && o.receipt && o.receipt.status === 'rejected' ? `<div class="card" style="margin-top:14px;border-color:var(--err)">
          <p style="font-size:13px;color:var(--err);font-weight:700;margin-bottom:10px">✕ ${t('st_pending_payment')}</p>
          <div class="formgrid"><div class="field"><input type="file" class="inp" accept="image/*" onchange="reUp(this,'${o.id}')"></div><div class="field"><input class="inp num" id="re-track" dir="ltr" placeholder="${t('tracking_no')}"></div></div>
        </div>` : ''}
      </div>
      <div>
        <div class="card" style="margin-bottom:14px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><b>${o.code}</b>${stPill(o.status)}</div>
          <div class="tl">${(o.status === 'awaiting_confirm' ? ['awaiting_confirm'] : flow).map((s, i) => {
            const on = o.status === 'awaiting_confirm' ? true : i <= curIdx;
            const ev = o.timeline.filter(x => x.t === s).pop();
            return `<div class="step ${on ? 'on' : ''}"><b>${t('st_' + s)}</b><span>${ev ? fmtDate(ev.date) : ''}</span></div>`;
          }).join('')}</div>
          ${o.trackingCode ? `<div style="margin-top:12px;background:var(--soft);border-radius:10px;padding:10px 14px;font-size:12.5px">${t('shipping_code')}: <b class="num">${o.trackingCode}</b></div>` : ''}
          <button class="btn ghost sm wide" style="margin-top:14px" onclick="window.print()">${IC.file} ${t('print')}</button>
        </div>
        <div class="card"><b style="font-size:13px">${t('info_title')}</b><p style="font-size:12.5px;color:var(--muted);margin-top:8px">${esc(o.info.name)} · <span class="num">${esc(o.info.phone)}</span><br>${esc(o.info.city || '')}، ${esc(o.info.address || '')}</p></div>
      </div>
    </div>
  </div>`;
}
function reUp(input, id) { fileToData(input, async data => { const r = await API.post('/upload', { data }); await API.post(`/orders/${id}/receipt`, { url: r.url, tracking: (document.getElementById('re-track') || {}).value || '' }); toast(t('saved')); render(); }); }

/* ---------------- TRACK ---------------- */
function pageTrack() {
  setMeta(t('track_title'));
  return `<div class="container" style="max-width:520px;padding:70px 20px">
    <div class="card">
      <h2 style="margin-bottom:6px">${t('track_title')}</h2>
      <p style="font-size:12.5px;color:var(--muted);margin-bottom:18px">${t('track_desc')}</p>
      <div class="field"><label class="f">${t('order_code')}</label><input class="inp num" id="tr-code" dir="ltr" placeholder="RS-1002"></div>
      <div class="field"><label class="f">${t('phone')}</label><input class="inp num" id="tr-phone" dir="ltr"></div>
      <button class="btn rose wide" onclick="doTrack()">${t('track_btn')}</button>
      <div id="tr-res" style="margin-top:20px"></div>
    </div>
  </div>`;
}
async function doTrack() {
  const code = document.getElementById('tr-code').value.trim(), phone = document.getElementById('tr-phone').value.trim();
  try {
    const o = await API.get(`/track?code=${encodeURIComponent(code)}&phone=${encodeURIComponent(phone)}`);
    const flow = ['pending_payment', 'paid', 'preparing', 'shipped', 'delivered'];
    document.getElementById('tr-res').innerHTML = `<div class="card" style="border:none;background:var(--bg-soft)">
      <div style="display:flex;justify-content:space-between;margin-bottom:14px"><b class="num">${o.code}</b>${stPill(o.status)}</div>
      <div class="tl">${(o.status === 'awaiting_confirm' ? ['awaiting_confirm'] : flow).map((s, i) => `<div class="step ${o.status !== 'awaiting_confirm' && i > flow.indexOf(o.status) ? '' : 'on'}"><b>${t('st_' + s)}</b></div>`).join('')}</div>
      ${o.trackingCode ? `<p style="font-size:12.5px;margin-top:10px">${t('shipping_code')}: <b class="num">${o.trackingCode}</b></p>` : ''}
    </div>`;
  } catch (e) { document.getElementById('tr-res').innerHTML = `<p style="color:var(--err);font-size:13px">${t('track_nf')}</p>`; }
}

/* ---------------- STATIC ---------------- */
function pageStatic(key, title) {
  const pg = S.pagesCache && S.pagesCache[key];
  setMeta(t(title) + ' | ' + L(S.settings.brand));
  return `<div class="container" style="max-width:820px;padding-bottom:70px"><div class="page-head"><h1>${t(title)}</h1></div>
  <div class="card prose">${(pg ? L(pg) : '').split('\n').map(x => x ? `<p>${esc(x)}</p>` : '').join('')}</div></div>`;
}
function pageAbout() {
  const pg = S.pagesCache && S.pagesCache.about;
  setMeta(t('about') + ' | ' + L(S.settings.brand));
  return `<div class="container" style="padding-bottom:70px">
    <div class="about-split" style="padding-top:50px">
      <div class="im brand-panel"><img src="${S.settings.logoUrl}" alt="${esc(L(S.settings.brand))}"></div>
      <div><div class="eyebrow" style="font-size:11.5px;letter-spacing:.2em;color:var(--accent-dk);font-weight:700">${t('about_eye')}</div><h2>${t('about_title')}</h2>
      ${(pg ? L(pg) : '').split('\n').map(x => x ? `<p style="color:var(--muted);margin-bottom:12px">${esc(x)}</p>` : '').join('')}</div>
    </div>
    <div style="margin-top:60px"><div class="benefits">
      <div class="benefit">${IC.truck}<b>${t('b1t')}</b><span>${t('b1d')}</span></div>
      <div class="benefit">${IC.shield}<b>${t('b2t')}</b><span>${t('b2d')}</span></div>
      <div class="benefit">${IC.card}<b>${t('b3t')}</b><span>${t('b3d')}</span></div>
      <div class="benefit">${IC.head}<b>${t('b4t')}</b><span>${t('b4d')}</span></div>
    </div></div>
  </div>`;
}
async function pageFaq() {
  setMeta(t('faq'));
  const faqs = await API.get('/faqs');
  return `<div class="container" style="max-width:820px;padding-bottom:70px"><div class="page-head"><h1>${t('faq')}</h1></div>
  ${faqs.map(f => `<div class="faq-item"><button class="q" onclick="this.parentElement.classList.toggle('open')">${esc(L(f.q))} ${IC.plus}</button><div class="a">${esc(L(f.a))}</div></div>`).join('')}
  </div>`;
}
function pageContact() {
  setMeta(t('contact'));
  const c = S.settings.contact;
  return `<div class="container" style="padding-bottom:70px"><div class="page-head"><h1>${t('contact')}</h1></div>
  <div class="split" style="grid-template-columns:1fr 1fr">
    <div class="card">
      <div class="field"><label class="f">${t('name')}</label><input class="inp" id="ct-name"></div>
      <div class="field"><label class="f">${t('phone')}</label><input class="inp num" id="ct-phone" dir="ltr"></div>
      <div class="field"><label class="f">${t('msg_text')}</label><textarea class="inp" id="ct-msg" rows="5"></textarea></div>
      <button class="btn rose" onclick="toast(t('msg_sent'));document.getElementById('ct-msg').value=''">${t('send_msg')}</button>
    </div>
    <div class="card">
      <p style="display:flex;gap:10px;align-items:start;margin-bottom:14px">${IC.pin}<span>${esc(L(c.address))}</span></p>
      <p style="display:flex;gap:10px;align-items:start;margin-bottom:14px">${IC.phone}<span class="num">${faNum(c.phone)} · <span class="num">${faNum(c.mobile)}</span></span></p>
      <p style="display:flex;gap:10px;align-items:start;margin-bottom:14px">${IC.mail}<span>${c.email}</span></p>
      <p style="display:flex;gap:10px;align-items:start">${IC.head}<span>${esc(L(c.hours))}</span></p>
    </div>
  </div></div>`;
}
