/* ROSA admin panel */
const A_SECTIONS = [['', 'dash', 'chart'], ['products', 'products', 'box'], ['categories', 'categories_m', 'pin'], ['orders', 'orders_m', 'truck'], ['customers', 'customers', 'user'], ['coupons', 'coupons', 'card'], ['content', 'content', 'edit'], ['settings', 'settings_m', 'set']];
function adminShell(inner, on) {
  return `<div class="admin"><aside class="side">
    <div class="brand"><img src="${S.settings.logoUrl}"><b style="color:#fff">${esc(L(S.settings.brand))}</b></div>
    ${A_SECTIONS.map(([k, lbl, ic]) => `<a href="#/admin${k ? '/' + k : ''}" class="${on === k ? 'on' : ''}">${IC[ic]} ${t(lbl)}</a>`).join('')}
    <a href="#/" >${IC.home} ${t('home')}</a>
  </aside><main class="main">${inner}</main></div>`;
}
function adminGuard() { if (!S.user || S.user.role !== 'admin') { location.hash = '#/login'; return false; } return true; }

async function aDash() {
  const s = await API.get('/stats'); const orders = (await API.get('/orders')).slice(0, 6);
  const max = Math.max(...s.days.map(d => d.total), 1);
  return adminShell(`<h1>${t('dash')}</h1>
  <div class="stats">
    <div class="stat"><span>${t('revenue')}</span><b class="num">${fmtPrice(s.revenue)}</b><i>${t('toman')}</i></div>
    <div class="stat"><span>${t('orders_count')}</span><b class="num">${faNum(s.orders)}</b><i>${faNum(s.pendingReceipts)} ${t('pending_receipts')}</i></div>
    <div class="stat"><span>${t('customers_count')}</span><b class="num">${faNum(s.customers)}</b></div>
    <div class="stat"><span>${t('low_stock')} / ${t('pending_reviews')}</span><b class="num">${faNum(s.lowStock)} / ${faNum(s.pendingReviews)}</b></div>
  </div>
  <h1 style="font-size:15px">${t('last7')}</h1>
  <div class="chart">${s.days.map(d => `<div class="col ${d.total === max && d.total > 0 ? 'max' : ''}"><i style="height:${Math.max(4, Math.round(d.total / max * 100))}%"></i><span class="num">${d.label}</span></div>`).join('')}</div>
  <h1 style="font-size:15px;margin-top:26px">${t('recent_orders')}</h1>
  <table class="tbl"><tr><th>${t('order_code')}</th><th>${t('customer')}</th><th>${t('total_c')}</th><th>${t('status')}</th><th></th></tr>
  ${orders.map(o => `<tr><td class="num">${o.code}</td><td>${esc(o.info.name || '')}</td><td class="num">${fmtPrice(o.total)}</td><td>${stPill(o.status)}</td><td><a class="ibtn" href="#/admin/orders/${o.id}">${IC.edit}</a></td></tr>`).join('')}
  </table>`, '');
}

