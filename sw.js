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
    '/nAnimeQuiz/media/profile-icon.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                // Кешируем файлы по одному, чтобы видеть, какой именно файл вызывает ошибку
                return Promise.all(
                    urlsToCache.map(url => {
                        return cache.add(url).catch(err => {
                            console.log('Ошибка кеширования для:', url, err);
                            // Продолжаем, даже если один файл не удалось закешировать
                            return Promise.resolve();
                        });
                    })
                );
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
}); 