const InstallManager = {
    deferredPrompt: null,

    init() {
        // Создаем кнопку установки
        const installButton = document.createElement('button');
        installButton.classList.add('install-button');
        installButton.style.display = 'none';
        installButton.innerHTML = `
            <img src="/nAnimeQuiz/media/install-icon.png" alt="Установить">
            <span>Установить приложение</span>
        `;
        document.body.appendChild(installButton);

        // Отслеживаем возможность установки
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            installButton.style.display = 'flex';
            console.log('PWA может быть установлено'); // Для отладки
        });

        // Обработчик клика по кнопке
        installButton.addEventListener('click', async () => {
            if (this.deferredPrompt) {
                console.log('Показываем промпт установки'); // Для отладки
                this.deferredPrompt.prompt();
                const { outcome } = await this.deferredPrompt.userChoice;
                console.log('Результат установки:', outcome);
                this.deferredPrompt = null;
                installButton.style.display = 'none';
            } else {
                console.log('deferredPrompt не доступен'); // Для отладки
            }
        });

        // Если приложение уже установлено
        window.addEventListener('appinstalled', () => {
            console.log('PWA успешно установлено');
            installButton.style.display = 'none';
        });
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    InstallManager.init();
}); 