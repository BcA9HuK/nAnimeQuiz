document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('suggestForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestion');
    
    // Инициализируем EmailJS
    emailjs.init("jupqcstVCz21mrAO7");

    // Функция для добавления обработчика удаления вопроса
    function addRemoveHandler(removeBtn, questionBlock) {
        removeBtn.addEventListener('click', () => {
            if (questionsContainer.children.length > 1) {
                questionBlock.remove();
                // Обновляем нумерацию оставшихся вопросов
                Array.from(questionsContainer.children).forEach((block, index) => {
                    block.querySelector('h3').textContent = `Вопрос ${index + 1}`;
                });
            } else {
                alert('Необходимо оставить хотя бы один вопрос!');
            }
        });
    }

    // Добавляем обработчики для существующих кнопок удаления
    document.querySelectorAll('.remove-question').forEach(btn => {
        addRemoveHandler(btn, btn.closest('.question-block'));
    });

    // Обработчик добавления нового вопроса
    addQuestionBtn.addEventListener('click', () => {
        const questionNumber = questionsContainer.children.length + 1;
        const questionBlock = document.createElement('div');
        questionBlock.className = 'question-block';
        
        questionBlock.innerHTML = `
            <div class="question-header">
                <h3>Вопрос ${questionNumber}</h3>
                <button type="button" class="remove-question" title="Удалить вопрос">×</button>
            </div>
            <div class="form-group">
                <label>Вопрос/Описание</label>
                <textarea class="question-text" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label>Правильный ответ</label>
                <input type="text" class="correct-answer" required>
            </div>
            <div class="form-group">
                <label>Варианты ответов (каждый с новой строки)</label>
                <textarea class="other-answers" rows="3" required></textarea>
            </div>
            <div class="form-group">
                <label>Ссылка на медиафайл (если есть)</label>
                <input type="text" class="media-link">
            </div>
        `;

        // Добавляем обработчик для новой кнопки удаления
        const removeBtn = questionBlock.querySelector('.remove-question');
        addRemoveHandler(removeBtn, questionBlock);

        questionsContainer.appendChild(questionBlock);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Показываем индикатор загрузки
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
        
        // Форматируем вопросы
        const questions = Array.from(questionsContainer.children).map((block, index) => {
            return `Вопрос ${index + 1}:
Текст: ${block.querySelector('.question-text').value}
Правильный ответ: ${block.querySelector('.correct-answer').value}
Варианты ответов: ${block.querySelector('.other-answers').value.split('\n').filter(a => a.trim()).join(', ')}
Медиа: ${block.querySelector('.media-link').value || 'нет'}`;
        }).join('\n\n');

        // Формируем данные для отправки
        const templateParams = {
            testType: document.getElementById('testType').value,
            testTitle: document.getElementById('testTitle').value,
            authorType: document.querySelector('input[name="authorType"]:checked').value,
            questions: questions,
            comment: document.getElementById('comment').value || 'нет'
        };

        try {
            await emailjs.send(
                'service_6qeqvmw',    // Service ID
                'template_owk0bkr',
                templateParams
            );
            
            // Показываем уведомление после успешной отправки
            setTimeout(() => {
                alert('Спасибо за ваше предложение! Мы рассмотрим его в ближайшее время.');
                
                // Сбрасываем форму
                form.reset();
                
                // Оставляем только один вопрос
                while (questionsContainer.children.length > 1) {
                    questionsContainer.lastChild.remove();
                }
            }, 1000);
            
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
        } finally {
            // Возвращаем исходный текст кнопки после завершения отправки
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
});
