/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-3439cb3';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./kukacka_002.html","./kukacka_005.html","./kukacka_006.html","./kukacka_007.html","./kukacka_008.html","./kukacka_009.html","./kukacka_010.html","./kukacka_011.html","./kukacka_012.html","./kukacka_013.html","./kukacka_014.html","./kukacka_015.html","./kukacka_016.html","./kukacka_017.html","./kukacka_018.html","./kukacka_019.html","./kukacka_020.html","./kukacka_021.html","./kukacka_022.html","./kukacka_023.html","./kukacka_024.html","./kukacka_025.html","./kukacka_026.html","./kukacka_027.html","./kukacka_028.html","./kukacka_029.html","./kukacka_030.html","./kukacka_031.html","./kukacka_032.html","./kukacka_033.html","./kukacka_034.html","./kukacka_035.html","./kukacka_036.html","./kukacka_037.html","./kukacka_038.html","./kukacka_039.html","./kukacka_040.html","./kukacka_041.html","./kukacka_042.html","./kukacka_043.html","./kukacka_044.html","./kukacka_045.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/obalka_kukacka.jpg","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
