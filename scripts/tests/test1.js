const currentTest = {
    id: 'test1',
    title: 'Угадай аниме по скриншоту',
    questions: [
        {
            id: 1,
            image: "../media/questions/test1/test1_item1.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Я хочу съесть твою поджелудочную", "Хёка", "Связь сердец", "Как и ожидалось, моя школьная романтическая жизнь не удалась"],
            correctAnswer: "Я хочу съесть твою поджелудочную"
        },
        {
            id: 2,
            image: "../media/questions/test1/test1_item2.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Гинтама", "Детектив-оборотень Инаба", "Вельзепуз", "Человек-бензопила"],
            correctAnswer: "Детектив-оборотень Инаба"
        },
        {
            id: 3,
            image: "../media/questions/test1/test1_item3.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Адский рай", "Токийский гуль", "Иллюзия рая", "Из нового света"],
            correctAnswer: "Иллюзия рая"
        },
        {
            id: 4,
            image: "../media/questions/test1/test1_item4.png",
            question: "Угадай аниме по скриншоту",
            options: ["Брошенный кролик", "Меланхолия Харухи Судзумии", "Этот глупый свин не понимает мечту девочки-зайки", "Аниме-истории"],
            correctAnswer: "Аниме-истории"
        },
        {
            id: 5,
            image: "../media/questions/test1/test1_item5.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Повседневная жизнь старшеклассников", "Дурни, тесты, аватары", "Нет лекарства для моего брата!", "Запредельная четвёрка"],
            correctAnswer: "Повседневная жизнь старшеклассников"
        },
        {
            id: 6,
            image: "../media/questions/test1/test1_item6.png",
            question: "Угадай аниме по скриншоту",
            options: ["Слишком много проигравших героинь!", "Мой «комплекс братика» морали не остановить!", "Как и ожидалось, моя школьная романтическая жизнь не удалась", "Этот глупый свин не понимает мечту девочки-зайки"],
            correctAnswer: "Слишком много проигравших героинь!"
        },
        {
            id: 7,
            image: "../media/questions/test1/test1_item7.png",
            question: "Угадай аниме по скриншоту",
            options: ["Аватар короля", "Драконий жемчуг", "Лунное путешествие приведёт к новому миру", "Дракон-горничная госпожи Кобаяси"],
            correctAnswer: "Аватар короля"
        },
        {
            id: 8,
            image: "../media/questions/test1/test1_item8.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Госпожа Кагуя: в любви как на войне", "Моб Психо 100", "Магическая битва", "Вечеринка мертвецов"],
            correctAnswer: "Госпожа Кагуя: в любви как на войне"
        },
        {
            id: 9,
            image: "../media/questions/test1/test1_item9.png",
            question: "Угадай аниме по скриншоту",
            options: ["Королева со скальпелем", "Шарлотта", "Натюрморт в серых тонах", "Парад смерти"],
            correctAnswer: "Королева со скальпелем"
        },
        {
            id: 10,
            image: "../media/questions/test1/test1_item10.jpg",
            question: "Угадай аниме по скриншоту",
            options: ["Магическая битва", "Волейбол!!", "Блич", "Путь аса"],
            correctAnswer: "Магическая битва"
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
