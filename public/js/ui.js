/* ROSA ui — icons, chrome, cards */
const IC = {
  search: '<svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  user: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/></svg>',
  heart: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 20s-7-4.6-9.2-9C1.2 7.6 3 4.5 6.4 4.5c2 0 3.6 1.1 4.6 2.8 1-1.7 2.6-2.8 4.6-2.8 3.4 0 5.2 3.1 3.6 6.5C17 15.4 12 20 12 20z"/></svg>',
  bag: '<svg class="ic" viewBox="0 0 24 24"><path d="M6 8h12l1 12H5L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  cart: '<svg class="ic" viewBox="0 0 24 24"><circle cx="9.5" cy="20" r="1.5"/><circle cx="17.5" cy="20" r="1.5"/><path d="M3 4h2.3l2.3 11.2h10.3L20.5 7.5H6.4"/></svg>',
  menu: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  star: '<svg class="ic" viewBox="0 0 24 24"><path d="m12 3 2.7 5.8 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 3 1.2-6.1L3 9.6l6.3-.8z"/></svg>',
  truck: '<svg class="ic" viewBox="0 0 24 24"><path d="M1 5h13v11H1zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  shield: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  card: '<svg class="ic" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  head: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 13a8 8 0 0 1 16 0"/><rect x="2" y="13" width="4" height="6" rx="2"/><rect x="18" y="13" width="4" height="6" rx="2"/><path d="M20 19a3 3 0 0 1-3 3h-3"/></svg>',
  plus: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  x: '<svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  trash: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>',
  edit: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 20h4L20 8l-4-4L4 16v4z"/></svg>',
  check: '<svg class="ic" viewBox="0 0 24 24"><path d="m5 13 4 4L19 7"/></svg>',
  arrL: '<svg class="ic" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  arrR: '<svg class="ic" viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg>',
  inst: '<svg class="ic" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/></svg>',
  tele: '<svg class="ic" viewBox="0 0 24 24"><path d="m21 4-4 16-6-5-3 3v-4l8-8-10 6-4-2z"/></svg>',
  whats: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M9 9c0 4 3 7 7 7l1-2-2.5-1-1 1c-1.5-.5-2.5-1.5-3-3l1-1-1-2.5z"/></svg>',
  pin: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  phone: '<svg class="ic" viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  mail: '<svg class="ic" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  box: '<svg class="ic" viewBox="0 0 24 24"><path d="m12 2 9 5v10l-9 5-9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/></svg>',
  upload: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 16V4m0 0 4 4m-4-4-4 4"/><path d="M4 16v4h16v-4"/></svg>',
  globe: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/></svg>',
  home: '<svg class="ic" viewBox="0 0 24 24"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/></svg>',
  chart: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/></svg>',
  set: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.6a7 7 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2 1.2L10 21h4l.5-2.6a7 7 0 0 0 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2z"/></svg>',
  file: '<svg class="ic" viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6"/></svg>'
};
const arrEnd = () => document.documentElement.dir === 'rtl' ? IC.arrL : IC.arrR;

