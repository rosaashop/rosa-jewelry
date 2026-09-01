/* ROSA — Cloudflare Pages Function (Workers runtime) — API with KV storage */
import seedModule from '../../seed.js';
const make = seedModule.make;

const finalPrice = p => Math.round(p.price * (1 - (p.discount || 0) / 100));
const pubProduct = p => Object.assign({}, p, { final: finalPrice(p) });
const uid = () => Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 8);
const now = () => new Date().toISOString();
const pushTL = (o, t, note) => o.timeline.push({ t, date: now(), note: note || '' });
const J = (obj, code = 200) => new Response(JSON.stringify(obj), { status: code, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

export async function onRequest(context) {
  const { request, env } = context;
  const u = new URL(request.url);
  const M = request.method;
  const P = u.pathname;
  if (!P.startsWith('/api/')) return new Response('nf', { status: 404 });

  let db = await env.ROSA_DB.get('db', 'json');
  if (!db) { db = make(); await env.ROSA_DB.put('db', JSON.stringify(db)); }
  const save = () => env.ROSA_DB.put('db', JSON.stringify(db));

  let b = {};
  if (['POST', 'PUT', 'DELETE'].includes(M)) { try { b = await request.json(); } catch (e) { b = {}; } }

  const tk = (request.headers.get('Authorization') || '').replace('Bearer ', '');
  const sess = (db.sessions || []).find(s => s.token === tk);
  const usr = sess ? db.users.find(x => x.id === sess.userId) || null : null;
  const admin = usr && usr.role === 'admin';
  const seg = P.replace('/api/', '').split('/').filter(Boolean);
  const [r0, r1, r2] = seg;

  try {
    /* settings */
    if (r0 === 'settings' && M === 'GET') return J(db.settings);
    if (r0 === 'settings' && M === 'PUT' && admin) { Object.assign(db.settings, b); await save(); return J(db.settings); }

    /* upload — serverless: keep dataURL as the url */
    if (r0 === 'upload' && M === 'POST') {
      if (!/^data:image\/(png|jpeg|webp);base64,/.test(b.data || '')) return J({ error: 'bad image' }, 400);
      return J({ url: b.data });
    }

    /* auth */
    if (r0 === 'auth' && r1 === 'register' && M === 'POST') {
      if (!b.name || !b.phone || !b.password) return J({ error: 'missing' }, 400);
      if (db.users.find(x => x.phone === b.phone)) return J({ error: 'phone-exists' }, 400);
      const user = { id: uid(), name: b.name, phone: b.phone, password: b.password, role: 'customer', addresses: [], createdAt: now() };
      db.users.push(user); const token = uid() + uid(); db.sessions.push({ token, userId: user.id }); await save();
      return J({ token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
    }
    if (r0 === 'auth' && r1 === 'login' && M === 'POST') {
      const user = db.users.find(x => x.phone === b.phone && x.password === b.password);
      if (!user) return J({ error: 'bad-creds' }, 401);
      const token = uid() + uid(); db.sessions.push({ token, userId: user.id }); await save();
      return J({ token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } });
    }
    if (r0 === 'me' && M === 'GET') return usr ? J({ id: usr.id, name: usr.name, phone: usr.phone, role: usr.role, addresses: usr.addresses || [] }) : J({ error: 'noauth' }, 401);
    if (r0 === 'me' && M === 'PUT' && usr) { if (b.name) usr.name = b.name; if (b.password) usr.password = b.password; if (b.addresses) usr.addresses = b.addresses; await save(); return J({ ok: 1 }); }
    if (r0 === 'auth' && r1 === 'logout' && M === 'POST') { db.sessions = db.sessions.filter(s => s.token !== tk); await save(); return J({ ok: 1 }); }

    /* sliders */
    if (r0 === 'sliders' && M === 'GET') return J((admin && u.searchParams.get('all') ? db.sliders : db.sliders.filter(s => s.active)).sort((a, c) => a.order - c.order));
    if (r0 === 'sliders' && M === 'POST' && admin) { b.id = uid(); db.sliders.push(b); await save(); return J(b); }
    if (r0 === 'sliders' && r1 && M === 'PUT' && admin) { const s = db.sliders.find(x => x.id === r1); Object.assign(s, b); await save(); return J(s); }
    if (r0 === 'sliders' && r1 && M === 'DELETE' && admin) { db.sliders = db.sliders.filter(x => x.id !== r1); await save(); return J({ ok: 1 }); }

    /* categories */
    if (r0 === 'categories' && M === 'GET') return J(db.categories.sort((a, c) => a.order - c.order));
    if (r0 === 'categories' && M === 'POST' && admin) { b.id = uid(); if (!b.slug) b.slug = b.id; db.categories.push(b); await save(); return J(b); }
    if (r0 === 'categories' && r1 && M === 'PUT' && admin) { const c = db.categories.find(x => x.id === r1 || x.slug === r1); Object.assign(c, b); await save(); return J(c); }
    if (r0 === 'categories' && r1 && M === 'DELETE' && admin) { db.categories = db.categories.filter(x => x.id !== r1); await save(); return J({ ok: 1 }); }

    /* products */
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
      return J(list);
    }
    if (r0 === 'products' && r1 && M === 'GET') { const p = db.products.find(x => x.id === r1 || x.slug === r1); if (!p) return J({ error: 'nf' }, 404); return J(Object.assign(pubProduct(p), { reviews: db.reviews.filter(rv => rv.pid === p.id && rv.status === 'approved') })); }
    if (r0 === 'products' && M === 'POST' && admin) { b.id = uid(); if (!b.slug) b.slug = 'p-' + b.id; b.createdAt = b.createdAt || now(); b.sold = b.sold || 0; db.products.push(b); await save(); return J(b); }
    if (r0 === 'products' && r1 && M === 'PUT' && admin) { const p = db.products.find(x => x.id === r1); Object.assign(p, b); await save(); return J(p); }
    if (r0 === 'products' && r1 && M === 'DELETE' && admin) { db.products = db.products.filter(x => x.id !== r1); await save(); return J({ ok: 1 }); }

    /* reviews */
    if (r0 === 'reviews' && M === 'GET') return J(admin ? db.reviews : db.reviews.filter(x => x.status === 'approved' && x.pid === u.searchParams.get('pid')));
    if (r0 === 'reviews' && M === 'POST') { const rv = { id: uid(), pid: b.pid, name: b.name || (usr ? usr.name : ''), rating: +b.rating || 5, text: b.text || '', status: 'pending', date: now() }; db.reviews.push(rv); await save(); return J(rv); }
    if (r0 === 'reviews' && r1 && M === 'PUT' && admin) { const rv = db.reviews.find(x => x.id === r1); Object.assign(rv, b); await save(); return J(rv); }
    if (r0 === 'reviews' && r1 && M === 'DELETE' && admin) { db.reviews = db.reviews.filter(x => x.id !== r1); await save(); return J({ ok: 1 }); }

    /* coupon */
    if (r0 === 'coupon' && M === 'POST') {
      const c = db.coupons.find(x => x.code.toLowerCase() === (b.code || '').toLowerCase() && x.active);
      if (!c) return J({ error: 'coupon-nf' }, 404);
      if (c.expires && c.expires < now().slice(0, 10)) return J({ error: 'coupon-exp' }, 400);
      if (c.minOrder && b.subtotal < c.minOrder) return J({ error: 'coupon-min', min: c.minOrder }, 400);
      const discount = c.type === 'percent' ? Math.round(b.subtotal * c.value / 100) : Math.min(c.value, b.subtotal);
      return J({ code: c.code, discount });
    }
    if (r0 === 'coupons' && M === 'GET' && admin) return J(db.coupons);
    if (r0 === 'coupons' && M === 'POST' && admin) { b.id = uid(); db.coupons.push(b); await save(); return J(b); }
    if (r0 === 'coupons' && r1 && M === 'PUT' && admin) { const c = db.coupons.find(x => x.id === r1); Object.assign(c, b); await save(); return J(c); }
    if (r0 === 'coupons' && r1 && M === 'DELETE' && admin) { db.coupons = db.coupons.filter(x => x.id !== r1); await save(); return J({ ok: 1 }); }

    /* orders */
    if (r0 === 'orders' && !r1 && M === 'POST') {
      const items = []; let subtotal = 0;
      for (const it of (b.items || [])) {
        const p = db.products.find(x => x.id === it.pid); if (!p) return J({ error: 'product-nf' }, 400);
        if (p.stock < it.qty) return J({ error: 'stock', name: p.name.fa }, 400);
        const fp = finalPrice(p); items.push({ pid: p.id, name: p.name, image: p.images[0], price: fp, qty: it.qty, color: it.color || '', size: it.size || '' });
        subtotal += fp * it.qty;
      }
      if (!items.length) return J({ error: 'empty' }, 400);
      let discount = 0, couponCode = '';
      if (b.coupon) { const c = db.coupons.find(x => x.code.toLowerCase() === b.coupon.toLowerCase() && x.active); if (c) { if (!c.minOrder || subtotal >= c.minOrder) { discount = c.type === 'percent' ? Math.round(subtotal * c.value / 100) : Math.min(c.value, subtotal); couponCode = c.code; } } }
      const st = db.settings;
      const shipping = (subtotal - discount) >= st.shipping.freeMin ? 0 : st.shipping.cost;
      const o = { id: uid(), code: 'RS-' + (1000 + ++db.seq), userId: usr ? usr.id : null, phoneGuest: usr ? null : ((b.info || {}).phone || ''), items, subtotal, discount, couponCode, shipping, total: subtotal - discount + shipping, method: b.method, status: b.method === 'card' ? 'awaiting_confirm' : 'pending_payment', receipt: b.method === 'card' ? { url: b.receipt && b.receipt.url, tracking: b.receipt && b.receipt.tracking, status: 'pending' } : null, trackingCode: '', info: b.info || {}, note: b.note || '', timeline: [], createdAt: now() };
      pushTL(o, o.status, b.method === 'card' ? 'card-receipt-submitted' : 'order-created');
      for (const it of items) { const p = db.products.find(x => x.id === it.pid); p.stock -= it.qty; p.sold += it.qty; }
      db.orders.unshift(o); await save();
      return J(o);
    }
    if (r0 === 'orders' && !r1 && M === 'GET') {
      let list = admin ? db.orders : db.orders.filter(o => o.userId === (usr && usr.id));
      if (!admin && !usr) list = db.orders.filter(o => o.phoneGuest && o.phoneGuest === u.searchParams.get('phone'));
      return J(list);
    }
    if (r0 === 'track' && M === 'GET') {
      const o = db.orders.find(x => x.code.toLowerCase() === (u.searchParams.get('code') || '').toLowerCase() && (x.info.phone || x.phoneGuest) === u.searchParams.get('phone'));
      if (!o) return J({ error: 'nf' }, 404);
      return J({ code: o.code, status: o.status, trackingCode: o.trackingCode, timeline: o.timeline, total: o.total, createdAt: o.createdAt, itemsCount: o.items.length });
    }
    if (r0 === 'orders' && r1 && M === 'GET') {
      const o = db.orders.find(x => x.id === r1 || x.code === r1); if (!o) return J({ error: 'nf' }, 404);
      if (!admin && (!usr || o.userId !== usr.id)) return J({ error: 'forbidden' }, 403);
      return J(o);
    }
    if (r0 === 'orders' && r1 && r2 === 'receipt' && M === 'POST') {
      const o = db.orders.find(x => x.id === r1); if (!o) return J({ error: 'nf' }, 404);
      o.receipt = { url: b.url, tracking: b.tracking, status: 'pending' }; o.status = 'awaiting_confirm'; pushTL(o, 'awaiting_confirm', 'receipt-resubmit'); await save(); return J(o);
    }
    if (r0 === 'orders' && r1 && r2 === 'review-receipt' && M === 'POST' && admin) {
      const o = db.orders.find(x => x.id === r1); if (!o) return J({ error: 'nf' }, 404);
      if (b.action === 'approve') { o.receipt.status = 'approved'; o.status = 'paid'; pushTL(o, 'paid', 'receipt-approved'); }
      else { o.receipt.status = 'rejected'; o.status = 'pending_payment'; pushTL(o, 'pending_payment', 'receipt-rejected'); }
      await save(); return J(o);
    }
    if (r0 === 'orders' && r1 && r2 === 'pay' && M === 'POST') {
      const o = db.orders.find(x => x.id === r1); if (!o) return J({ error: 'nf' }, 404);
      if (b.success) { o.status = 'paid'; pushTL(o, 'paid', 'gateway-success'); } else { o.status = 'canceled'; pushTL(o, 'canceled', 'gateway-fail'); }
      await save(); return J(o);
    }
    if (r0 === 'orders' && r1 && M === 'PUT' && admin) {
      const o = db.orders.find(x => x.id === r1); if (!o) return J({ error: 'nf' }, 404);
      if (b.status && b.status !== o.status) { o.status = b.status; pushTL(o, b.status, b.note || ''); }
      if (b.trackingCode !== undefined) o.trackingCode = b.trackingCode;
      if (b.info) o.info = b.info;
      await save(); return J(o);
    }

    /* faqs / pages */
    if (r0 === 'faqs' && M === 'GET') return J(db.faqs);
    if (r0 === 'faqs' && M === 'POST' && admin) { b.id = uid(); db.faqs.push(b); await save(); return J(b); }
    if (r0 === 'faqs' && r1 && M === 'PUT' && admin) { const f = db.faqs.find(x => x.id === r1); Object.assign(f, b); await save(); return J(f); }
    if (r0 === 'faqs' && r1 && M === 'DELETE' && admin) { db.faqs = db.faqs.filter(x => x.id !== r1); await save(); return J({ ok: 1 }); }
    if (r0 === 'pages' && M === 'GET') return J(db.pages);
    if (r0 === 'pages' && r1 && M === 'PUT' && admin) { db.pages[r1] = b; await save(); return J(b); }

    /* customers & stats */
    if (r0 === 'customers' && M === 'GET' && admin) return J(db.users.filter(x => x.role === 'customer').map(x => ({ id: x.id, name: x.name, phone: x.phone, createdAt: x.createdAt, orders: db.orders.filter(o => o.userId === x.id).length })));
    if (r0 === 'stats' && M === 'GET' && admin) {
      const paid = o => ['paid', 'preparing', 'shipped', 'delivered'].includes(o.status);
      const days = []; for (let i = 6; i >= 0; i--) { const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10); days.push({ d, label: d.slice(5, 10), total: db.orders.filter(o => o.createdAt.slice(0, 10) === d && paid(o)).reduce((s, o) => s + o.total, 0), count: db.orders.filter(o => o.createdAt.slice(0, 10) === d).length }); }
      const sc = {}; db.orders.forEach(o => sc[o.status] = (sc[o.status] || 0) + 1);
      return J({ revenue: db.orders.filter(paid).reduce((s, o) => s + o.total, 0), orders: db.orders.length, customers: db.users.filter(x => x.role === 'customer').length, pendingReceipts: db.orders.filter(o => o.status === 'awaiting_confirm').length, pendingReviews: db.reviews.filter(x => x.status === 'pending').length, lowStock: db.products.filter(p => p.stock <= 3).length, days, statusCounts: sc });
    }
    return J({ error: 'not-found' }, 404);
  } catch (e) { return J({ error: 'server' }, 500); }
}