/* ---- products ---- */
async function aProducts() {
  const [list, cats] = await Promise.all([API.get('/products'), API.get('/categories')]);
  return adminShell(`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px"><h1 style="margin:0">${t('products')}</h1><button class="btn rose sm" onclick="pEdit(null)">${IC.plus} ${t('add_product')}</button></div>
  <table class="tbl"><tr><th></th><th>${t('name_fa')}</th><th>${t('price')}</th><th>${t('discount')}</th><th>${t('stock')}</th><th>${t('status')}</th><th></th></tr>
  ${list.map(p => `<tr><td><img class="th" src="${p.images[0]}"></td><td>${esc(p.name.fa)}<br><small style="color:var(--muted)">${esc(p.name.en)}</small></td><td class="num">${fmtPrice(p.price)}</td><td class="num">${faNum(p.discount)}٪</td><td class="num" style="${p.stock <= 3 ? 'color:var(--err);font-weight:800' : ''}">${faNum(p.stock)}</td><td>${p.status === 'active' ? t('active') : t('inactive')}</td>
  <td><div class="rowact"><a class="ibtn" href="#/product/${p.slug}" title="${t('view')}">${IC.search}</a><button class="ibtn" onclick="pEdit('${p.id}')">${IC.edit}</button><button class="ibtn danger" onclick="delItem('products','${p.id}')">${IC.trash}</button></div></td></tr>`).join('')}
  </table>`, 'products');
}
async function pEdit(id) {
  const cats = await API.get('/categories');
  const p = id ? await API.get('/products/' + id) : { name: { fa: '', en: '' }, price: 0, discount: 0, stock: 0, images: [], colors: [], sizes: [], desc: { fa: '', en: '' }, specs: { fa: [], en: [] }, status: 'active', isNew: false, seo: { title: { fa: '' }, desc: { fa: '' } } };
  modalOpen(`<h2 style="margin-bottom:16px">${id ? t('edit') : t('add_product')}</h2>
  <div class="formgrid">
    <div class="field"><label class="f">${t('name_fa')}</label><input class="inp" id="pe-nfa" value="${esc(p.name.fa)}"></div>
    <div class="field"><label class="f">${t('name_en')}</label><input class="inp" id="pe-nen" value="${esc(p.name.en)}"></div>
    <div class="field"><label class="f">${t('price')}</label><input class="inp num" id="pe-price" value="${p.price}"></div>
    <div class="field"><label class="f">${t('discount')}</label><input class="inp num" id="pe-disc" value="${p.discount}"></div>
    <div class="field"><label class="f">${t('stock')}</label><input class="inp num" id="pe-stock" value="${p.stock}"></div>
    <div class="field"><label class="f">${t('category')}</label><select class="sel" id="pe-cat">${cats.map(c => `<option value="${c.id}" ${p.categoryId === c.id ? 'selected' : ''}>${esc(c.name.fa)}</option>`).join('')}</select></div>
    <div class="field"><label class="f">${t('colors_f')}</label><input class="inp" id="pe-colors" value="${(p.colors || []).join('، ')}"></div>
    <div class="field"><label class="f">${t('sizes_f')}</label><input class="inp" id="pe-sizes" value="${(p.sizes || []).join('، ')}"></div>
  </div>
  <div class="field"><label class="f">${t('images')}</label><textarea class="inp" id="pe-imgs" rows="3">${(p.images || []).join('\n')}</textarea>
  <input type="file" accept="image/*" style="font-size:12px;margin-top:6px" onchange="fileToData(this,async d=>{const r=await API.post('/upload',{data:d});document.getElementById('pe-imgs').value+=(document.getElementById('pe-imgs').value?'\\n':'')+r.url;})"></div>
  <div class="field"><label class="f">${t('desc_fa')}</label><textarea class="inp" id="pe-dfa" rows="3">${esc(p.desc.fa)}</textarea></div>
  <div class="field"><label class="f">${t('desc_en')}</label><textarea class="inp" id="pe-den" rows="2">${esc(p.desc.en)}</textarea></div>
  <div class="formgrid">
    <div class="field"><label class="f">${t('seo_title_f')}</label><input class="inp" id="pe-st" value="${esc((p.seo.title || {}).fa || '')}"></div>
    <div class="field"><label class="f">${t('seo_desc_f')}</label><input class="inp" id="pe-sd" value="${esc((p.seo.desc || {}).fa || '')}"></div>
  </div>
  <div style="display:flex;gap:18px;margin:8px 0 16px">
    <label style="font-size:13px;display:flex;gap:6px;align-items:center"><input type="checkbox" id="pe-new" ${p.isNew ? 'checked' : ''}> ${t('is_new')}</label>
    <label style="font-size:13px;display:flex;gap:6px;align-items:center"><input type="checkbox" id="pe-active" ${p.status === 'active' ? 'checked' : ''}> ${t('active')}</label>
  </div>
  <button class="btn rose" onclick="pSave('${id || ''}')">${t('save')}</button>`);
}
async function pSave(id) {
  const split = s => s.split(/[,،]/).map(x => x.trim()).filter(Boolean);
  const body = {
    name: { fa: document.getElementById('pe-nfa').value, en: document.getElementById('pe-nen').value },
    price: +document.getElementById('pe-price').value || 0, discount: +document.getElementById('pe-disc').value || 0,
    stock: +document.getElementById('pe-stock').value || 0, categoryId: document.getElementById('pe-cat').value,
    colors: split(document.getElementById('pe-colors').value), sizes: split(document.getElementById('pe-sizes').value),
    images: document.getElementById('pe-imgs').value.split('\n').map(x => x.trim()).filter(Boolean),
    desc: { fa: document.getElementById('pe-dfa').value, en: document.getElementById('pe-den').value },
    isNew: document.getElementById('pe-new').checked, status: document.getElementById('pe-active').checked ? 'active' : 'hidden',
    seo: { title: { fa: document.getElementById('pe-st').value }, desc: { fa: document.getElementById('pe-sd').value } }
  };
  if (id) await API.put('/products/' + id, body); else await API.post('/products', body);
  modalClose(); render(); toast(t('saved'));
}
async function delItem(kind, id) { if (!confirm(t('confirm_del'))) return; await API.del(`/${kind}/${id}`); render(); }

