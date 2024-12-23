const currentTest = {
    id: 'test5',
    title: 'Угадай аниме по постеру',
    questions: [
        {
            id: 1,
            image: "../media/questions/test5/test5_item1.png",
            question: "Угадай аниме по постеру",
            options: ["Кошечка из Сакурасо", "Хёка", "Связь сердец", "Как и ожидалось, моя школьная романтическая жизнь не удалась"],
            correctAnswer: "Кошечка из Сакурасо"
        },
        {
            id: 2,
            image: "../media/questions/test5/test5_item2.png",
            question: "Угадай аниме по постеру",
            options: ["Гордость убийцы", "Мастера Меча Онлайн", "Хроники Акаши — худшего магического преподавателя", "Абсолютный дуэт"],
            correctAnswer: "Гордость убийцы"
        },
        {
            id: 3,
            image: "../media/questions/test5/test5_item3.png",
            question: "Угадай аниме по постеру",
            options: ["Задержи этот звук!", "Яркая Тихая", "Чистый звук", "Твоя апрельская ложь"],
            correctAnswer: "Задержи этот звук!"
        },
        {
            id: 4,
            image: "../media/questions/test5/test5_item4.png",
            question: "Угадай аниме по постеру",
            options: ["Подручный Луизы-Нулизы", "Пламенный взор Шаны", "Танец клинка элементалиста", "Печать ветра"],
            correctAnswer: "Подручный Луизы-Нулизы"
        },
        {
            id: 5,
            image: "../media/questions/test5/test5_item5.png",
            question: "Угадай аниме по постеру",
            options: ["Геймеры!", "Низкоуровневый персонаж Томодзаки", "С этим клубом точно что-то не так!", "Новая игра!"],
            correctAnswer: "Геймеры!"
        },
        {
            id: 6,
            image: "../media/questions/test5/test5_item6.png",
            question: "Угадай аниме по постеру",
            options: ["Реальная девушка", "Геймеры!", "Так сложно любить отаку", "История знакомства опытной тебя и неопытного меня"],
            correctAnswer: "Реальная девушка"
        },
        {
            id: 7,
            image: "../media/questions/test5/test5_item7.png",
            question: "Угадай аниме по постеру",
            options: ["ТораДора!", "Кошечка из Сакурасо", "Золотая пора", "Кланнад"],
            correctAnswer: "ТораДора!"
        },
        {
            id: 8,
            image: "../media/questions/test5/test5_item8.png",
            question: "Угадай аниме по постеру",
            options: ["Подручный Луизы-Нулизы", "Пламенный взор Шаны", "Танец клинка элементалиста", "Печать ветра"],
            correctAnswer: "Пламенный взор Шаны"
        },
        {
            id: 9,
            image: "../media/questions/test5/test5_item9.png",
            question: "Угадай аниме по постеру",
            options: ["Грабитель", "Внук мудреца", "Маг-обманщик из другого мира", "Перестану быть героем"],
            correctAnswer: "Грабитель"
        },
        {
            id: 10,
            image: "../media/questions/test5/test5_item10.png",
            question: "Угадай аниме по постеру",
            options: ["Грабитель", "Внук мудреца", "Маг-обманщик из другого мира", "Перестану быть героем"],
            correctAnswer: "Внук мудреца"
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

    if (QuizCommon.currentQuestion === 0) {
        await TestPreloader.preloadInitialImages(currentTest);
        TestPreloader.preloadRemainingImages(currentTest);
    }

    const question = currentTest.questions[QuizCommon.currentQuestion];
    
    if (question.image) {
        await TestPreloader.preloadImage(question.image);
    }

    const container = document.querySelector('.question-container');
    const shuffledOptions = QuizCommon.shuffleArray([...question.options]);
    
    container.innerHTML = `
        <h1 class="quiz-title">${question.question}</h1>
        <img src="${question.image}" alt="Аниме скриншот" class="poster-image">
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
