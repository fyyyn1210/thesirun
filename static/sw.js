const CACHE = "thesirun-v1";
const SHELL = ["/", "/board/", "/how-i-built-this/", "/app.css", "/app.js", "/fonts/Figtree-Variable.woff2", "/fonts/BricolageGrotesque-Variable.woff2", "/icons/icon-192.png", "/icons/favicon-32.png", "/manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then((r) => {
      const copy = r.clone();
      if (r.ok) caches.open(CACHE).then((c) => c.put(url.pathname, copy));
      return r;
    }).catch(() => caches.match(url.pathname).then((r) => r || caches.match("/"))));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req).then((r) => {
      const copy = r.clone();
      if (r.ok) caches.open(CACHE).then((c) => c.put(req, copy));
      return r;
    });
    return hit ? (net.catch(() => hit), hit) : net;
  }));
});
