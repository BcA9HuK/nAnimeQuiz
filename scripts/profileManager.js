const ProfileManager = {
    init() {
        this.updateProfile();
        this.updateStatistics();
        AchievementsManager.renderAchievements(document.querySelector('.achievements-container'));
    },

    updateProfile() {
        const username = document.querySelector('.username');
        const status = document.querySelector('.user-status');
        const avatarImg = document.querySelector('.avatar img');
        
        if (username) {
            username.textContent = UserManager.getUsername();
        }
        if (status) {
            const userStatus = UserManager.getStatus();
            status.textContent = userStatus || 'Статус не установлен';
        }
        if (avatarImg) {
            const defaultAvatar = '/nAnimeQuiz/media/default-avatar.png';
            const currentAvatar = UserManager.getAvatar();
            
            try {
                // Проверяем, является ли аватар base64 строкой
                if (currentAvatar && currentAvatar.startsWith('data:image')) {
                    // Создаем Blob из base64
                    fetch(currentAvatar)
                        .then(res => res.blob())
                        .then(blob => {
                            // Создаем временный URL для Blob
                            const objectURL = URL.createObjectURL(blob);
                            avatarImg.src = objectURL;
                            
                            // Очищаем URL после загрузки
                            avatarImg.onload = () => {
                                URL.revokeObjectURL(objectURL);
                            };
                        })
                        .catch(err => {
                            console.error('Ошибка загрузки аватара:', err);
                            avatarImg.src = defaultAvatar;
                        });
                } else {
                    // Если это не base64, используем как обычный URL
                    avatarImg.src = currentAvatar || defaultAvatar;
                }
            } catch (err) {
                console.error('Ошибка при обработке аватара:', err);
                avatarImg.src = defaultAvatar;
                console.log('Установлен дефолтный аватар');
            }

            // Обработка ошибок загрузки
            avatarImg.onerror = function() {
                console.log('Ошибка загрузки аватара, устанавливаем дефолтный');
                this.src = defaultAvatar;
            };
        }
        UserManager.updatePointsDisplay();
    },

    updateStatistics() {
        const stats = UserManager.getStatistics();
        const achievements = UserManager.getAchievements();
        
        const completedTests = document.querySelector('.completed-tests');
        const achievementsCount = document.querySelector('.achievements-count');
        
        if (completedTests) {
            completedTests.textContent = stats.testsCompleted;
        }
        if (achievementsCount) {
            achievementsCount.textContent = achievements.length;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ProfileManager.init();
}); 