/* ---- categories ---- */
async function aCats() {
  const list = await API.get('/categories');
  return adminShell(`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px"><h1 style="margin:0">${t('categories_m')}</h1><button class="btn rose sm" onclick="cEdit(null)">${IC.plus} ${t('add')}</button></div>
  <table class="tbl"><tr><th></th><th>${t('name_fa')}</th><th>${t('name_en')}</th><th>${t('order_f')}</th><th></th></tr>
  ${list.map(c => `<tr><td><img class="th" src="${c.image}" style="border-radius:50%"></td><td>${esc(c.name.fa)}</td><td>${esc(c.name.en)}</td><td class="num">${faNum(c.order)}</td><td><div class="rowact"><button class="ibtn" onclick="cEdit('${c.id}')">${IC.edit}</button><button class="ibtn danger" onclick="delItem('categories','${c.id}')">${IC.trash}</button></div></td></tr>`).join('')}</table>`, 'categories');
}
async function cEdit(id) {
  const c = id ? (await API.get('/categories')).find(x => x.id === id) : { name: { fa: '', en: '' }, image: '', order: 1 };
  modalOpen(`<h2 style="margin-bottom:16px">${t('categories_m')}</h2>
  <div class="formgrid"><div class="field"><label class="f">${t('name_fa')}</label><input class="inp" id="ce-fa" value="${esc(c.name.fa)}"></div>
  <div class="field"><label class="f">${t('name_en')}</label><input class="inp" id="ce-en" value="${esc(c.name.en)}"></div>
  <div class="field"><label class="f">${t('order_f')}</label><input class="inp num" id="ce-or" value="${c.order}"></div>
  <div class="field"><label class="f">${t('image_url')}</label><input class="inp" id="ce-im" value="${esc(c.image)}" dir="ltr"></div></div>
  <input type="file" accept="image/*" style="font-size:12px" onchange="fileToData(this,async d=>{const r=await API.post('/upload',{data:d});document.getElementById('ce-im').value=r.url;})">
  <div style="margin-top:16px"><button class="btn rose" onclick="cSave('${id || ''}')">${t('save')}</button></div>`);
}
async function cSave(id) {
  const body = { name: { fa: document.getElementById('ce-fa').value, en: document.getElementById('ce-en').value }, order: +document.getElementById('ce-or').value || 1, image: document.getElementById('ce-im').value };
  if (!body.slug && !id) body.slug = 'cat-' + Date.now().toString(36);
  id ? await API.put('/categories/' + id, body) : await API.post('/categories', body);
  modalClose(); render();
}

