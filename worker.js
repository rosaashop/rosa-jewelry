/* ROSA — Cloudflare Worker entry: API + static assets */
import { onRequest } from './functions/api/[[path]].js';

export default {
  async fetch(req, env, ctx) {
    const u = new URL(req.url);
    if (u.pathname.startsWith('/api/')) return onRequest({ request: req, env });
    return env.ASSETS.fetch(req);
  }
};
