/* ============================================================
   BIHELZ TV — Service Worker (PWA)
   - Navegação (HTML): network-first → sempre pega o deploy novo,
     cai pro cache quando offline.
   - Assets estáticos same-origin: stale-while-revalidate (rápido
     e atualiza em segundo plano; URLs versionadas com ?v= já
     garantem a versão certa).
   - Requisições cross-origin (Supabase, YouTube, Discord, radio,
     fontes) NÃO são interceptadas — passam direto pra rede, então
     nada de dado ao vivo fica preso em cache.
   ============================================================ */
const CACHE = "bihelz-pwa-v3";
const CORE = [
  "/",
  "/manifest.webmanifest",
  "/assets/img/logo-bihelz.png",
  "/assets/img/icon-512.png",
  "/assets/img/mascot-cientista.jpg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).catch(() => {}).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch { return; }
  if (url.origin !== self.location.origin) return; // externo: passa direto pra rede

  // navegação de página: network-first
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const cp = res.clone(); caches.open(CACHE).then((c) => c.put("/", cp)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match("/")))
    );
    return;
  }

  // assets same-origin: stale-while-revalidate
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const cp = res.clone();
            caches.open(CACHE).then((c) => c.put(req, cp));
          }
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