/* ---- orders ---- */
async function aOrders() {
  const list = await API.get('/orders');
  return adminShell(`<h1>${t('orders_m')}</h1>
  <table class="tbl"><tr><th>${t('order_code')}</th><th>${t('customer')}</th><th>${t('method')}</th><th>${t('total_c')}</th><th>${t('status')}</th><th>${t('date')}</th><th></th></tr>
  ${list.map(o => `<tr><td class="num">${o.code}</td><td>${esc(o.info.name || '')}<br><small class="num" style="color:var(--muted)">${esc(o.info.phone || '')}</small></td><td>${o.method === 'card' ? t('card2card') : t('gateway')}${o.method === 'card' && o.receipt && o.receipt.status === 'pending' ? ' ⏳' : ''}</td><td class="num">${fmtPrice(o.total)}</td><td>${stPill(o.status)}</td><td style="font-size:11px">${fmtDate(o.createdAt)}</td><td><a class="ibtn" href="#/admin/orders/${o.id}">${IC.edit}</a></td></tr>`).join('')}
  </table>`, 'orders');
}
async function aOrder(id) {
  const o = await API.get('/orders/' + id);
  return adminShell(`<h1>${o.code} — ${esc(o.info.name || '')}</h1>
  <div class="stats" style="grid-template-columns:1fr 1fr">
    <div class="card">
      <b style="font-size:13px">${t('items')}</b>
      ${o.items.map(i => `<div class="sumrow"><span>${esc(L(i.name))} × <span class="num">${faNum(i.qty)}</span></span><span class="num">${fmtPrice(i.price * i.qty)}</span></div>`).join('')}
      <div class="sumrow total"><span>${t('total_c')}</span><span class="num">${fmtPrice(o.total)}</span></div>
      <p style="font-size:12px;color:var(--muted);margin-top:10px">${esc(o.info.city || '')}، ${esc(o.info.address || '')} · <span class="num">${esc(o.info.postal || '')}</span></p>
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><b style="font-size:13px">${t('status')}</b>${stPill(o.status)}</div>
      ${o.method === 'card' && o.receipt ? `<div class="receipt-box" style="margin-bottom:14px">
        ${o.receipt.url ? `<img src="${o.receipt.url}" style="max-height:180px;margin:0 auto 10px;border-radius:8px">` : ''}
        <p style="font-size:12px">${t('tracking_no')}: <b class="num">${esc(o.receipt.tracking || '')}</b></p>
        ${o.receipt.status === 'pending' ? `<div style="display:flex;gap:8px;justify-content:center;margin-top:10px"><button class="btn sm" style="background:var(--ok)" onclick="revReview('${o.id}','approve')">${IC.check} ${t('approve')}</button><button class="btn sm danger" onclick="revReview('${o.id}','reject')">${IC.x} ${t('reject')}</button></div>` : `<p style="font-size:12px;font-weight:700;color:${o.receipt.status === 'approved' ? 'var(--ok)' : 'var(--err)'};margin-top:6px">${o.receipt.status === 'approved' ? '✓ ' + t('approve') : '✕ ' + t('reject')}</p>`}
      </div>` : ''}
      <div class="field"><label class="f">${t('change_status')}</label><select class="sel" id="oo-status">
        ${['pending_payment', 'awaiting_confirm', 'paid', 'preparing', 'shipped', 'delivered', 'canceled'].map(s => `<option value="${s}" ${o.status === s ? 'selected' : ''}>${t('st_' + s)}</option>`).join('')}
      </select></div>
      <div class="field"><label class="f">${t('shipping_code')}</label><input class="inp num" id="oo-track" value="${esc(o.trackingCode)}" dir="ltr"></div>
      <button class="btn rose sm" onclick="oSave('${o.id}')">${t('save')}</button>
    </div>
  </div>`, 'orders');
}
async function revReview(id, action) { await API.post(`/orders/${id}/review-receipt`, { action }); render(); toast(t('saved')); }
async function oSave(id) { await API.put('/orders/' + id, { status: document.getElementById('oo-status').value, trackingCode: document.getElementById('oo-track').value }); toast(t('saved')); render(); }

/* ---- customers ---- */
async function aCustomers() {
  const list = await API.get('/customers');
  return adminShell(`<h1>${t('customers')}</h1><table class="tbl"><tr><th>${t('name')}</th><th>${t('phone')}</th><th>${t('orders')}</th><th>${t('date')}</th></tr>
  ${list.map(c => `<tr><td>${esc(c.name)}</td><td class="num">${esc(c.phone)}</td><td class="num">${faNum(c.orders)}</td><td style="font-size:11px">${fmtDate(c.createdAt)}</td></tr>`).join('')}</table>`, 'customers');
}

