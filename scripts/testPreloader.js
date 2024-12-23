const TestPreloader = {
    // Кэш для хранения загруженных изображений
    imageCache: new Map(),

    // Предзагрузка первых N изображений теста
    preloadInitialImages(test, count = 3) {
        const imagesToPreload = test.questions
            .slice(0, count)
            .filter(q => q.image)
            .map(q => q.image);

        return Promise.all(imagesToPreload.map(path => this.preloadImage(path)));
    },

    // Предзагрузка всех оставшихся изображений теста
    preloadRemainingImages(test, startFrom = 3) {
        const remainingImages = test.questions
            .slice(startFrom)
            .filter(q => q.image)
            .map(q => q.image);

        // Загружаем в фоновом режиме
        remainingImages.forEach(path => this.preloadImage(path));
    },

    // Загрузка отдельного изображения
    preloadImage(path) {
        if (this.imageCache.has(path)) {
            return Promise.resolve(this.imageCache.get(path));
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.imageCache.set(path, img);
                resolve(img);
            };
            
            img.onerror = () => {
                console.error(`Ошибка загрузки изображения: ${path}`);
                reject(new Error(`Не удалось загрузить изображение: ${path}`));
            };

            img.src = path;
        });
    },

    // Получение предзагруженного изображения
    getImage(path) {
        return this.imageCache.get(path);
    }
}; 