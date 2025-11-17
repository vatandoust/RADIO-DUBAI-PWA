const CACHE_NAME = 'roc-dubai-v5';
const OFFLINE_URL = '/index.html';

const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles.css',
  '/script.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

const IOS_ASSETS = [
  '/icons/apple-splash-2048-2732.png',
  '/icons/apple-splash-1668-2388.png',
  '/icons/apple-splash-1536-2048.png',
  '/icons/apple-splash-1125-2436.png',
  '/icons/apple-splash-1242-2688.png',
  '/icons/apple-splash-828-1792.png',
  '/icons/apple-splash-750-1334.png',
  '/icons/apple-splash-640-1136.png',
  '/icons/apple-icon-180.png',
  '/icons/apple-icon-152.png',
  '/icons/apple-icon-167.png',
  '/icons/apple-icon-120.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([...CRITICAL_ASSETS, ...IOS_ASSETS]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => cacheName !== CACHE_NAME).map(cacheName => caches.delete(cacheName))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match(OFFLINE_URL))
  );
});
