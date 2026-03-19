const CACHE_NAME = 'os-v6';
const STATIC_EXTS = /\.(css|js|json|woff2?|ttf|eot|svg|png|jpg|jpeg|webp|ico)$/i;
const MAX_CACHE_ITEMS = 200;

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Trim cache to MAX_CACHE_ITEMS (LRU-style: delete oldest entries)
async function trimCache(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > max) {
    await Promise.all(keys.slice(0, keys.length - max).map(k => cache.delete(k)));
  }
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (STATIC_EXTS.test(url.pathname)) {
    // Cache-first for static assets
    event.respondWith(
      caches.match(request).then(cached =>
        cached || fetch(request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, clone);
              trimCache(CACHE_NAME, MAX_CACHE_ITEMS);
            });
          }
          return response;
        }).catch(() => new Response('', { status: 503, statusText: 'Offline' }))
      )
    );
  } else if (request.headers.get('accept')?.includes('text/html')) {
    // Network-first for HTML pages
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached =>
            cached || new Response(
              '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>离线 - OracleShellInstall</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:system-ui,sans-serif;background:#0a0a0e;color:#e8e6e3;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:24px}.wrap{max-width:400px}.icon{font-size:3rem;margin-bottom:16px}.title{font-size:1.5rem;font-weight:700;margin-bottom:8px}.desc{color:#9a9aaa;margin-bottom:24px;line-height:1.6}.btn{display:inline-block;padding:10px 24px;background:#C74634;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;transition:background .2s}.btn:hover{background:#e05a48}</style></head><body><div class="wrap"><div class="icon">&#128268;</div><div class="title">当前离线</div><div class="desc">无法连接到服务器，请检查网络连接后重试。</div><a href="." class="btn" onclick="location.reload();return false">重新加载</a></div></body></html>',
              { status: 503, headers: { 'Content-Type': 'text/html;charset=UTF-8' } }
            )
          )
        )
    );
  }
});
