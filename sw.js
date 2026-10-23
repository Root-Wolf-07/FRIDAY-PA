/**
 * FRIDAY A.I. - PROGRESSIVE WEB APP SERVICE WORKER
 * Enables instant boot, offline shell caching, and standalone mobile app support
 * Targets: Android (Chrome/Edge/Samsung), iOS (Safari standalone), macOS & Linux Desktop
 */

const CACHE_NAME = 'friday-ai-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/core.js',
  '/agents.js',
  '/canvas.js',
  '/audio.js',
  '/voice.js',
  '/backend-bridge.js',
  '/manifest.json',
  '/icons/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png'
];

// Install: Cache critical HUD assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[⚡ FRIDAY Service Worker] Pre-caching static HUD assets...');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[⚡ FRIDAY Service Worker] Pre-caching warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean up previous caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[⚡ FRIDAY Service Worker] Purging legacy cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first for dynamic APIs; Stale-while-revalidate for static shell
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass service worker for API calls, health checks, docs, and WebSockets
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/health') ||
    url.pathname.startsWith('/docs') ||
    url.pathname.startsWith('/openapi.json') ||
    url.pathname.startsWith('/ws')
  ) {
    return; // Pass through directly to backend
  }

  // Handle static assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