/* ---- coupons ---- */
async function aCoupons() {
  const list = await API.get('/coupons');
  return adminShell(`<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px"><h1 style="margin:0">${t('coupons')}</h1><button class="btn rose sm" onclick="cpEdit(null)">${IC.plus} ${t('add')}</button></div>
  <table class="tbl"><tr><th>${t('code')}</th><th>${t('type')}</th><th>${t('value')}</th><th>${t('min_order')}</th><th>${t('status')}</th><th></th></tr>
  ${list.map(c => `<tr><td class="num" style="font-weight:800">${c.code}</td><td>${t(c.type === 'percent' ? 'percent' : 'fixed')}</td><td class="num">${faNum(c.value)}</td><td class="num">${fmtPrice(c.minOrder || 0)}</td><td>${c.active ? t('active') : t('inactive')}</td><td><div class="rowact"><button class="ibtn" onclick="cpEdit('${c.id}')">${IC.edit}</button><button class="ibtn danger" onclick="delItem('coupons','${c.id}')">${IC.trash}</button></div></td></tr>`).join('')}</table>`, 'coupons');
}
function cpEdit(id) {
  modalOpen(`<h2 style="margin-bottom:16px">${t('coupons')}</h2><div class="formgrid">
  <div class="field"><label class="f">${t('code')}</label><input class="inp num" id="cp-code" dir="ltr"></div>
  <div class="field"><label class="f">${t('type')}</label><select class="sel" id="cp-type"><option value="percent">${t('percent')}</option><option value="fixed">${t('fixed')}</option></select></div>
  <div class="field"><label class="f">${t('value')}</label><input class="inp num" id="cp-val"></div>
  <div class="field"><label class="f">${t('min_order')}</label><input class="inp num" id="cp-min"></div>
  <div class="field"><label class="f">${t('expires')} (YYYY-MM-DD)</label><input class="inp num" id="cp-exp" dir="ltr"></div>
  <div class="field"><label class="f"><input type="checkbox" id="cp-active" checked> ${t('active')}</label></div></div>
  <button class="btn rose" onclick="cpSave('${id || ''}')">${t('save')}</button>`);
}
async function cpSave(id) {
  const body = { code: document.getElementById('cp-code').value.trim(), type: document.getElementById('cp-type').value, value: +document.getElementById('cp-val').value || 0, minOrder: +document.getElementById('cp-min').value || 0, expires: document.getElementById('cp-exp').value, active: document.getElementById('cp-active').checked };
  id ? await API.put('/coupons/' + id, body) : await API.post('/coupons', body);
  modalClose(); render();
}


