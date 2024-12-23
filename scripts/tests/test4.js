const currentTest = {
    id: 'test4',
    title: 'Угадай аниме 4',
    questions: [
        {
            id: 1,
            image: "../media/questions/test4/test4_item1.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Волчица и черный принц", "Чудачества любви не помеха!", "Нахальный принц и кошка-несмеяна", "Кошечка из Сакурасо"],
            correctAnswer: "Волчица и черный принц"
        },
        {
            id: 2,
            image: "../media/questions/test4/test4_item2.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Двуличная сестрёнка Умару!", "У меня мало друзей", "Нахальный принц и кошка-несмеяна", "Все мы живём в общежитии Кавай"],
            correctAnswer: "Двуличная сестрёнка Умару!"
        },
        {
            id: 3,
            image: "../media/questions/test4/test4_item3.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Золотая пора", "Как воспитать героиню из обычной девушки", "Хоримия", "Президент студсовета - горничная!"],
            correctAnswer: "Золотая пора"
        },
        {
            id: 4,
            image: "../media/questions/test4/test4_item4.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Как воспитать героиню из обычной девушки", "Кошечка из Сакурасо", "Реальная девушка", "Монстр за соседней партой!"],
            correctAnswer: "Как воспитать героиню из обычной девушки"
        },
        {
            id: 5,
            image: "../media/questions/test4/test4_item5.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Кошечка из Сакурасо", "Волчица и черный принц", "ТораДора!", "Золотая пора"],
            correctAnswer: "Кошечка из Сакурасо"
        },
        {
            id: 6,
            image: "../media/questions/test4/test4_item6.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Монстр за соседней партой", "Волчица и черный принц", "У меня мало друзей", "Чудачества любви не помеха!"],
            correctAnswer: "Монстр за соседней партой"
        },
        {
            id: 7,
            image: "../media/questions/test4/test4_item7.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Нахальный принц и кошка-несмеяна", "Двуличная сестрёнка Умару!", "Все мы живём в общежитии Кавай", "Эта фарфоровая кукла влюбилась"],
            correctAnswer: "Нахальный принц и кошка-несмеяна"
        },
        {
            id: 8,
            image: "../media/questions/test4/test4_item8.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Все мы живём в общежитии Кавай", "Президент студсовета - горничная!", "Как воспитать героиню из обычной девушки", "Монстр за соседней партой"],
            correctAnswer: "Все мы живём в общежитии Кавай"
        },
        {
            id: 9,
            image: "../media/questions/test4/test4_item9.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Президент студсовета - горничная!", "Монстр за соседней партой", "Золотая пора", "Волчица и черный принц"],
            correctAnswer: "Президент студсовета - горничная!"
        },
        {
            id: 10,
            image: "../media/questions/test4/test4_item10.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Реальная девушка", "ТораДора!", "Золотая пора", "Нахальный принц и кошка-несмеяна"],
            correctAnswer: "Реальная девушка"
        },
        {
            id: 11,
            image: "../media/questions/test4/test4_item11.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["ТораДора!", "Чудачества любви не помеха!", "Двуличная сестрёнка Умару!", "Эта фарфоровая кукла влюбилась"],
            correctAnswer: "ТораДора!"
        },
        {
            id: 12,
            image: "../media/questions/test4/test4_item12.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["У меня мало друзей", "Все мы живём в общежитии Кавай", "Кошечка из Сакурасо", "Монстр за соседней партой"],
            correctAnswer: "У меня мало друзей"
        },
        {
            id: 13,
            image: "../media/questions/test4/test4_item13.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Хоримия", "Реальная девушка", "Чудачества любви не помеха!", "ТораДора!"],
            correctAnswer: "Хоримия"
        },
        {
            id: 14,
            image: "../media/questions/test4/test4_item14.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Чудачества любви не помеха!", "Золотая пора", "Монстр за соседней партой", "Как воспитать героиню из обычной девушки"],
            correctAnswer: "Чудачества любви не помеха!"
        },
        {
            id: 15,
            image: "../media/questions/test4/test4_item15.jpg",
            question: "Угадай аниме в жанре романтика",
            options: ["Эта фарфоровая кукла влюбилась", "Президент студсовета - горничная!", "Двуличная сестрёнка Умару!", "Волчица и черный принц!"],
            correctAnswer: "Эта фарфоровая кукла влюбилась"
        }
    ]
};

// Добавляем индикатор загрузки для вопросов
function showLoadingIndicator() {
    const container = document.querySelector('.question-container');
    container.innerHTML = `
        <div class="question-loading">
            <div class="preloader-spinner"></div>
            <div>Загрузка вопроса...</div>
        </div>
    `;
}

// Асинхронная функция показа вопроса
async function showQuestionAsync() {
    showLoadingIndicator();

    // При первом вопросе предзагружаем первые 3 изображения
    if (QuizCommon.currentQuestion === 0) {
        await TestPreloader.preloadInitialImages(currentTest);
        // Начинаем загрузку оставшихся изображений в фоновом режиме
        TestPreloader.preloadRemainingImages(currentTest);
    }

    const question = currentTest.questions[QuizCommon.currentQuestion];
    
    // Ждем загрузки изображения текущего вопроса
    if (question.image) {
        await TestPreloader.preloadImage(question.image);
    }

    const container = document.querySelector('.question-container');
    const shuffledOptions = QuizCommon.shuffleArray([...question.options]);
    
    container.innerHTML = `
        <h1 class="quiz-title">${question.question}</h1>
        <img src="${question.image}" alt="Аниме скриншот" class="question-image">
        <div class="question-counter">${QuizCommon.currentQuestion + 1}/${currentTest.questions.length}</div>
        <div class="options-container">
            ${shuffledOptions.map(option => `
                <button class="option-button" onclick="QuizCommon.checkAnswer('${option}')">${option}</button>
            `).join('')}
        </div>
    `;
}

// Функция-обертка для вызова из init.js
function showQuestion() {
    showQuestionAsync();
}
