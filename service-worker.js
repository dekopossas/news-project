const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/styles.css',
  '/script.js',
  '/image.jpg',
  // Outros recursos que você deseja armazenar em cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Retorna o recurso em cache, se existir
      if (response) {
        return response;
      }

      // Caso contrário, busca o recurso na rede
      return fetch(event.request);
    }),
  );
});
