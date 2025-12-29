self.addEventListener('install', (event) => {
  const CACHE = 'sip-timer-v1';
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE);
        // Cache core shell; assets are hashed and will be cached on demand
        await cache.addAll([
          '/',
          '/index.html',
          '/favicon.svg',
        ]);
      } catch (e) {
        // best-effort
      } finally {
        self.skipWaiting();
      }
    })()
  );
});

self.addEventListener('activate', (event) => {
  const CURRENT = 'sip-timer-v1';
  event.waitUntil(
    (async () => {
      // cleanup old caches
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => k !== CURRENT).map(k => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    // Fallback if not JSON
    data = { title: 'Sip Timer', body: 'Timer complete', url: '/' };
  }
  const title = data.title || 'Sip Timer';
  const options = {
    body: data.body || 'Your timer is done',
    icon: data.icon || '/favicon.ico',
    badge: data.badge || '/favicon.ico',
    data: { url: data.url || '/', ...data },
    vibrate: data.vibrate || [100, 50, 100],
    requireInteraction: !!data.requireInteraction,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification && event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Cache-first for static assets and images to speed up repeat visits and back nav
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Only same-origin static assets
  const isAsset = url.origin === location.origin && (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webp')
  );
  if (!isAsset) return;
  event.respondWith(
    (async () => {
      const cache = await caches.open('sip-timer-v1');
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const fresh = await fetch(req);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        return cached || Response.error();
      }
    })()
  );
});
