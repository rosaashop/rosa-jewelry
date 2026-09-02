/* ROSA — Cloudflare Worker entry: API + static assets */
import { onRequest } from './functions/api/[[path]].js';

function sitemapXML(d, origin) {
  const urls = [{ loc: '/', pri: '1.0' }, { loc: '/#/shop', pri: '0.9' }, { loc: '/#/about', pri: '0.5' }, { loc: '/#/contact', pri: '0.4' }];
  (d.categories || []).forEach(c => urls.push({ loc: '/#/category/' + c.slug, pri: '0.8' }));
  (d.products || []).filter(p => p.status !== 'inactive').forEach(p => urls.push({ loc: '/#/product/' + p.slug, pri: '0.7' }));
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map(x => '<url><loc>' + origin + x.loc + '</loc><changefreq>weekly</changefreq><priority>' + x.pri + '</priority></url>').join('') + '</urlset>';
}
export default {
  async fetch(req, env, ctx) {
    const u = new URL(req.url);
    if (u.pathname === '/robots.txt') return new Response('User-agent: *\nAllow: /\n\nSitemap: ' + u.origin + '/sitemap.xml\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
    if (u.pathname === '/sitemap.xml') {
      let d = null;
      try { d = JSON.parse(await env.ROSA_DB.get('db') || 'null'); } catch (e) {}
      if (!d) return new Response('', { status: 404 });
      return new Response(sitemapXML(d, u.origin), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
    }
    if (u.pathname.startsWith('/api/')) return onRequest({ request: req, env });
    return env.ASSETS.fetch(req);
  }
};
