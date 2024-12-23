const newsData = {
    news: [
        {
            id: 5,
            date: "14.12.2024",
            title: "Добавлен новый тест \"Угадай аниме по постеру\"!",
            text: "Проверьте свои знания постеров аниме в нашем новом захватывающем тесте. Сможете ли вы узнать аниме по постерам?",
            image: "media/test_preview/test5.gif",
            link: "pages/test5.html",
            linkText: "Перейти к тесту →",
            isNew: true
        },
        {
            id: 4,
            date: "14.11.2024",
            title: "Добавлен новый тест \"Угадай аниме в жанре романтика\"!",
            text: "Проверьте свои знания романтических аниме в нашем новом захватывающем тесте. Сможете ли вы узнать любимые ромкомы по скиншотам?",
            image: "media/test_preview/test4.jpeg",
            link: "pages/test4.html",
            linkText: "Пройти тест →",
            isNew: false
        },
        {
            id: 3,
            date: "13.11.2024",
            title: "Добавлен новый тест \"Угадай персонажа по силуэту\"!",
            text: "Проверьте свои знания аниме персонажей в нашем новом захватывающем тесте. Сможете ли вы узнать любимых героев только по их силуэтам?",
            image: "media/test_preview/test3.jpg",
            isNew: false
        },
        {
            id: 2,
            date: "25.12.2023",
            title: "Обновление: Добавлен тест \"Угадай аниме по опенингу\"",
            text: "Теперь вы можете проверить свои знания аниме опенингов! Насколько хорошо вы знаете музыкальное сопровождение ваших любимых аниме?",
            image: "media/test_preview/test2.jpg",
            link: "pages/test2.html",
            linkText: "Попробовать →",
            isNew: false
        },
        {
            id: 1,
            date: "24.12.2023",
            title: "С Новым Годом!",
            text: "Поздравляем всех с наступающим Новым Годом! Желаем всем отличного настроения и новых достижений!",
            image: "media/news/newyear.jpg",
            isNew: false
        }
    ]
};

const NewsManager = {
    // Базовые пути для разных страниц
    paths: {
        home: './',      // для главной страницы
        pages: '../'     // для страниц в папке pages
    },

    // Получить последнюю новость для главной страницы
    getLatestNews() {
        return newsData.news[0];
    },

    // Получить все новости для страницы новостей
    getAllNews() {
        return newsData.news;
    },

    // Отрендерить превью последней новости на главной странице
    renderLatestNewsPreview() {
        const latestNews = this.getLatestNews();
        const newsContainer = document.querySelector('.news-preview');
        if (newsContainer) {
            newsContainer.innerHTML = `
                <p class="news-date">${latestNews.date}</p>
                <p class="news-text">${latestNews.title}</p>
                <span class="read-more">Читать все новости →</span>
            `;
        }
    },

    // Отрендерить все новости на странице новостей
    renderAllNews(basePath = '../') {
        const newsList = document.querySelector('.news-list');
        
        if (newsList) {
            newsList.innerHTML = newsData.news.map(news => {
                return `
                    <div class="news-item">
                        <div class="news-header">
                            <span class="news-date">${news.date}</span>
                            ${news.isNew ? '<span class="news-tag new">Новое</span>' : ''}
                        </div>
                        <h2>${news.title}</h2>
                        <p>${news.text}</p>
                        <div class="news-image">
                            <img src="${basePath}${news.image}" alt="${news.title}">
                        </div>
                        ${news.link ? `<a href="${basePath}${news.link}" class="news-link">${news.linkText || 'Подробнее →'}</a>` : ''}
                    </div>
                `;
            }).join('');
        }
    }
};