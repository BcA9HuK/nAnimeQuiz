const currentTest = {
    id: 'test2',
    title: 'Угадай аниме по опенингу',
    
    questions: [
        {
            id: 1,
            audio: "../media/questions/test2/opening1.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Наруто", "Блич", "Ван Пис", "Драгонболл"],
            correctAnswer: "Наруто"
        },
        {
            id: 2,
            audio: "../media/questions/test2/opening2.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Атака титанов", "Токийский гуль", "Клинок, рассекающий демонов", "Моя геройская академия"],
            correctAnswer: "Атака титанов"
        },
        {
            id: 3,
            audio: "../media/questions/test2/opening3.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Стальной алхимик", "Код Гиас", "Тетрадь смерти", "Евангелион"],
            correctAnswer: "Тетрадь смерти"
        },
        {
            id: 4,
            audio: "../media/questions/test2/opening4.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Твоё имя", "Унесённые призраками", "Ходячий замок", "Принцесса Мононоке"],
            correctAnswer: "Твоё имя"
        },
        {
            id: 5,
            audio: "../media/questions/test2/opening5.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Золотая пора", "Твоё имя", "ТораДора!", "Кошечка из Сакурасо"],
            correctAnswer: "Золотая пора"
        },
        {
            id: 6,
            audio: "../media/questions/test2/opening6.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Невероятное приключение ДжоДжо", "91 день", "Шумиха!", "Ковбой Бибоп"],
            correctAnswer: "Шумиха!"
        },
        {
            id: 7,
            audio: "../media/questions/test2/opening7.mp3",
            question: "Угадай аниме по опенигу",
            options: ["Убийца гоблинов", "Созданный в Бездне", "Сага о Винланде", "Дороро"],
            correctAnswer: "Убийца гоблинов"
        },
        {
            id: 8,
            audio: "../media/questions/test2/opening8.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Мемуары Ванитаса", "Созданный в Бездне", "Последний Серафим", "Синий экзорцист"],
            correctAnswer: "Последний Серафим"
        },
        {
            id: 9,
            audio: "../media/questions/test2/opening9.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Перезапись", "Кланнад", "Ангельские ритмы!", "Маленькие проказники!"],
            correctAnswer: "Перезапись"
        },
        {
            id: 10,
            audio: "../media/questions/test2/opening10.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Чёрный клевер", "Башня Бога", "Бог старшей школы", "Магическая битва"],
            correctAnswer: "Бог старшей школы"
        },
        {
            id: 11,
            audio: "../media/questions/test2/opening11.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Двуличная сестрёнка Умару", "Мелочи жизни", "Отступница Габриэль", "Счастливая звезда"],
            correctAnswer: "Двуличная сестрёнка Умару"
        },
        {
            id: 12,
            audio: "../media/questions/test2/opening12.mp3",
            question: "Угадай аниме по опенингу",
            options: ["Человек-бензопила", "Атака титанов", "Магическая битва", "Адский рай"],
            correctAnswer: "Человек-бензопила"
        }
    ],

    showQuestion() {
        const question = this.questions[QuizCommon.currentQuestion];
        const container = document.querySelector('.container');
        
        const shuffledOptions = QuizCommon.shuffleArray([...question.options]);
        
        const questionHTML = `
            <div class="question-container">
                <h1 class="quiz-title">${question.question}</h1>
                <div class="audio-container">
                    <div class="custom-audio-player">
                        <button class="play-button">
                            <i class="fas fa-play"></i>
                        </button>
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                        <div class="time">0:00</div>
                        <div class="volume-control">
                            <i class="fas fa-volume-up"></i>
                            <input type="range" class="volume-slider" min="0" max="100" value="50">
                        </div>
                        <audio class="question-audio">
                            <source src="${question.audio}" type="audio/mp3">
                        </audio>
                    </div>
                    <div class="audio-message">Нажмите Play чтобы прослушать опенинг</div>
                </div>
                <div class="question-counter">${QuizCommon.currentQuestion + 1}/${this.questions.length}</div>
                <div class="options-container">
                    ${shuffledOptions.map(option => `
                        <button class="option-button" onclick="QuizCommon.checkAnswer('${option}')">${option}</button>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.innerHTML = questionHTML;
        this.initAudioPlayer(container);
    },

    initAudioPlayer(container) {
        const player = container.querySelector('.custom-audio-player');
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-button');
        const progressBar = player.querySelector('.progress-bar');
        const progress = player.querySelector('.progress');
        const timeDisplay = player.querySelector('.time');
        const volumeSlider = player.querySelector('.volume-slider');
        const volumeIcon = player.querySelector('.volume-control i');
        const message = container.querySelector('.audio-message');

        // Устанавливаем начальную громкость
        audio.volume = volumeSlider.value / 100;

        // Управление воспроизведением
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().then(() => {
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    message.style.display = 'none'; // Скрываем сообщение после начала воспроизведения
                }).catch(error => {
                    console.log('Ошибка воспроизведения:', error);
                });
            } else {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Обновление прогресса
        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progress.style.width = percent + '%';
            
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });

        // Перемотка при клике
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });

        // Управление громкостью
        volumeSlider.addEventListener('input', () => {
            const value = volumeSlider.value / 100;
            audio.volume = value;
            
            if (value === 0) {
                volumeIcon.className = 'fas fa-volume-mute';
            } else if (value < 0.5) {
                volumeIcon.className = 'fas fa-volume-down';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
            }
        });

        // Подсказка времени при наведении
        progressBar.addEventListener('mousemove', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            progressBar.title = this.formatTime(percent * audio.duration);
        });
    },

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
};

// Функция для показа текущего вопроса (вызывается из common.js)
function showQuestion() {
    currentTest.showQuestion();
}
