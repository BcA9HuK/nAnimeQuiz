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
    '/nAnimeQuiz/media/favicon/icon-192x192.png',
    '/nAnimeQuiz/media/favicon/icon-512x512.png'
];

// Установка
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Кэширование файлов');
                return cache.addAll(urlsToCache);
            })
    );
});

// Активация
self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            // Очистка старого кэша
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            // Принимаем контроль сразу
            self.clients.claim()
        ])
    );
});

// Обработка сообщений
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Fetch
self.addEventListener('fetch', event => {
    if (event.request.url.startsWith('chrome-extension://') || 
        event.request.url.startsWith('data:')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then(response => {
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        const url = new URL(event.request.url);
                        if (url.origin !== self.location.origin) {
                            return response;
                        }

                        const responseToCache = response.clone();

                        // Используем Promise.resolve для правильной обработки
                        return Promise.resolve()
                            .then(() => {
                                return caches.open(CACHE_NAME);
                            })
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                                return response;
                            })
                            .catch(err => {
                                console.error('Ошибка кэширования:', err);
                                return response;
                            });
                    });
            })
    );
});

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: '/nAnimeQuiz/media/favicon/icon-192x192.png',
        badge: '/nAnimeQuiz/media/favicon/icon-192x192.png'
    };

    event.waitUntil(
        self.registration.showNotification('Аниме Тесты', options)
    );
}); 