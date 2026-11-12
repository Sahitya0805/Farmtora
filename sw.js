const CACHE_NAME = 'farmtora-cache-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css?v=4',
  './script.js?v=4',
  './manifest.json',
  './public/farmtora_logo.png'
];

// Install: pre-cache the app shell so it opens offline.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Fetch: network first for our own files (so updates show up immediately),
// falling back to the cache when the network is unavailable.
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return; // let the browser handle API calls and CDN assets normally
  }

  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then(cached => cached || caches.match('./index.html'))
      )
  );
});

// Activate: remove caches from older versions and take control right away.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});
