/* ROSA Jewelry — zero-dependency Node server (static + JSON API) */
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const PUB = path.join(__dirname, 'public');
const DBP = path.join(__dirname, 'db.json');
let db;
if (fs.existsSync(DBP)) { db = JSON.parse(fs.readFileSync(DBP, 'utf8')); }
else { db = require('./seed.js').make(); fs.writeFileSync(DBP, JSON.stringify(db, null, 1)); }
const save = () => fs.writeFileSync(DBP, JSON.stringify(db, null, 1));
const uid = () => crypto.randomBytes(6).toString('hex');
const now = () => new Date().toISOString();
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.webp': 'image/webp' };

const finalPrice = p => Math.round(p.price * (1 - (p.discount || 0) / 100));
const pubProduct = p => Object.assign({}, p, { final: finalPrice(p) });

function send(res, code, obj) { res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); }
function readBody(req) { return new Promise((res, rej) => { let d = []; req.on('data', c => { d.push(c); if (Buffer.concat(d).length > 9e6) req.destroy(); }); req.on('end', () => { try { res(JSON.parse(Buffer.concat(d).toString('utf8') || '{}')); } catch (e) { rej(e); } }); req.on('error', rej); }); }
function userOf(req) { const h = req.headers.authorization || ''; const tk = h.replace('Bearer ', ''); const s = (db.sessions || []).find(s => s.token === tk); return s ? db.users.find(u => u.id === s.userId) || null : null; }
function pushTL(o, t, note) { o.timeline.push({ t, date: now(), note: note || '' }); }

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'); const P = u.pathname; const M = req.method;
  let b = null;
  try {
    if (P.startsWith('/api/')) {
      if (['POST', 'PUT', 'DELETE'].includes(M)) b = await readBody(req).catch(() => ({}));
      const usr = userOf(req); const admin = usr && usr.role === 'admin';
      const seg = P.replace('/api/', '').split('/').filter(Boolean);
      const [r0, r1, r2] = seg;

      /* ---------- settings ---------- */
      if (r0 === 'settings' && M === 'GET') return send(res, 200, db.settings);
      if (r0 === 'settings' && M === 'PUT' && admin) { Object.assign(db.settings, b); save(); return send(res, 200, db.settings); }

      /* ---------- upload ---------- */
      if (r0 === 'upload' && M === 'POST') {
        const m = /^data:(image\/(png|jpeg|webp));base64,(.+)$/.exec(b.data || '');
        if (!m) return send(res, 400, { error: 'bad image' });
        const ext = m[1] === 'image/png' ? 'png' : m[1] === 'image/webp' ? 'webp' : 'jpg';
        const name = uid() + '.' + ext;
        fs.writeFileSync(path.join(PUB, 'assets/uploads', name), Buffer.from(m[3], 'base64'));
        return send(res, 200, { url: '/assets/uploads/' + name });
      }

      /* ---------- auth ---------- */
      if (r0 === 'auth' && r1 === 'register' && M === 'POST') {
        if (!b.name || !b.phone || !b.password) return send(res, 400, { error: 'missing' });
        if (db.users.find(x => x.phone === b.phone)) return send(res, 400, { error: 'phone-exists' });
        const user = { id: uid(), name: b.name, phone: b.phone, password: b.password, role: 'customer', addresses: [], createdAt: now() };
        db.users.push(user); const token = uid() + uid();
        db.sessions.push({ token, userId: user.id }); save();
        return send(res, 200, { token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
      }
      if (r0 === 'auth' && r1 === 'login' && M === 'POST') {
        const user = db.users.find(x => x.phone === b.phone && x.password === b.password);
        if (!user) return send(res, 401, { error: 'bad-creds' });
        const token = uid() + uid(); db.sessions.push({ token, userId: user.id }); save();
        return send(res, 200, { token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
      }
      if (r0 === 'me' && M === 'GET') return usr ? send(res, 200, { id: usr.id, name: usr.name, phone: usr.phone, role: usr.role, addresses: usr.addresses || [] }) : send(res, 401, { error: 'noauth' });
      if (r0 === 'me' && M === 'PUT' && usr) { if (b.name) usr.name = b.name; if (b.password) usr.password = b.password; if (b.addresses) usr.addresses = b.addresses; save(); return send(res, 200, { ok: 1 }); }
      if (r0 === 'auth' && r1 === 'logout' && M === 'POST') { db.sessions = db.sessions.filter(s => s.token !== (req.headers.authorization || '').replace('Bearer ', '')); save(); return send(res, 200, { ok: 1 }); }

      /* ---------- sliders ---------- */
      if (r0 === 'sliders' && M === 'GET') return send(res, 200, (admin && u.searchParams.get('all') ? db.sliders : db.sliders.filter(s => s.active)).sort((a, c) => a.order - c.order));
      if (r0 === 'sliders' && M === 'POST' && admin) { b.id = uid(); db.sliders.push(b); save(); return send(res, 200, b); }
      if (r0 === 'sliders' && r1 && M === 'PUT' && admin) { const s = db.sliders.find(x => x.id === r1); Object.assign(s, b); save(); return send(res, 200, s); }
      if (r0 === 'sliders' && r1 && M === 'DELETE' && admin) { db.sliders = db.sliders.filter(x => x.id !== r1); save(); return send(res, 200, { ok: 1 }); }

      /* ---------- categories ---------- */
      if (r0 === 'categories' && M === 'GET') return send(res, 200, db.categories.sort((a, c) => a.order - c.order));
      if (r0 === 'categories' && M === 'POST' && admin) { b.id = uid(); if (!b.slug) b.slug = b.id; db.categories.push(b); save(); return send(res, 200, b); }
      if (r0 === 'categories' && r1 && M === 'PUT' && admin) { const c = db.categories.find(x => x.id === r1 || x.slug === r1); Object.assign(c, b); save(); return send(res, 200, c); }
      if (r0 === 'categories' && r1 && M === 'DELETE' && admin) { db.categories = db.categories.filter(x => x.id !== r1); save(); return send(res, 200, { ok: 1 }); }

      /* ---------- products ---------- */
      if (r0 === 'products' && !r1 && M === 'GET') {
        let list = db.products.filter(p => admin ? true : p.status === 'active').map(pubProduct);
        const q = (u.searchParams.get('q') || '').trim();
        if (q) list = list.filter(p => (p.name.fa + p.name.en + (p.tags || []).join(' ')).toLowerCase().includes(q.toLowerCase()));
        const cat = u.searchParams.get('cat'); if (cat) list = list.filter(p => p.categoryId === cat || (db.categories.find(c => c.id === p.categoryId) || {}).slug === cat);
        const flt = u.searchParams.get('filter');
        if (flt === 'new') list = list.filter(p => p.isNew);
        if (flt === 'sale') list = list.filter(p => p.discount > 0);
        if (flt === 'best') list = list.filter(p => p.sold >= 20);
        const sort = u.searchParams.get('sort') || 'new';
        if (sort === 'new') list.sort((a, c) => c.createdAt.localeCompare(a.createdAt));
        if (sort === 'cheap') list.sort((a, c) => a.final - c.final);
        if (sort === 'exp') list.sort((a, c) => c.final - a.final);
        if (sort === 'best') list.sort((a, c) => c.sold - a.sold);
        if (sort === 'discount') list.sort((a, c) => c.discount - a.discount);
        const lim = parseInt(u.searchParams.get('limit') || '0'); if (lim) list = list.slice(0, lim);
        return send(res, 200, list);
      }
      if (r0 === 'products' && r1 && M === 'GET') { const p = db.products.find(x => x.id === r1 || x.slug === r1); if (!p) return send(res, 404, { error: 'nf' }); return send(res, 200, Object.assign(pubProduct(p), { reviews: db.reviews.filter(rv => rv.pid === p.id && rv.status === 'approved') })); }
      if (r0 === 'products' && M === 'POST' && admin) { b.id = uid(); if (!b.slug) b.slug = 'p-' + b.id; b.createdAt = b.createdAt || now(); b.sold = b.sold || 0; db.products.push(b); save(); return send(res, 200, b); }
      if (r0 === 'products' && r1 && M === 'PUT' && admin) { const p = db.products.find(x => x.id === r1); Object.assign(p, b); save(); return send(res, 200, p); }
      if (r0 === 'products' && r1 && M === 'DELETE' && admin) { db.products = db.products.filter(x => x.id !== r1); save(); return send(res, 200, { ok: 1 }); }

      /* ---------- reviews ---------- */
      if (r0 === 'reviews' && M === 'GET') return send(res, 200, admin ? db.reviews : db.reviews.filter(x => x.status === 'approved' && x.pid === u.searchParams.get('pid')));
      if (r0 === 'reviews' && M === 'POST') { const rv = { id: uid(), pid: b.pid, name: b.name || (usr ? usr.name : ''), rating: +b.rating || 5, text: b.text || '', status: 'pending', date: now() }; db.reviews.push(rv); save(); return send(res, 200, rv); }
      if (r0 === 'reviews' && r1 && M === 'PUT' && admin) { const rv = db.reviews.find(x => x.id === r1); Object.assign(rv, b); save(); return send(res, 200, rv); }
      if (r0 === 'reviews' && r1 && M === 'DELETE' && admin) { db.reviews = db.reviews.filter(x => x.id !== r1); save(); return send(res, 200, { ok: 1 }); }

      /* ---------- coupon ---------- */
      if (r0 === 'coupon' && M === 'POST') {
        const c = db.coupons.find(x => x.code.toLowerCase() === (b.code || '').toLowerCase() && x.active);
        if (!c) return send(res, 404, { error: 'coupon-nf' });
        if (c.expires && c.expires < now().slice(0, 10)) return send(res, 400, { error: 'coupon-exp' });
        if (c.minOrder && b.subtotal < c.minOrder) return send(res, 400, { error: 'coupon-min', min: c.minOrder });
        const discount = c.type === 'percent' ? Math.round(b.subtotal * c.value / 100) : Math.min(c.value, b.subtotal);
        return send(res, 200, { code: c.code, discount });
      }
      if (r0 === 'coupons' && M === 'GET' && admin) return send(res, 200, db.coupons);
      if (r0 === 'coupons' && M === 'POST' && admin) { b.id = uid(); db.coupons.push(b); save(); return send(res, 200, b); }
      if (r0 === 'coupons' && r1 && M === 'PUT' && admin) { const c = db.coupons.find(x => x.id === r1); Object.assign(c, b); save(); return send(res, 200, c); }
      if (r0 === 'coupons' && r1 && M === 'DELETE' && admin) { db.coupons = db.coupons.filter(x => x.id !== r1); save(); return send(res, 200, { ok: 1 }); }

      /* ---------- orders ---------- */
      if (r0 === 'orders' && !r1 && M === 'POST') {
        const items = []; let subtotal = 0;
        for (const it of (b.items || [])) {
          const p = db.products.find(x => x.id === it.pid); if (!p) return send(res, 400, { error: 'product-nf' });
          if (p.stock < it.qty) return send(res, 400, { error: 'stock', name: p.name.fa });
          const fp = finalPrice(p); items.push({ pid: p.id, name: p.name, image: p.images[0], price: fp, qty: it.qty, color: it.color || '', size: it.size || '' });
          subtotal += fp * it.qty;
        }
        if (!items.length) return send(res, 400, { error: 'empty' });
        let discount = 0, couponCode = '';
        if (b.coupon) { const c = db.coupons.find(x => x.code.toLowerCase() === b.coupon.toLowerCase() && x.active); if (c) { if (!c.minOrder || subtotal >= c.minOrder) { discount = c.type === 'percent' ? Math.round(subtotal * c.value / 100) : Math.min(c.value, subtotal); couponCode = c.code; } } }
        const st = db.settings;
        const shipping = (subtotal - discount) >= st.shipping.freeMin ? 0 : st.shipping.cost;
        const o = { id: uid(), code: 'RS-' + (1000 + ++db.seq), userId: usr ? usr.id : null, items, subtotal, discount, couponCode, shipping, total: subtotal - discount + shipping, method: b.method, status: b.method === 'card' ? 'awaiting_confirm' : 'pending_payment', receipt: b.method === 'card' ? { url: b.receipt && b.receipt.url, tracking: b.receipt && b.receipt.tracking, status: 'pending' } : null, trackingCode: '', info: b.info || {}, phoneGuest: usr ? null : ((b.info || {}).phone || ''), note: b.note || '', timeline: [], createdAt: now() };
        pushTL(o, o.status, b.method === 'card' ? 'card-receipt-submitted' : 'order-created');
        for (const it of items) { const p = db.products.find(x => x.id === it.pid); p.stock -= it.qty; p.sold += it.qty; }
        db.orders.unshift(o); save();
        return send(res, 200, o);
      }
      if (r0 === 'orders' && !r1 && M === 'GET') {
        let list = admin ? db.orders : db.orders.filter(o => o.userId === (usr && usr.id));
        if (!admin && !usr) { const g = db.orders.filter(o => o.phoneGuest && o.phoneGuest === u.searchParams.get('phone')); list = g; }
        return send(res, 200, list);
      }
      if (r0 === 'track' && M === 'GET') {
        const o = db.orders.find(x => x.code.toLowerCase() === (u.searchParams.get('code') || '').toLowerCase() && (x.info.phone || x.phoneGuest) === u.searchParams.get('phone'));
        if (!o) return send(res, 404, { error: 'nf' });
        return send(res, 200, { code: o.code, status: o.status, trackingCode: o.trackingCode, timeline: o.timeline, total: o.total, createdAt: o.createdAt, itemsCount: o.items.length });
      }
      if (r0 === 'orders' && r1 && M === 'GET') {
        const o = db.orders.find(x => x.id === r1 || x.code === r1); if (!o) return send(res, 404, { error: 'nf' });
        if (!admin && (!usr || o.userId !== usr.id)) return send(res, 403, { error: 'forbidden' });
        return send(res, 200, o);
      }
      if (r0 === 'orders' && r1 && r2 === 'receipt' && M === 'POST') {
        const o = db.orders.find(x => x.id === r1); if (!o) return send(res, 404, { error: 'nf' });
        o.receipt = { url: b.url, tracking: b.tracking, status: 'pending' }; o.status = 'awaiting_confirm'; pushTL(o, 'awaiting_confirm', 'receipt-resubmit'); save(); return send(res, 200, o);
      }
      if (r0 === 'orders' && r1 && r2 === 'review-receipt' && M === 'POST' && admin) {
        const o = db.orders.find(x => x.id === r1); if (!o) return send(res, 404, { error: 'nf' });
        if (b.action === 'approve') { o.receipt.status = 'approved'; o.status = 'paid'; pushTL(o, 'paid', 'receipt-approved'); }
        else { o.receipt.status = 'rejected'; o.status = 'pending_payment'; pushTL(o, 'pending_payment', 'receipt-rejected'); }
        save(); return send(res, 200, o);
      }
      if (r0 === 'orders' && r1 && r2 === 'pay' && M === 'POST') { /* simulated gateway callback — real gateways plug in here */
        const o = db.orders.find(x => x.id === r1); if (!o) return send(res, 404, { error: 'nf' });
        if (b.success) { o.status = 'paid'; pushTL(o, 'paid', 'gateway-success'); } else { o.status = 'canceled'; pushTL(o, 'canceled', 'gateway-fail'); }
        save(); return send(res, 200, o);
      }
      if (r0 === 'orders' && r1 && M === 'PUT' && admin) {
        const o = db.orders.find(x => x.id === r1); if (!o) return send(res, 404, { error: 'nf' });
        if (b.status && b.status !== o.status) { o.status = b.status; pushTL(o, b.status, b.note || ''); }
        if (b.trackingCode !== undefined) o.trackingCode = b.trackingCode;
        if (b.info) o.info = b.info;
        save(); return send(res, 200, o);
      }

      /* ---------- faqs / pages ---------- */
      if (r0 === 'faqs' && M === 'GET') return send(res, 200, db.faqs);
      if (r0 === 'faqs' && M === 'POST' && admin) { b.id = uid(); db.faqs.push(b); save(); return send(res, 200, b); }
      if (r0 === 'faqs' && r1 && M === 'PUT' && admin) { const f = db.faqs.find(x => x.id === r1); Object.assign(f, b); save(); return send(res, 200, f); }
      if (r0 === 'faqs' && r1 && M === 'DELETE' && admin) { db.faqs = db.faqs.filter(x => x.id !== r1); save(); return send(res, 200, { ok: 1 }); }
      if (r0 === 'pages' && M === 'GET') return send(res, 200, db.pages);
      if (r0 === 'pages' && r1 && M === 'PUT' && admin) { db.pages[r1] = b; save(); return send(res, 200, b); }

      /* ---------- customers & stats ---------- */
      if (r0 === 'customers' && M === 'GET' && admin) return send(res, 200, db.users.filter(x => x.role === 'customer').map(x => ({ id: x.id, name: x.name, phone: x.phone, createdAt: x.createdAt, orders: db.orders.filter(o => o.userId === x.id).length })));
      if (r0 === 'stats' && M === 'GET' && admin) {
        const paid = o => ['paid', 'preparing', 'shipped', 'delivered'].includes(o.status);
        const days = []; for (let i = 6; i >= 0; i--) { const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10); days.push({ d, label: d.slice(5, 10), total: db.orders.filter(o => o.createdAt.slice(0, 10) === d && paid(o)).reduce((s, o) => s + o.total, 0), count: db.orders.filter(o => o.createdAt.slice(0, 10) === d).length }); }
        const sc = {}; db.orders.forEach(o => sc[o.status] = (sc[o.status] || 0) + 1);
        return send(res, 200, {
          revenue: db.orders.filter(paid).reduce((s, o) => s + o.total, 0),
          orders: db.orders.length, customers: db.users.filter(x => x.role === 'customer').length,
          pendingReceipts: db.orders.filter(o => o.status === 'awaiting_confirm').length,
          pendingReviews: db.reviews.filter(x => x.status === 'pending').length,
          lowStock: db.products.filter(p => p.stock <= 3).length, days, statusCounts: sc
        });
      }
      return send(res, 404, { error: 'not-found' });
    }

    /* ---------- static ---------- */
    let fp = path.normalize(P).replace(/^([.][.][/\\])+/, '');
    let file = path.join(PUB, fp === '/' ? 'index.html' : fp);
    if (!file.startsWith(PUB)) file = path.join(PUB, 'index.html');
    if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(PUB, 'index.html');
    const ext = path.extname(file);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    return res.end(fs.readFileSync(file));
  } catch (e) { console.error(e); return send(res, 500, { error: 'server' }); }
});
server.listen(3000, '0.0.0.0', () => console.log('ROSA server on :3000'));
