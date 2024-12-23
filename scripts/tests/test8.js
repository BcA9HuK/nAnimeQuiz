const currentTest = {
    id: 'test8',
    title: 'Тест на знание японской культуры',
    questions: [
        {
            id: 1,
            question: "Как называется традиционная японская одежда?",
            options: ["Кимоно", "Ханбок", "Ципао", "Сари"],
            correctAnswer: "Кимоно"
        },
        {
            id: 2,
            question: "Какой вид боевого искусства зародился в Японии?",
            options: ["Карате", "Кунг-фу", "Муай-тай", "Капоэйра"],
            correctAnswer: "Карате"
        },
        {
            id: 3,
            question: "Что такое 'васаби'?",
            options: [
                "Острая приправа из корня хрена", 
                "Вид суши", 
                "Традиционный соус",
                "Вид лапши"
            ],
            correctAnswer: "Острая приправа из корня хрена"
        },
        {
            id: 4,
            question: "Как называется традиционное японское искусство составления букетов?",
            options: ["Икебана", "Оригами", "Бонсай", "Кабуки"],
            correctAnswer: "Икебана"
        },
        {
            id: 5,
            question: "Что такое 'татами'?",
            options: [
                "Соломенные маты для пола", 
                "Японский меч", 
                "Вид суши",
                "Традиционный музыкальный инструмент"
            ],
            correctAnswer: "Соломенные маты для пола"
        },
        {
            id: 6,
            question: "Какой напиток традиционно подают во время чайной церемонии?",
            options: ["Маття", "Улун", "Эрл Грей", "Пуэр"],
            correctAnswer: "Маття"
        },
        {
            id: 7,
            question: "Как называется традиционная японская бумажная перегородка?",
            options: ["Сёдзи", "Татами", "Фусума", "Генкан"],
            correctAnswer: "Сёдзи"
        },
        {
            id: 8,
            question: "Что такое 'онсэн'?",
            options: [
                "Горячий источник", 
                "Вид суши", 
                "Традиционный праздник",
                "Музыкальный инструмент"
            ],
            correctAnswer: "Горячий источник"
        },
        {
            id: 9,
            question: "Как называется традиционная японская обувь?",
            options: ["Гэта", "Сабо", "Эспадрильи", "Мокасины"],
            correctAnswer: "Гэта"
        },
        {
            id: 10,
            question: "Что такое 'кайдзэн'?",
            options: [
                "Философия непрерывного совершенствования", 
                "Вид боевого искусства", 
                "Традиционный праздник",
                "Стиль живописи"
            ],
            correctAnswer: "Философия непрерывного совершенствования"
        },
        {
            id: 11,
            question: "Что такое 'ханами'?",
            options: [
                "Любование цветением сакуры", 
                "Традиционный танец", 
                "Вид боевого искусства",
                "Чайная церемония"
            ],
            correctAnswer: "Любование цветением сакуры"
        },
        {
            id: 12,
            question: "Как называется традиционное японское искусство выращивания карликовых деревьев?",
            options: [
                "Бонсай", 
                "Икебана", 
                "Оригами",
                "Кинцуги"
            ],
            correctAnswer: "Бонсай"
        },
        {
            id: 13,
            question: "Как называется традиционная японская живопись тушью?",
            options: ["Суми-э", "Укиё-э", "Манга", "Кандзи"],
            correctAnswer: "Суми-э"
        },
        {
            id: 14,
            question: "Что такое 'юката'?",
            options: [
                "Летнее хлопковое кимоно", 
                "Традиционный веер", 
                "Вид суши",
                "Боевое искусство"
            ],
            correctAnswer: "Летнее хлопковое кимоно"
        },
        {
            id: 15,
            question: "Как называется традиционный японский театр масок?",
            options: ["Но", "Кабуки", "Бунраку", "Ракуго"],
            correctAnswer: "Но"
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
