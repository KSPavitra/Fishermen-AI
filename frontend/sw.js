const CACHE_NAME = 'fishermen-ai-v26';
const CORE_STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './css/styles.css',
  './libs/ort.all.min.js',
  './models/fish_classes.json',
  './js/config.js',
  './js/state.js',
  './js/audio.js',
  './js/theme.js',
  './js/localization.js',
  './js/navigation.js',
  './js/safety.js',
  './js/telemetry.js',
  './js/market.js',
  './js/cv_classifier.js',
  './js/features.js',
  './js/fishreels.js',
  './js/voice.js',
  './js/pwa.js',
  './js/app.js'
];

const HEAVY_AI_ASSETS = [
  './libs/ort-wasm-simd-threaded.wasm',
  './models/fish_mobilenet_v3.onnx'
];

// Install event - Cache static assets with high resiliency
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('🐟 [Service Worker v26] Caching App Shell & Core Modules');
      // 1. Cache core lightweight UI shell first
      await cache.addAll(CORE_STATIC_ASSETS);

      // 2. Cache heavy AI binary models asynchronously so network hiccups never break installation
      HEAVY_AI_ASSETS.forEach(asset => {
        cache.add(asset).catch(err => {
          console.warn('🐟 [Service Worker v26] Background cache note for:', asset, err.message);
        });
      });
    })
  );
  self.skipWaiting();
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('🐟 [Service Worker v26] Removing old cache:', key);
          return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network-first for Navigation & APIs, Stale-while-revalidate for static assets
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. Navigation requests (HTML document): Network-First with offline cache fallback
  if (event.request.mode === 'navigate' || event.request.destination === 'document' || url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, resClone));
          }
          return networkResponse;
        })
        .catch(() => caches.match('./index.html') || caches.match(event.request))
    );
    return;
  }

  // 2. API requests: Network-First with offline cache fallback
  if (url.pathname.includes('/weather') || url.pathname.includes('/market-prices') || url.pathname.includes('/best-time') || url.pathname.includes('/tide') || url.pathname.includes('/schemes') || url.pathname.includes('/calendar') || url.pathname.includes('/fish-prediction')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, resClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // 3. Static assets: Stale-while-revalidate strategy
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, resClone);
          });
        }
        return networkResponse;
      }).catch(err => {
        // Suppress expected offline fetch errors for cached resources
        return null;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
