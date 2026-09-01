/* ROSA api + global state */
const S = {
  settings: null, user: null, cats: [], cart: JSON.parse(localStorage.getItem('rosa_cart') || '[]'),
  wish: JSON.parse(localStorage.getItem('rosa_wish') || '[]'), prods: {}
};
const API = {
  token: localStorage.getItem('rosa_token') || '',
  async req(m, p, b) {
    const r = await fetch('/api' + p, { method: m, headers: { 'Content-Type': 'application/json', ...(this.token ? { Authorization: 'Bearer ' + this.token } : {}) }, body: b ? JSON.stringify(b) : undefined });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error || 'error'); e.code = d.error; e.min = d.min; throw e; }
    return d;
  },
  get(p) { return this.req('GET', p); }, post(p, b) { return this.req('POST', p, b); }, put(p, b) { return this.req('PUT', p, b); }, del(p) { return this.req('DELETE', p); }
};
const saveCart = () => localStorage.setItem('rosa_cart', JSON.stringify(S.cart));
const saveWish = () => localStorage.setItem('rosa_wish', JSON.stringify(S.wish));
const cartCount = () => S.cart.reduce((s, i) => s + i.qty, 0);
function cartCalc() {
  const subtotal = S.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const st = S.settings || { shipping: { cost: 45000, freeMin: 2500000 } };
  const shipping = S.cart.length ? (subtotal >= st.shipping.freeMin ? 0 : st.shipping.cost) : 0;
  return { subtotal, shipping, freeMin: st.shipping.freeMin };
}