/* ---- content: reviews / faqs / pages ---- */
async function aContent() {
  const [revs, faqs] = await Promise.all([API.get('/reviews'), API.get('/faqs')]);
  return adminShell(`<h1>${t('content')}</h1>
  <h1 style="font-size:15px">${t('reviews_m')}</h1>
  <table class="tbl" style="margin-bottom:30px"><tr><th>${t('customer')}</th><th>${t('reviews')}</th><th>${t('status')}</th><th></th></tr>
  ${revs.map(r => `<tr><td>${esc(r.name)}</td><td style="max-width:340px">${starsHTML(r.rating)}<br><small>${esc(r.text)}</small></td><td>${r.status === 'approved' ? t('approve') : '⏳'}</td>
  <td><div class="rowact">${r.status !== 'approved' ? `<button class="ibtn" onclick="rvMod('${r.id}','approved')">${IC.check}</button>` : ''}<button class="ibtn danger" onclick="delItem('reviews','${r.id}')">${IC.trash}</button></div></td></tr>`).join('')}</table>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><h1 style="font-size:15px;margin:0">${t('faqs_m')}</h1><button class="btn rose sm" onclick="fqEdit(null)">${IC.plus} ${t('add')}</button></div>
  <table class="tbl" style="margin-bottom:30px"><tr><th>${t('faq')}</th><th></th></tr>
  ${faqs.map(f => `<tr><td>${esc(f.q.fa)}</td><td><div class="rowact"><button class="ibtn" onclick="fqEdit('${f.id}')">${IC.edit}</button><button class="ibtn danger" onclick="delItem('faqs','${f.id}')">${IC.trash}</button></div></td></tr>`).join('')}</table>
  <h1 style="font-size:15px">${t('pages_m')}</h1>
  <div class="field"><select class="sel" id="pg-key" onchange="pgLoad()"><option value="about">${t('about')}</option><option value="terms">${t('terms')}</option><option value="privacy">${t('privacy')}</option><option value="shipping">${t('shipping_ret')}</option></select></div>
  <div class="field"><label class="f">فارسی</label><textarea class="inp" id="pg-fa" rows="7"></textarea></div>
  <div class="field"><label class="f">English</label><textarea class="inp" id="pg-en" rows="5"></textarea></div>
  <button class="btn rose sm" onclick="pgSave()">${t('save')}</button>`, 'content');
}
async function rvMod(id, status) { await API.put('/reviews/' + id, { status }); render(); }
function fqEdit(id) {
  modalOpen(`<h2 style="margin-bottom:14px">${t('faqs_m')}</h2>
  <div class="field"><label class="f">سوال (فا)</label><input class="inp" id="fq-qf"></div>
  <div class="field"><label class="f">Question (EN)</label><input class="inp" id="fq-qe"></div>
  <div class="field"><label class="f">پاسخ (فا)</label><textarea class="inp" id="fq-af" rows="3"></textarea></div>
  <div class="field"><label class="f">Answer (EN)</label><textarea class="inp" id="fq-ae" rows="3"></textarea></div>
  <button class="btn rose" onclick="fqSave('${id || ''}')">${t('save')}</button>`);
}
async function fqSave(id) {
  const body = { q: { fa: document.getElementById('fq-qf').value, en: document.getElementById('fq-qe').value }, a: { fa: document.getElementById('fq-af').value, en: document.getElementById('fq-ae').value } };
  id ? await API.put('/faqs/' + id, body) : await API.post('/faqs', body);
  modalClose(); render();
}
async function pgLoad() { const key = document.getElementById('pg-key').value; const p = S.pagesCache[key] || {}; document.getElementById('pg-fa').value = p.fa || ''; document.getElementById('pg-en').value = p.en || ''; }
async function pgSave() { const key = document.getElementById('pg-key').value; await API.put('/pages/' + key, { fa: document.getElementById('pg-fa').value, en: document.getElementById('pg-en').value }); S.pagesCache[key] = { fa: document.getElementById('pg-fa').value, en: document.getElementById('pg-en').value }; toast(t('saved')); }

