const InstallManager = {
    deferredPrompt: null,

    init() {
        console.log('InstallManager инициализирован'); // Отладка

        // Создаем кнопку установки
        const installButton = document.createElement('button');
        installButton.classList.add('install-button');
        installButton.style.display = 'none';
        installButton.innerHTML = `
            <span>Установить приложение</span>
        `;
        document.body.appendChild(installButton);

        // Отслеживаем возможность установки
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log('Получено событие beforeinstallprompt'); // Отладка
            e.preventDefault();
            this.deferredPrompt = e;
            installButton.style.display = 'flex';
        });

        // Обработчик клика
        installButton.addEventListener('click', async () => {
            console.log('Кнопка установки нажата'); // Отладка
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                const { outcome } = await this.deferredPrompt.userChoice;
                console.log('Результат установки:', outcome);
                this.deferredPrompt = null;
                installButton.style.display = 'none';
            } else {
                console.log('deferredPrompt недоступен');
            }
        });

        // Проверяем, поддерживается ли установка
        if ('getInstalledRelatedApps' in navigator) {
            navigator.getInstalledRelatedApps()
                .then(apps => {
                    console.log('Установленные приложения:', apps);
                })
                .catch(console.error);
        }
    }
};

// Инициализация
if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        InstallManager.init();
    });
} else {
    console.log('PWA не поддерживается в этом браузере');
} 