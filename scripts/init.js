document.addEventListener('DOMContentLoaded', () => {
    // Инициализация UserManager должна быть первой
    UserManager.init();

    // Запуск теста (если мы на странице теста)
    if (typeof currentTest !== 'undefined') {
        QuizCommon.startQuiz();
    }

    // Обработчик для аудио (останавливает другие аудио при воспроизведении нового)
    document.addEventListener('play', function(e) {
        if (e.target.tagName === 'AUDIO') {
            const audios = document.getElementsByTagName('audio');
            for(let audio of audios) {
                if(audio !== e.target) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }
        }
    }, true);

    // Обработка ошибок
    window.addEventListener('error', function(event) {
        // Игнорируем ошибки без информации
        if (!event.message || event.message === 'Script error.') {
            return;
        }
        
        console.error('Ошибка:', {
            message: event.message,
            url: event.filename,
            line: event.lineno,
            column: event.colno,
            error: event.error
        });
    });

    // Регистрация Service Worker с абсолютным путем
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/nAnimeQuiz/sw.js', { scope: '/nAnimeQuiz/' })
            .then(registration => {
                console.log('ServiceWorker зарегистрирован:', registration);
            })
            .catch(error => {
                console.log('Ошибка регистрации ServiceWorker:', error);
            });
    }
});
