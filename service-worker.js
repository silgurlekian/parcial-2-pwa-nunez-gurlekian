const LISTA = [
    '/',
    'index.html',
    'js/script.js',
    'css/materialize.min.css',
];

self.addEventListener('install', (e) => {
    console.log("install");
    const cache = caches.open('MoviesApp').then((cache) => {
        cache.addAll(LISTA);
    });
    e.waitUntil(cache);
});
