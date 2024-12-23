const AchievementsManager = {
    ACHIEVEMENTS: {
        FIRST_STEPS: {
            id: 'first_steps',
            title: 'Первые шаги',
            description: 'Пройдите любой тест',
            icon: '🎯'
        },
        ANIME_EXPERT: {
            id: 'anime_expert',
            title: 'Знаток аниме',
            description: 'Пройдите все тесты',
            icon: '🏆'
        },
        PERFECT_SCORE: {
            id: 'perfect_score',
            title: 'Идеальный результат',
            description: 'Получите 100% в любом тесте',
            icon: '⭐'
        },
        HIGH_SCORE: {
            id: 'high_score',
            title: 'Высокий результат',
            description: 'Получите более 80% в любом тесте',
            icon: '✨'
        },
        PERSISTENT: {
            id: 'persistent',
            title: 'Настойчивый',
            description: 'Пройдите один тест 5 раз',
            icon: '🔄'
        },
        SPEED_RUNNER: {
            id: 'speed_runner',
            title: 'Спидраннер',
            description: 'Пройдите тест менее чем за 2 минуты',
            icon: '⚡'
        },
        COLLECTOR: {
            id: 'collector',
            title: 'Коллекционер',
            description: 'Наберите 1000 очков',
            icon: '💎'
        },
        NIGHT_OWL: {
            id: 'night_owl',
            title: 'Ночная сова',
            description: 'Пройдите тест после полуночи',
            icon: '🌙'
        },
        EARLY_BIRD: {
            id: 'early_bird',
            title: 'Ранняя пташка',
            description: 'Пройдите тест до 7 утра',
            icon: '🌅'
        }
    },

    checkAchievements(testId, score, totalQuestions, timeTaken) {

        // Проверка на первое прохождение теста
        this.grantAchievement('FIRST_STEPS');

        // Проверка на идеальное прохождение
        if (score === totalQuestions) {
            this.grantAchievement('PERFECT_SCORE');
        }

        // Проверка на высокий результат (более 80%)
        if (score >= totalQuestions * 0.8) {
            this.grantAchievement('HIGH_SCORE');
        }

        // Проверка на прохождение всех тестов
        const testsProgress = UserManager.getTestsProgress();
        const uniqueTestsCompleted = Object.keys(testsProgress).length;
        if (uniqueTestsCompleted >= 8) {
            this.grantAchievement('ANIME_EXPERT');
        }

        // Новые проверки
        // Проверка на настойчивость
        if (testsProgress[testId]?.attempts >= 5) {
            this.grantAchievement('PERSISTENT');
        }

        // Проверка на спидран (если время прохождения меньше 2 минут)
        if (timeTaken && timeTaken < 120000) {
            this.grantAchievement('SPEED_RUNNER');
        }

        // Проверка на количество очков
        if (UserManager.getPoints() >= 1000) {
            this.grantAchievement('COLLECTOR');
        }

        // Проверка времени суток
        const currentHour = new Date().getHours();
        if (currentHour >= 0 && currentHour < 6) {
            this.grantAchievement('NIGHT_OWL');
        }
        if (currentHour >= 5 && currentHour < 7) {
            this.grantAchievement('EARLY_BIRD');
        }
    },

    grantAchievement(achievementKey) {
        const achievement = this.ACHIEVEMENTS[achievementKey];
        if (!achievement) return;

        const userAchievements = UserManager.getAchievements();
        if (!userAchievements.includes(achievement.id)) {
            userAchievements.push(achievement.id);
            UserManager.setAchievements(userAchievements);
            this.showAchievementNotification(achievement);
        }
    },

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h3>Новое достижение!</h3>
                <p>${achievement.title}</p>
                <p>${achievement.description}</p>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    getAchievementInfo(achievementId) {
        return Object.values(this.ACHIEVEMENTS).find(a => a.id === achievementId);
    },

    renderAchievements(container) {
        const userAchievements = UserManager.getAchievements();
        const allAchievements = Object.values(this.ACHIEVEMENTS);
        
        const achievementsHTML = allAchievements.map(achievement => {
            const isUnlocked = userAchievements.includes(achievement.id);
            return `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-info">
                        <div class="achievement-title">${achievement.title}</div>
                        <div class="achievement-description">${achievement.description}</div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = achievementsHTML;
    }
}; 