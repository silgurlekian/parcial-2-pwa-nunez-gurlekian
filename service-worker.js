const LISTA = [
    '/',
    'index.html',
    'js/script.js',
    'css/materialize.min.css',
];

// Instalación del SW
self.addEventListener('install', (e) => {
    console.log("Instalación del Service Worker");
    
    e.waitUntil(
        caches.open('MoviesApp').then((cache) => {
            return cache.addAll(LISTA);
        })
    );
});

// Activación del SW
self.addEventListener('activate', (e) => {
    console.log('Activación del Service Worker');

    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== 'MoviesApp') {
                        console.log('Limpiando caché antigua:', cacheName);
                        return caches.delete(cacheName); // Elimina caché antigua
                    }
                })
            );
        })
    );
});

// Fetch para manejar las solicitudes de red
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
