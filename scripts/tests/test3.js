const currentTest = {
    id: 'test3',
    title: 'Угадай персонажа по силуэту',
    
    questions: [
        {
            id: 1,
            image: "../media/questions/test3/silhouette1.png",
            question: "Угадайте персонажа по силуэту:",
            options: ["Наруто Узумаки", "Ичиго Куросаки", "Эрен Йегер", "Луффи"],
            correctAnswer: "Луффи"
        },
        {
            id: 2,
            image: "../media/questions/test3/silhouette2.png",
            question: "Кто этот персонаж?",
            options: ["Микаса Аккерман", "Рикка Таканаси", "Аска Кудо", "Синка Нибутани"],
            correctAnswer: "Рикка Таканаси"
        },
        {
            id: 3,
            image: "../media/questions/test3/silhouette3.png",
            question: "Узнаете этого персонажа?",
            options: ["Шуви Дола", "Харука Нанасэ", "Шира", "Рикка Таканаси"],
            correctAnswer: "Шуви Дола"
        },
        {
            id: 4,
            image: "../media/questions/test3/silhouette4.png",
            question: "Яре Яре",
            options: ["Дыо Брандо", "Джозеф Джостар", "Джорно Джованна", "Джотаро Куджо"],
            correctAnswer: "Джотаро Куджо"
        },
        {
            id: 5,
            image: "../media/questions/test3/silhouette5.png",
            question: "Что это за покемон?",
            options: ["Ёкосима", "Шигэкиё Янгу", "Карлсон", "Томохиро Нагацука"],
            correctAnswer: "Карлсон"
        },
        {
            id: 6,
            image: "../media/questions/test3/silhouette6.png",
            question: "Угадай, какая тут милашка?",
            options: ["Аки Сино", "Маширо Шина", "Нана Хаяшида", "Цубаки Савабэ"],
            correctAnswer: "Маширо Шина"
        },
        {
            id: 7,
            image: "../media/questions/test3/silhouette7.png",
            question: "Кто скрывается в тени?",
            options: ["Куруми Токисаки", "Эвкливуд Хеллсайт", "Вайолет Эвергарден", "Розарита Тиснерос"],
            correctAnswer: "Куруми Токисаки"
        },
        {
            id: 8,
            image: "../media/questions/test3/silhouette8.png",
            question: "Угадай какой тут дворецкий изображён?",
            options: ["Себас Тьян", "Ясуси Тадзири", "Себастьян Михаэлис", "Диабло"],
            correctAnswer: "Себастьян Михаэлис"
        },
        {
            id: 9,
            image: "../media/questions/test3/silhouette9.png",
            question: "Чей силуэт перед вами?",
            options: ["Рем", "Рю Лайон", "Милим Нава", "Рафталия"],
            correctAnswer: "Рем"
        },
        {
            id: 10,
            image: "../media/questions/test3/silhouette10.png",
            question: "Кто изображён на этом силуэте?",
            options: ["Ханджи Зоэ", "Аямэ Ёмогава", "Саэко Бусудзима", "Юри Хондзё"],
            correctAnswer: "Ханджи Зоэ"
        },
        {
            id: 11,
            image: "../media/questions/test3/silhouette11.png",
            question: "Кому принадлежит этот силуэт?",
            options: ["Тайга Айсака", "Луиза Франсуаза ле Бланк де ла Вальер", "Канна Камуи", "Шана"],
            correctAnswer: "Тайга Айсака"
        },
        {
            id: 12,
            image: "../media/questions/test3/silhouette12.png",
            question: "Этот силуэт принадлежит...",
            options: ["Рин Окумура", "Икки Куроганэ", "Кадзуто Киригая", "Дзэнъицу Агацума"],
            correctAnswer: "Рин Окумура"
        },
        {
            id: 13,
            image: "../media/questions/test3/silhouette13.png",
            question: "Разгадайте, кому принадлежит этот силуэт?",
            options: ["Риас Гремори", "Лисара Ресталл", "Рио Роллинз Татибана", "Анна Като"],
            correctAnswer: "Риас Гремори"
        },
        {
            id: 14,
            image: "../media/questions/test3/silhouette14.png",
            question: "Кто скрывается за этим силуэтом?",
            options: ["Гагаран", "Газель Дварго", "Дворф-шаман", "Псайгер-0"],
            correctAnswer: "Гагаран"
        },
        {
            id: 15,
            image: "../media/questions/test3/silhouette15.png",
            question: "Разгадайте, кому принадлежит этот силуэт:",
            options: ["Боксо", "Рицу Хаясака", "Симон", "9-Альфа"],
            correctAnswer: "Боксо"
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
        <img src="${question.image}" alt="Силуэт персонажа" class="silhouette-image">
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
