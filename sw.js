const CACHE_NAME = 'anime-tests-v1';
const urlsToCache = [
    '/nAnimeQuiz/',
    '/nAnimeQuiz/index.html',
    '/nAnimeQuiz/styles/style.css',
    '/nAnimeQuiz/scripts/init.js',
    '/nAnimeQuiz/scripts/news.js',
    '/nAnimeQuiz/media/home-icon.png',
    '/nAnimeQuiz/media/play-icon.png',
    '/nAnimeQuiz/media/about-icon.png',
    '/nAnimeQuiz/media/profile-icon.png',
    '/nAnimeQuiz/media/favicon/favicon-32x32.png',
    '/nAnimeQuiz/media/favicon/apple-touch-icon.png',
    '/nAnimeQuiz/media/favicon/icon-512x512.png'
];

// Установка Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Кэширование файлов');
                return cache.addAll(urlsToCache);
            })
    );
    // Принудительно активируем Service Worker
    self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Удаление старого кэша:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Захватываем управление над всеми вкладками
    self.clients.claim();
});

// Перехват запросов
self.addEventListener('fetch', event => {
    // Пропускаем запросы с base64
    if (event.request.url.startsWith('data:')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    });
            })
    );
}); 