function headerHTML() {
  const st = S.settings;
  return `
  <div class="topbar"><div class="container">
    <span>${esc(L(st.announcement))}</span>
    <div class="tb-links">
      <a href="#/track">${t('track')}</a><a href="#/faq">${t('faq')}</a><a href="#/contact">${t('contact')}</a>
    </div>
  </div></div>
  <header class="site"><div class="container hrow">
    <button class="hicon burger" onclick="mnav(true)">${IC.menu}</button>
    <a class="logo" href="#/"><img src="${st.logoUrl}" alt="${esc(L(st.brand))}"></a>
    <nav class="main">
      <a href="#/" data-nav="home">${t('home')}</a>
      <a href="#/shop" data-nav="shop">${t('shop')}</a>
      <a href="#/shop?filter=sale" data-nav="sale">${t('sale_title')}</a>
      <a href="#/about" data-nav="about">${t('about')}</a>
      <a href="#/contact" data-nav="contact">${t('contact')}</a>
    </nav>
    <div class="hactions">
      <div class="lang-sw"><button class="${LANG === 'fa' ? 'on' : ''}" onclick="setLang('fa')">فا</button><button class="${LANG === 'en' ? 'on' : ''}" onclick="setLang('en')">EN</button></div>
      <button class="hicon" onclick="toggleSearch()" aria-label="search">${IC.search}</button>
      <a class="hicon" href="${S.user ? '#/account' : '#/login'}" aria-label="account">${IC.user}</a>
      <a class="hicon" href="#/wishlist" aria-label="wishlist">${IC.heart}${S.wish.length ? `<span class="cnt">${faNum(S.wish.length)}</span>` : ''}</a>
      <a class="hicon" href="#/cart" aria-label="cart">${IC.bag}${cartCount() ? `<span class="cnt">${faNum(cartCount())}</span>` : ''}</a>
    </div>
  </div>
  <div class="searchbar" id="searchbar"><div class="container">
    <input class="inp" id="q" placeholder="${t('search_ph')}" onkeydown="if(event.key==='Enter')goSearch()">
    <button class="btn rose" onclick="goSearch()">${IC.search}<span>${t('search')}</span></button>
  </div></div>
  </header>
  <div class="mnav" id="mnav"><div class="veil" onclick="mnav(false)"></div><div class="panel">
    <a class="logo" href="#/" onclick="mnav(false)" style="margin-bottom:16px"><img src="${st.logoUrl}" style="height:56px;mix-blend-mode:multiply"></a>
    <a class="mlink" href="#/" onclick="mnav(false)">${t('home')}</a>
    <a class="mlink" href="#/shop" onclick="mnav(false)">${t('shop')}</a>
    <a class="mlink" href="#/shop?filter=sale" onclick="mnav(false)">${t('sale_title')}</a>
    <a class="mlink" href="#/about" onclick="mnav(false)">${t('about')}</a>
    <a class="mlink" href="#/contact" onclick="mnav(false)">${t('contact')}</a>
    <a class="mlink" href="#/track" onclick="mnav(false)">${t('track')}</a>
    <a class="mlink" href="#/wishlist" onclick="mnav(false)">${t('wishlist')}</a>
    <a class="mlink" href="${S.user ? '#/account' : '#/login'}" onclick="mnav(false)">${S.user ? t('my_account') : t('login')}</a>
  </div></div>`;
}
function footerHTML() {
  const st = S.settings, c = st.contact, so = st.socials;
  return `<footer class="site"><div class="container">
    <div class="cols">
      <div>
        <div class="flogo"><img src="${st.logoUrl}" alt="ROSA"></div>
        <p style="font-size:13px">${esc(L(st.footerAbout))}</p>
        <div class="socials">
          <a href="${so.instagram}" target="_blank" aria-label="instagram">${IC.inst}</a>
          <a href="${so.telegram}" target="_blank" aria-label="telegram">${IC.tele}</a>
          <a href="${so.whatsapp}" target="_blank" aria-label="whatsapp">${IC.whats}</a>
        </div>
      </div>
      <div><h4>${t('f_quick')}</h4>
        <a href="#/shop">${t('shop')}</a><a href="#/shop?filter=new">${t('new_title')}</a><a href="#/shop?filter=best">${t('best_title')}</a><a href="#/shop?filter=sale">${t('sale_title')}</a><a href="#/wishlist">${t('wishlist')}</a>
      </div>
      <div><h4>${t('f_service')}</h4>
        <a href="#/track">${t('track')}</a><a href="#/faq">${t('faq')}</a><a href="#/terms">${t('terms')}</a><a href="#/privacy">${t('privacy')}</a><a href="#/shipping">${t('shipping_ret')}</a>
      </div>
      <div><h4>${t('f_contact')}</h4>
        <a href="tel:${c.phone}">${IC.phone}<span style="margin-inline-start:6px" class="num">${faNum(c.phone)}</span></a>
        <a href="mailto:${c.email}">${IC.mail}<span style="margin-inline-start:6px">${c.email}</span></a>
        <a href="#/contact">${IC.pin}<span style="margin-inline-start:6px">${esc(L(c.address))}</span></a>
        <h4 style="margin-top:18px">${t('f_news')}</h4>
        <div class="newsletter"><input class="inp" placeholder="${t('news_ph')}"><button class="btn rose sm" onclick="toast(t('msg_sent'))">${t('subscribe')}</button></div>
      </div>
    </div>
    <div class="bottom"><span>${t('all_rights').replace('%y', faNum(new Date().getFullYear()))}</span><span>${esc(L(st.tagline))}</span></div>
  </div></footer>`;
}

