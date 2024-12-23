const currentTest = {
    id: 'test6',
    title: 'Сопоставь персонажа и аниме',
    userAnswers: [],
    
    questions: [
        {
            id: 1,
            pairs: [
                { character: "Лайт", anime: "Тетрадь смерти" },
                { character: "Микаса", anime: "Атака титанов" },
                { character: "Спайк", anime: "Ковбой Бибоп" },
                { character: "Рем", anime: "Re:Zero" }
            ]
        },
        {
            id: 2,
            pairs: [
                { character: "Сэнку", anime: "Доктор Стоун" },
                { character: "Тандзиро", anime: "Клинок демонов" },
                { character: "Сайтама", anime: "Ванпанчмен" },
                { character: "Мэй", anime: "Иная" }
            ]
        },
        {
            id: 3,
            pairs: [
                { character: "Лелуш", anime: "Код Гиас" },
                { character: "Синдзи", anime: "Евангелион" },
                { character: "Гатс", anime: "Берсерк" },
                { character: "Сики", anime: "Сад грешников" }
            ]
        },
        {
            id: 4,
            pairs: [
                { character: "Эдвард", anime: "Стальной алхимик" },
                { character: "Сёя", anime: "Форма голоса" },
                { character: "Окабэ", anime: "Врата Штейна" },
                { character: "Ай", anime: "Магическая битва" }
            ]
        },
        {
            id: 5,
            pairs: [
                { character: "Виолетта", anime: "Вайолет Эвергарден" },
                { character: "Сакута", anime: "Банни девушка" },
                { character: "Ходака", anime: "Дитя погоды" },
                { character: "Юи", anime: "K-On!" }
            ]
        },
        {
            id: 6,
            pairs: [
                { character: "Субару", anime: "Re:Zero" },
                { character: "Сёко", anime: "Форма голоса" },
                { character: "Рой", anime: "Стальной алхимик" },
                { character: "Мицуха", anime: "Твоё имя" }
            ]
        },
        {
            id: 7,
            pairs: [
                { character: "Кирито", anime: "Мастера меча" },
                { character: "Тоору", anime: "Корзинка фруктов" },
                { character: "Моб", anime: "Моб Психо 100" },
                { character: "Нанами", anime: "Магическая битва" }
            ]
        },
        {
            id: 8,
            pairs: [
                { character: "Нацу", anime: "Хвост Феи" },
                { character: "Ичиго", anime: "Блич" },
                { character: "Канеки", anime: "Токийский гуль" },
                { character: "Сиро", anime: "Судьба" }
            ]
        },
        {
            id: 9,
            pairs: [
                { character: "2B", anime: "NieR:Automata" },
                { character: "Мэйрин", anime: "Тёмный дворецкий" },
                { character: "Люси", anime: "Киберпанк" },
                { character: "Рейджи", anime: "Синий экзорцист" }
            ]
        },
        {
            id: 10,
            pairs: [
                { character: "Ято", anime: "Бездомный бог" },
                { character: "Юкино", anime: "Орегаиру" },
                { character: "Такемичи", anime: "Токийские мстители" },
                { character: "Мисато", anime: "Евангелион" }
            ]
        }
    ],
    
    colors: [
        '#FF1493', // deep pink
        '#FFD700', // gold
        '#00FF00', // lime
        '#FF4500'  // orange red
    ]
};

let selectedPairs = [];
let currentSelection = null;

