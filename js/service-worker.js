const LISTA = [
    '/',
    'index.html',
    'js/script.js',
    'css/materialize.min.css',
    // Otros archivos estáticos que necesitas en tu aplicación
];

self.addEventListener('install', (e) => {
    console.log("install");
    const cache = caches.open('MoviesApp').then((cache) => {
        cache.addAll(LISTA);
    });
    e.waitUntil(cache);
});
