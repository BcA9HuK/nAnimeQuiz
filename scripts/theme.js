const ThemeManager = {
    init() {
        // Применяем сохранённую тему при загрузке
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme(savedTheme);

        // Находим переключатель темы
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            // Устанавливаем начальное состояние переключателя
            themeToggle.checked = savedTheme === 'dark';
            
            // Добавляем обработчик изменения
            themeToggle.addEventListener('change', (e) => {
                const theme = e.target.checked ? 'dark' : 'light';
                this.applyTheme(theme);
            });
        }
    },

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Обновляем состояние переключателя, если он существует
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = theme === 'dark';
        }
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});

// Только переключение темы, начальная проверка уже в HTML
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