async function showQuestionAsync() {
    selectedPairs = [];
    currentSelection = null;
    
    const question = currentTest.questions[QuizCommon.currentQuestion];
    const shuffledAbilities = QuizCommon.shuffleArray([...question.pairs.map(p => p.anime)]);
    
    const container = document.querySelector('.question-container');
    container.innerHTML = `
        <h1 class="quiz-title">Сопоставь персонажа и аниме</h1>
        <div class="question-counter">${QuizCommon.currentQuestion + 1}/${currentTest.questions.length}</div>
        <div class="matching-container">
            ${question.pairs.map((pair, index) => `
                <div class="matching-row">
                    <div class="button-wrapper">
                        <button class="matching-button" 
                                data-index="${index}" 
                                onclick="selectItem(this, 'character')">
                            ${pair.character}
                        </button>
                    </div>
                    <div class="button-wrapper">
                        <button class="matching-button" 
                                data-index="${index}" 
                                onclick="selectItem(this, 'anime')">
                            ${shuffledAbilities[index]}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="control-buttons">
            <button class="reset-button" onclick="resetSelections()">
                Сбросить выбор
            </button>
            <button class="next-button" onclick="checkAndNext()" disabled>
                Следующий вопрос
            </button>
        </div>
    `;
}
function selectItem(button, type) {
    if (currentSelection && currentSelection.type !== type) {
        const pairColor = currentTest.colors[selectedPairs.length];
        
        const pair = {
            character: type === 'character' ? button.textContent.trim() : currentSelection.text,
            anime: type === 'anime' ? button.textContent.trim() : currentSelection.text,
            color: pairColor
        };
        
        button.style.border = `3px solid ${pairColor}`;
        button.style.boxShadow = `0 0 10px ${pairColor}`;
        currentSelection.element.style.border = `3px solid ${pairColor}`;
        currentSelection.element.style.boxShadow = `0 0 10px ${pairColor}`;
        
        selectedPairs.push(pair);
        
        button.disabled = true;
        currentSelection.element.disabled = true;
        
        currentSelection = null;
        
        if (selectedPairs.length === currentTest.questions[QuizCommon.currentQuestion].pairs.length) {
            document.querySelector('.next-button').disabled = false;
        }
    } else {
        if (currentSelection && currentSelection.type === type) {
            currentSelection.element.style.border = 'none';
            currentSelection.element.style.boxShadow = 'none';
            currentSelection.element.style.background = 'linear-gradient(45deg, #4CAF50, #45B7D1)';
            currentSelection.element.style.transform = 'scale(1)';
        }
        
        currentSelection = {
            type: type,
            text: button.textContent.trim(),
            element: button
        };
        
        button.style.background = 'linear-gradient(45deg, #45B7D1, #4CAF50)';
        button.style.transform = 'scale(0.98)';
        button.style.boxShadow = '0 0 15px rgba(69, 183, 209, 0.5)';
    }
}

function resetSelections() {
    selectedPairs = [];
    currentSelection = null;
    
    const buttons = document.querySelectorAll('.matching-button');
    buttons.forEach(button => {
        button.style.borderColor = 'transparent';
        button.style.boxShadow = 'none';
        button.style.background = 'linear-gradient(45deg, #4CAF50, #45B7D1)';
        button.style.transform = 'scale(1)';
        button.disabled = false;
    });
    
    document.querySelector('.next-button').disabled = true;
}

function checkAndNext() {
    currentTest.userAnswers[QuizCommon.currentQuestion] = [...selectedPairs];
    
    if (QuizCommon.currentQuestion < currentTest.questions.length - 1) {
        QuizCommon.currentQuestion++;
        selectedPairs = [];
        currentSelection = null;
        showQuestionAsync();
    } else {
        calculateFinalScore();
    }
}

function calculateFinalScore() {
    let totalCorrectPairs = 0;
    const totalQuestions = Number(currentTest.questions.length);
    
    // Проверяем ответы пользователя
    currentTest.userAnswers.forEach((answers, questionIndex) => {
        const question = currentTest.questions[questionIndex];
        let allPairsCorrect = true;
        
        if (answers.length !== question.pairs.length) {
            allPairsCorrect = false;
        } else {
            answers.forEach(userPair => {
                const isCorrect = question.pairs.some(correctPair => 
                    correctPair.character === userPair.character && 
                    correctPair.anime === userPair.anime
                );
                
                if (!isCorrect) {
                    allPairsCorrect = false;
                }
            });
        }
        
        if (allPairsCorrect) {
            totalCorrectPairs++;
        }
    });
    
    totalCorrectPairs = Number(totalCorrectPairs);
    
    // Используем UserManager для сохранения результатов
    const result = UserManager.processTestResult('test6', totalCorrectPairs, totalQuestions);
    
    // Вычисляем процент правильных ответов
    const percentCorrect = (totalCorrectPairs / totalQuestions) * 100;
    
    // Проверяем достижения через AchievementsManager
    AchievementsManager.checkAchievements(
        'test6',           // testId
        totalCorrectPairs, // score
        totalQuestions     // totalQuestions
    );
    
    // Создаем HTML для результатов
    const container = document.querySelector('.question-container');
    container.innerHTML = `
        <h1 class="quiz-title">Тест завершен!</h1>
        <div class="results">
            <p>Правильных ответов: ${totalCorrectPairs} из ${totalQuestions}</p>
            <p>Ваш лучший результат: ${result.isNewBest ? totalCorrectPairs : result.previousBest} из ${totalQuestions}</p>
            <p>Заработано очков: ${result.earnedPoints}</p>
        </div>
        <div class="control-buttons">
            <button class="reset-button" onclick="location.reload()">
                Пройти заново
            </button>
            <button class="next-button" onclick="window.location.href='../index.html'">
                На главную
            </button>
        </div>
    `;
}

// Функция-обертка для вызова из init.js
function showQuestion() {
    showQuestionAsync();
}

