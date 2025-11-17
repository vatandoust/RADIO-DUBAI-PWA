const CACHE_NAME = 'roc-dubai-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // fallback برای iframe (Azura)
  '/offline.html'  // صفحه آفلاین ساده بساز (اختیاری)
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        if (response) return response;
        return fetch(e.request).catch(() => {
          // Fallback برای iOS/Chrome
          return caches.match('/index.html');
        });
      })
  );
});
