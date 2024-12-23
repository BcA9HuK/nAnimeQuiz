const InstallManager = {
    init() {
        let deferredPrompt;
        const installButton = document.createElement('button');
        installButton.classList.add('install-button');
        installButton.style.display = 'none';
        
        // Добавляем крестик для закрытия
        const installContainer = document.createElement('div');
        installContainer.classList.add('install-container');
        
        const closeButton = document.createElement('button');
        closeButton.classList.add('install-close');
        closeButton.innerHTML = '×';
        
        const installText = document.createElement('div');
        installText.classList.add('install-text');
        installText.innerHTML = `
            <p>Установите приложение</p>
            <small>для быстрого доступа к тестам</small>
        `;
        
        installContainer.appendChild(installText);
        installContainer.appendChild(closeButton);
        document.body.appendChild(installContainer);

        // Проверяем, не отклонил ли пользователь установку ранее
        const isInstallDeclined = localStorage.getItem('installDeclined');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Показываем кнопку только если пользователь не отклонял установку
            if (!isInstallDeclined) {
                installContainer.style.display = 'flex';
            }
        });

        installContainer.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`User response: ${outcome}`);
                deferredPrompt = null;
                installContainer.style.display = 'none';
            }
        });

        // Обработка закрытия
        closeButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие события
            installContainer.style.display = 'none';
            // Запоминаем, что пользователь отклонил установку
            localStorage.setItem('installDeclined', 'true');
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            installContainer.style.display = 'none';
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    InstallManager.init();
}); 