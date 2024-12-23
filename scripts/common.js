const QuizCommon = {
    // Общие переменные состояния
    currentQuestion: 0,
    correctAnswers: 0,
    quizStartTime: null,

    // Навигация
    goToHome() {
        window.location.href = '../index.html';
    },
    goProfile() {
        window.location.href = '../pages/profile.html';
    },
    goToSettings() {
        window.location.href = '../pages/settings.html';
    },
    goToGames() {
        window.location.href = '../pages/games.html';
    },
    goToAbout() {
        window.location.href = '../pages/about.html';
    },

    // Перезапуск теста
    restartQuiz() {
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        if (typeof showQuestion === 'function') {
            showQuestion();
        }
    },

    // Проверка ответа
    checkAnswer(selectedAnswer) {
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.disabled = true;
        });
        
        if (selectedAnswer === currentTest.questions[this.currentQuestion].correctAnswer) {
            this.correctAnswers++;
        }
        
        this.currentQuestion++;
        if (this.currentQuestion < currentTest.questions.length) {
            showQuestion();
        } else {
            const endTime = Date.now();
            const timeTaken = endTime - this.quizStartTime;
            
            // Проверяем достижения, передавая время прохождения
            AchievementsManager.checkAchievements(
                currentTest.id, 
                this.correctAnswers, 
                currentTest.questions.length,
                timeTaken
            );
            
            this.quizStartTime = null;
            this.showResults();
        }
    },

    // Показ результатов
    showResults() {
        const container = document.querySelector('.container');
        const result = UserManager.processTestResult(
            currentTest.id,
            this.correctAnswers,
            currentTest.questions.length
        );

        // Проверяем достижения
        AchievementsManager.checkAchievements(
            currentTest.id,
            this.correctAnswers,
            currentTest.questions.length
        );

        container.innerHTML = `
            <div class="question-container">
                <h1 class="quiz-title">Тест завершен!</h1>
                <div class="results">
                    <p>Правильных ответов: ${result.totalScore} из ${result.totalQuestions}</p>
                    ${result.isNewBest 
                        ? `<p>Новый рекорд! Получено очков: +${result.earnedPoints}</p>`
                        : `<p>Ваш лучший результат: ${result.previousBest} из ${result.totalQuestions}</p>`
                    }
                    <div class="results-buttons">
                        <button class="option-button" onclick="QuizCommon.restartQuiz()">Пройти заново</button>
                        <button class="option-button" onclick="QuizCommon.goToHome()">На главную</button>
                    </div>
                </div>
            </div>
        `;
    },

    // Добавляем функцию для перемешивания массива
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    startQuiz() {
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.quizStartTime = Date.now();
        showQuestion();
    }
};