/* ---- settings ---- */
async function aSettings() {
  const st = S.settings;
  return adminShell(`<h1>${t('settings_m')}</h1>
  <div class="card" style="margin-bottom:16px"><b style="font-size:13px">${t('brand')}</b>
    <div class="formgrid" style="margin-top:12px">
      <div class="field"><label class="f">${t('name_fa')}</label><input class="inp" id="st-bfa" value="${esc(st.brand.fa)}"></div>
      <div class="field"><label class="f">${t('name_en')}</label><input class="inp" id="st-ben" value="${esc(st.brand.en)}"></div>
      <div class="field"><label class="f">${t('logo')}</label><input class="inp" id="st-logo" value="${st.logoUrl}" dir="ltr"></div>
      <div class="field"><label class="f">${t('favicon')}</label><input class="inp" id="st-fav" value="${st.favicon}" dir="ltr"></div>
      <div class="field"><label class="f">${t('announcement')} (فا)</label><input class="inp" id="st-anfa" value="${esc(st.announcement.fa)}"></div>
      <div class="field"><label class="f">${t('announcement')} (EN)</label><input class="inp" id="st-anen" value="${esc(st.announcement.en)}"></div>
    </div>
    <input type="file" accept="image/*" style="font-size:12px" onchange="fileToData(this,async d=>{const r=await API.post('/upload',{data:d});document.getElementById('st-logo').value=r.url;})">
  </div>
  <div class="card" style="margin-bottom:16px"><b style="font-size:13px">${t('hero_m')}</b>
    <div class="formgrid" style="margin-top:12px">
      <div class="field"><label class="f">${t('hero_title_f')} (فا)</label><input class="inp" id="st-htf" value="${esc(((st.hero || {}).title || {}).fa || '')}"></div>
      <div class="field"><label class="f">${t('hero_title_f')} (EN)</label><input class="inp" id="st-hte" value="${esc(((st.hero || {}).title || {}).en || '')}"></div>
      <div class="field"><label class="f">${t('hero_sub_f')} (فا)</label><input class="inp" id="st-hsf" value="${esc(((st.hero || {}).sub || {}).fa || '')}"></div>
      <div class="field"><label class="f">${t('hero_sub_f')} (EN)</label><input class="inp" id="st-hse" value="${esc(((st.hero || {}).sub || {}).en || '')}"></div>
      <div class="field"><label class="f">${t('hero_h')}</label><input class="inp num" id="st-hh" value="${(st.hero || {}).h || 460}"></div>
      <div class="field"><label class="f">${t('hero_hm')}</label><input class="inp num" id="st-hhm" value="${(st.hero || {}).hm || 500}"></div>
    </div>
    <p style="font-size:11.5px;color:var(--muted)">${t('hero_hint')}</p>
  </div>
  <div class="card" style="margin-bottom:16px"><b style="font-size:13px">${t('colors_f2')} & ${t('default_lang')}</b>
    <div class="formgrid" style="margin-top:12px">
      <div class="field"><label class="f">Accent</label><input class="inp" id="st-c1" type="color" value="${st.colors.accent}" style="height:44px"></div>
      <div class="field"><label class="f">Soft BG</label><input class="inp" id="st-c2" type="color" value="${st.colors.soft}" style="height:44px"></div>
      <div class="field"><label class="f">Blush</label><input class="inp" id="st-c3" type="color" value="${st.colors.blush}" style="height:44px"></div>
      <div class="field"><label class="f">Ink</label><input class="inp" id="st-c4" type="color" value="${st.colors.ink}" style="height:44px"></div>
      <div class="field"><label class="f">${t('default_lang')}</label><select class="sel" id="st-lang"><option value="fa" ${st.defaultLang === 'fa' ? 'selected' : ''}>فارسی</option><option value="en" ${st.defaultLang === 'en' ? 'selected' : ''}>English</option></select></div>
      <div class="field"><label class="f"><input type="checkbox" id="st-maint" ${st.maintenance ? 'checked' : ''}> ${t('maintenance')}</label></div>
    </div>
  </div>
  <div class="card" style="margin-bottom:16px"><b style="font-size:13px">${t('contact_info')} & ${t('socials')}</b>
    <div class="formgrid" style="margin-top:12px">
      <div class="field"><label class="f">${t('phone')}</label><input class="inp num" id="st-ph" value="${st.contact.phone}" dir="ltr"></div>
      <div class="field"><label class="f">Mobile</label><input class="inp num" id="st-mob" value="${st.contact.mobile}" dir="ltr"></div>
      <div class="field"><label class="f">Email</label><input class="inp" id="st-em" value="${st.contact.email}" dir="ltr"></div>
      <div class="field"><label class="f">${t('address')} (فا)</label><input class="inp" id="st-adfa" value="${esc(st.contact.address.fa)}"></div>
      <div class="field"><label class="f">Instagram</label><input class="inp" id="st-so1" value="${st.socials.instagram}" dir="ltr"></div>
      <div class="field"><label class="f">Telegram</label><input class="inp" id="st-so2" value="${st.socials.telegram}" dir="ltr"></div>
      <div class="field"><label class="f">WhatsApp</label><input class="inp" id="st-so3" value="${st.socials.whatsapp}" dir="ltr"></div>
    </div>
  </div>
  <div class="card" style="margin-bottom:16px"><b style="font-size:13px">${t('shipping')} & ${t('gateway_f')} & ${t('card2card')}</b>
    <div class="formgrid" style="margin-top:12px">
      <div class="field"><label class="f">${t('shipping_cost')}</label><input class="inp num" id="st-shc" value="${st.shipping.cost}"></div>
      <div class="field"><label class="f">${t('free_min')}</label><input class="inp num" id="st-shf" value="${st.shipping.freeMin}"></div>
      <div class="field"><label class="f">${t('gateway_name')}</label><input class="inp" id="st-gn" value="${esc(st.payment.gatewayName)}"></div>
      <div class="field"><label class="f">${t('merchant_id')}</label><input class="inp num" id="st-gm" value="${st.payment.merchantId}" dir="ltr"></div>
      <div class="field"><label class="f">${t('card_no')}</label><input class="inp num" id="st-cn" value="${st.payment.cardNumber}" dir="ltr"></div>
      <div class="field"><label class="f">${t('sheba_f')}</label><input class="inp num" id="st-sh" value="${st.payment.sheba}" dir="ltr"></div>
    </div>
  </div>
  <div class="card" style="margin-bottom:16px"><b style="font-size:13px">SEO</b>
    <div class="formgrid" style="margin-top:12px">
      <div class="field"><label class="f">${t('seo_title_f')} (فا)</label><input class="inp" id="st-tf" value="${esc(st.seo.title.fa)}"></div>
      <div class="field"><label class="f">${t('seo_title_f')} (EN)</label><input class="inp" id="st-te" value="${esc(st.seo.title.en)}"></div>
      <div class="field" style="grid-column:1/-1"><label class="f">${t('seo_desc_f')} (فا)</label><textarea class="inp" id="st-df" rows="2">${esc(st.seo.desc.fa)}</textarea></div>
    </div>
  </div>
  <div class="card"><b style="font-size:13px">${t('footer_text')}</b>
    <div class="field" style="margin-top:12px"><textarea class="inp" id="st-fa2" rows="3">${esc(st.footerAbout.fa)}</textarea></div>
    <div class="field"><textarea class="inp" id="st-fe2" rows="2">${esc(st.footerAbout.en)}</textarea></div>
  </div>
  <button class="btn rose" style="margin-top:18px" onclick="stSave()">${t('save_settings')}</button>`, 'settings');
}
async function stSave() {
  const g = id => document.getElementById(id).value;
  const body = {
    brand: { fa: g('st-bfa'), en: g('st-ben') }, logoUrl: g('st-logo'), favicon: g('st-fav'),
    announcement: { fa: g('st-anfa'), en: g('st-anen') },
    colors: { accent: g('st-c1'), soft: g('st-c2'), blush: g('st-c3'), ink: g('st-c4') },
    hero: { title: { fa: g('st-htf'), en: g('st-hte') }, sub: { fa: g('st-hsf'), en: g('st-hse') }, h: +g('st-hh') || 460, hm: +g('st-hhm') || 500 },
    defaultLang: g('st-lang'), maintenance: document.getElementById('st-maint').checked,
    contact: Object.assign({}, S.settings.contact, { phone: g('st-ph'), mobile: g('st-mob'), email: g('st-em'), address: { fa: g('st-adfa'), en: S.settings.contact.address.en } }),
    socials: Object.assign({}, S.settings.socials, { instagram: g('st-so1'), telegram: g('st-so2'), whatsapp: g('st-so3') }),
    shipping: { cost: +g('st-shc') || 0, freeMin: +g('st-shf') || 0 },
    payment: Object.assign({}, S.settings.payment, { gatewayName: g('st-gn'), merchantId: g('st-gm'), cardNumber: g('st-cn'), sheba: g('st-sh') }),
    seo: { title: { fa: g('st-tf'), en: g('st-te') }, desc: { fa: g('st-df'), en: S.settings.seo.desc.en } },
    footerAbout: { fa: g('st-fa2'), en: g('st-fe2') }
  };
  S.settings = await API.put('/settings', body); applyVars(); toast(t('saved')); render();
}

/* ---- router for admin ---- */
async function adminRoute(parts) {
  if (!adminGuard()) return '';
  const [a, b] = parts;
  if (!a) return aDash();
  if (a === 'products') return aProducts();
  if (a === 'categories') return aCats();
  if (a === 'orders' && b) return aOrder(b);
  if (a === 'orders') return aOrders();
  if (a === 'customers') return aCustomers();
  if (a === 'coupons') return aCoupons();
  if (a === 'content') return aContent();
  if (a === 'settings') return aSettings();
  return aDash();
}
