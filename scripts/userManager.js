const UserManager = {
    KEYS: {
        USERNAME: 'username',
        POINTS: 'points',
        TESTS_PROGRESS: 'testsProgress',
        ACHIEVEMENTS: 'achievements',
        STATUS: 'status',
        AVATAR: 'avatar'
    },

    init() {
        if (!this.getUsername()) {
            this.setUsername('Гость');
        }
        if (!this.getStatus()) {
            this.setStatus('');
        }
        if (!this.getPoints()) {
            this.setPoints(0);
        }
        if (!this.getTestsProgress()) {
            this.setTestsProgress({});
        }
        if (!this.getAchievements()) {
            this.setAchievements([]);
        }
        if (!this.getAvatar()) {
            this.setAvatar('👤');
        }
        this.updatePointsDisplay();
        this.updateUsernameDisplay();
    },

    // Базовые методы для работы с данными
    getUsername() {
        return localStorage.getItem(this.KEYS.USERNAME);
    },

    setUsername(name) {
        localStorage.setItem(this.KEYS.USERNAME, name);
        this.updateUsernameDisplay();
    },

    getPoints() {
        return parseInt(localStorage.getItem(this.KEYS.POINTS)) || 0;
    },

    setPoints(points) {
        localStorage.setItem(this.KEYS.POINTS, points);
        this.updatePointsDisplay();
    },

    getTestsProgress() {
        return JSON.parse(localStorage.getItem(this.KEYS.TESTS_PROGRESS)) || {};
    },

    setTestsProgress(progress) {
        localStorage.setItem(this.KEYS.TESTS_PROGRESS, JSON.stringify(progress));
    },

    // Обработка результатов теста
    processTestResult(testId, score, totalQuestions) {
        const progress = this.getTestsProgress();
        const previousBest = progress[testId]?.bestScore || 0;
        const currentPoints = score * 10;
        let earnedPoints = 0;

        // Обновляем прогресс теста
        progress[testId] = {
            ...progress[testId],
            lastScore: score,
            totalQuestions,
            attempts: (progress[testId]?.attempts || 0) + 1,
            lastAttemptAt: new Date().toISOString()
        };

        // Начисляем очки только если результат лучше предыдущего
        if (score > previousBest) {
            progress[testId].bestScore = score;
            earnedPoints = (score - previousBest) * 10;
            this.addPoints(earnedPoints);
        }

        this.setTestsProgress(progress);
        return {
            isNewBest: earnedPoints > 0,
            earnedPoints,
            totalScore: score,
            totalQuestions,
            previousBest
        };
    },

    // Вспомогательные методы
    addPoints(points) {
        const currentPoints = this.getPoints();
        this.setPoints(currentPoints + points);
    },

    updateUsernameDisplay() {
        const usernameElements = document.querySelectorAll('.title');
        usernameElements.forEach(element => {
            element.textContent = this.getUsername();
        });
    },

    updatePointsDisplay() {
        const pointsElements = document.querySelectorAll('.points');
        pointsElements.forEach(element => {
            if (element) {
                element.textContent = `🏆 ${this.getPoints()}`;
            }
        });
    },

    // Получение статистики для профиля
    getStatistics() {
        const progress = this.getTestsProgress();
        return {
            totalPoints: this.getPoints(),
            testsCompleted: Object.keys(progress).length,
            bestResults: Object.entries(progress).map(([testId, data]) => ({
                testId,
                bestScore: data.bestScore,
                totalQuestions: data.totalQuestions,
                attempts: data.attempts
            }))
        };
    },

    // Очистка данных
    clearAllData() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });


        this.init();
    },

    // Добавляем методы для работы с достижениями
    getAchievements() {
        return JSON.parse(localStorage.getItem(this.KEYS.ACHIEVEMENTS)) || [];
    },

    setAchievements(achievements) {
        localStorage.setItem(this.KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    },

    // Добавляем методы для работы со статусом
    getStatus() {
        return localStorage.getItem(this.KEYS.STATUS) || '';
    },

    setStatus(status) {
        localStorage.setItem(this.KEYS.STATUS, status);
    },

    // Методы для работы с аватаром
    getAvatar() {
        return localStorage.getItem(this.KEYS.AVATAR) || null;
    },

    setAvatar(imageData) {
        localStorage.setItem(this.KEYS.AVATAR, imageData);
    }
}; 