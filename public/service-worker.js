// Nome della cache
const CACHE_NAME = 'crudocotto-cache-v2';
const DATA_CACHE_NAME = 'crudocotto-data-cache-v2';

// Risorse statiche da mettere in cache all'installazione
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo16.png',
  '/logo32.png',
  '/logo64.png', 
  '/logo192.png',
  '/logo512.png'
];

// Installazione del service worker
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  
  // Esegui l'installazione in modo asincrono
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        // Metti in cache i file statici
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[ServiceWorker] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Attivazione e pulizia delle vecchie cache
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  
  event.waitUntil(
    Promise.all([
      // Controllo e pulizia delle cache
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (
              cacheName !== CACHE_NAME &&
              cacheName !== DATA_CACHE_NAME
            ) {
              console.log('[ServiceWorker] Removing old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Prendi controllo di tutti i client senza refresh
      self.clients.claim()
    ])
  );
});

// Strategia cache-first per risorse statiche, network-first per dati API
self.addEventListener('fetch', event => {
  // Dividi le richieste per dati (API) e asset statici
  const requestUrl = new URL(event.request.url);
  
  // Usa una strategia offline-first con network fallback
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Ritorna la cache direttamente, ma aggiorna la cache in background
          // per la prossima visita (cache-first strategy)
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              // Aggiorna la cache con la nuova versione
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  })
                  .catch(err => {
                    console.error('[ServiceWorker] Errore durante l\'aggiornamento della cache', err);
                  });
              }
              return networkResponse;
            })
            .catch(err => {
              console.log('[ServiceWorker] Fetch fallito, servendo dalla cache', err);
            });
          
          // Ritorna subito la cache mentre aggiorniamo in background
          return cachedResponse;
        }
        
        // Se non è in cache, prova dalla rete
        return fetch(event.request)
          .then(response => {
            // Controlla se abbiamo ottenuto una risposta valida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la risposta perché è uno stream e può essere letto solo una volta
            const responseToCache = response.clone();

            // Aggiungi alla cache per la prossima volta
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => {
                console.error('[ServiceWorker] Errore durante l\'aggiunta alla cache', err);
              });

            return response;
          })
          .catch(error => {
            console.log('[ServiceWorker] Fetch fallito completamente', error);
            
            // Per pagine HTML, mostra la pagina offline
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // Per altre richieste fallite, potremmo avere un fallback generico
            // o semplicemente lasciare fallire la richiesta
            return new Response('Contenuto non disponibile offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
}); 