const currentTest = {
    id: 'test7',
    title: 'Тест на знание аниме',
    questions: [
        {
            id: 1,
            question: "Какой жанр аниме характеризуется наличием гигантских боевых роботов?",
            //image: "../media/questions/test7/test7_item1.jpg",
            options: ["Меха", "Сёнэн", "Кодомо", "Сэйнэн"],
            correctAnswer: "Меха"
        },
        {
            id: 2,
            question: "Как называется японская анимационная студия, создавшая 'Унесённые призраками'?",
            //image: "../media/questions/test7/test7_item2.jpg",
            options: ["Studio Ghibli", "Kyoto Animation", "Madhouse", "Bones"],
            correctAnswer: "Studio Ghibli"
        },
        {
            id: 3,
            question: "Что такое 'цундэрэ'?",
            options: [
                "Персонаж, который холоден снаружи, но добр внутри", 
                "Персонаж, одержимый главным героем", 
                "Персонаж с раздвоением личности",
                "Персонаж, который постоянно спит"
            ],
            correctAnswer: "Персонаж, который холоден снаружи, но добр внутри"
        },
        {
            id: 4,
            question: "Какое аниме считается первым цветным аниме-сериалом?",
            options: ["Astro Boy", "Kimba the White Lion", "Sally the Witch", "Princess Knight"],
            correctAnswer: "Astro Boy"
        },
        {
            id: 5,
            question: "Что означает термин 'манга'?",
            options: [
                "Японские комиксы",
                "Японская анимация",
                "Японские мультфильмы",
                "Японские новеллы"
            ],
            correctAnswer: "Японские комиксы"
        },
        {
            id: 6,
            question: "Кто является создателем манги 'Dragon Ball'?",
            options: ["Акира Торияма", "Эйитиро Ода", "Масаси Кисимото", "Тите Кубо"],
            correctAnswer: "Акира Торияма"
        },
        {
            id: 7,
            question: "Какой знаменитый режиссёр основал Studio Ghibli?",
            options: ["Хаяо Миядзаки", "Макото Синкай", "Мамору Хосода", "Сатоси Кон"],
            correctAnswer: "Хаяо Миядзаки"
        },
        {
            id: 8,
            question: "Что такое 'OVA' в аниме?",
            options: [
                "Original Video Animation",
                "Online Video Anime",
                "Only Viewed Abroad",
                "Original Visual Art"
            ],
            correctAnswer: "Original Video Animation"
        },
        {
            id: 9,
            question: "Какой жанр аниме ориентирован на девушек-подростков?",
            options: ["Сёдзё", "Сёнэн", "Дзёсэй", "Сэйнэн"],
            correctAnswer: "Сёдзё"
        },
        {
            id: 10,
            question: "В каком году вышло аниме 'Акира', ставшее классикой киберпанка?",
            options: ["1988", "1995", "1982", "1991"],
            correctAnswer: "1988"
        },
        {
            id: 11,
            question: "Что такое 'каваии'?",
            options: ["Милый", "Страшный", "Сильный", "Грустный"],
            correctAnswer: "Милый"
        },
        {
            id: 12,
            question: "Какая студия создала аниме 'Твоё имя'?",
            options: ["CoMix Wave Films", "Studio Ghibli", "Kyoto Animation", "Shaft"],
            correctAnswer: "CoMix Wave Films"
        },
        {
            id: 13,
            question: "Кто такие 'отаку'?",
            options: [
                "Фанаты аниме и манги",
                "Японские художники",
                "Создатели аниме",
                "Персонажи аниме"
            ],
            correctAnswer: "Фанаты аниме и манги"
        },
        {
            id: 14,
            question: "Какое аниме получило Оскар за лучший анимационный фильм?",
            options: [
                "Унесённые призраками",
                "Твоё имя",
                "Принцесса Мононоке",
                "Форма голоса"
            ],
            correctAnswer: "Унесённые призраками"
        },
        {
            id: 15,
            question: "Что означает термин 'сэйю'?",
            options: [
                "Актёр озвучивания",
                "Режиссёр аниме",
                "Художник манги",
                "Композитор"
            ],
            correctAnswer: "Актёр озвучивания"
        }
    ]
};

// Функция для отображения вопроса
async function showQuestionAsync() {
    const question = currentTest.questions[QuizCommon.currentQuestion];
    const shuffledOptions = QuizCommon.shuffleArray([...question.options]);
    
    const container = document.querySelector('.question-container');
    container.innerHTML = `
        <h1 class="quiz-title">${question.question}</h1>
        ${question.image ? `<img src="${question.image}" alt="Вопрос ${question.id}" class="question-image">` : ''}
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