function priceHTML(p, big) {
  const off = p.discount > 0;
  return `<span class="price ${big ? '' : 'num'}">${fmtPrice(p.final)}<small>${t('toman')}</small></span>${off ? `<span class="oldprice num">${fmtPrice(p.price)}</span>` : ''}`;
}
function cardHTML(p) {
  const cat = (S.cats || []).find(c => c.id === p.categoryId);
  const wished = S.wish.includes(p.id);
  return `<div class="pcard">
    <div class="im"><a href="#/product/${p.slug}"><img loading="lazy" src="${p.images[0]}" alt="${esc(L(p.name))}"></a>
      <div class="bgs">${p.discount > 0 ? `<span class="badge sale num">${faNum(p.discount)}${LANG === 'fa' ? '٪' : '%'}</span>` : ''}${p.isNew ? `<span class="badge new">${t('new_eye')}</span>` : ''}</div>
      <button class="wish ${wished ? 'on' : ''}" onclick="toggleWish('${p.id}',this)" aria-label="wishlist">${IC.heart}</button>
    </div>
    <div class="body">
      <span class="cat-name">${cat ? esc(L(cat.name)) : ''}</span>
      <h3><a href="#/product/${p.slug}">${esc(L(p.name))}</a></h3>
      <div class="prices">${priceHTML(p)}<button class="qadd" onclick="addToCart('${p.id}')" aria-label="add to cart" title="${t('add_cart')}">${IC.cart}</button></div>
    </div>
  </div>`;
}
function starsHTML(r) { let h = ''; for (let i = 1; i <= 5; i++) h += `<span class="${i <= r ? '' : 'off'}">${IC.star}</span>`; return `<span class="stars">${h}</span>`; }
function stPill(s) { return `<span class="st ${s}">${t('st_' + s)}</span>`; }

let toastTimer;
function toast(msg) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600); }
function modalOpen(html) { document.getElementById('modal').innerHTML = `<div class="veil" onclick="modalClose()"></div><div class="box"><button class="hicon x" onclick="modalClose()">${IC.x}</button>${html}</div>`; document.getElementById('modal').classList.add('open'); }
function modalClose() { document.getElementById('modal').classList.remove('open'); }
function mnav(open) { document.getElementById('mnav').classList.toggle('open', open); }
function toggleSearch() { const el = document.getElementById('searchbar'); el.classList.toggle('open'); if (el.classList.contains('open')) document.getElementById('q').focus(); }
function goSearch() { const q = document.getElementById('q').value.trim(); location.hash = '#/shop?q=' + encodeURIComponent(q); document.getElementById('searchbar').classList.remove('open'); }

async function addToCart(pid, qty = 1, color = '', size = '') {
  let p = S.prods[pid]; if (!p) { p = await API.get('/products/' + pid); S.prods[pid] = p; }
  if (p.stock <= 0) return toast(t('out_stock'));
  const ex = S.cart.find(i => i.pid === pid && i.color === color && i.size === size);
  if (ex) ex.qty += qty; else S.cart.push({ pid, qty, color, size, price: p.final, name: p.name, image: p.images[0] });
  saveCart(); chromeBadges(); toast(t('added'));
}
function toggleWish(pid, el) {
  const i = S.wish.indexOf(pid);
  if (i >= 0) S.wish.splice(i, 1); else S.wish.push(pid);
  saveWish(); chromeBadges();
  if (el) el.classList.toggle('on', S.wish.includes(pid));
}
function chromeBadges() {
  document.querySelectorAll('a.hicon[href="#/cart"] .cnt').forEach(e => e.remove());
  const c = document.querySelector('a.hicon[href="#/cart"]'); if (c && cartCount()) c.insertAdjacentHTML('beforeend', `<span class="cnt">${faNum(cartCount())}</span>`);
  document.querySelectorAll('a.hicon[href="#/wishlist"] .cnt').forEach(e => e.remove());
  const w = document.querySelector('a.hicon[href="#/wishlist"]'); if (w && S.wish.length) w.insertAdjacentHTML('beforeend', `<span class="cnt">${faNum(S.wish.length)}</span>`);
}
function fileToData(input, cb) { const f = input.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => cb(r.result); r.readAsDataURL(f); }
