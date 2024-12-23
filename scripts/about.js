const AboutManager = {
    contributors: [
        {
            name: "BcA9HuK",
            details: "1000₽",
            details2: "6 тестов",
            money: true, // для первого details
            tests: true   // для второго details
        },
        {
            name: "Verkkse",
            details2: "2 теста",
            tests: true
        },
        {
            name: "Третий Участник",
            details: "500₽"
        },
        {
            name: "Четвёртый Участник",
            details: "Тест 3"
        }
    ],

    init() {
        this.renderContributors();
    },

    renderContributors() {
        const container = document.querySelector('.contributors-section');
        const contributorsHTML = `
            <h2>Спасибо за поддержку!</h2>
            <div class="contributors-table">
                ${this.contributors.map(contributor => `
                    <div class="contributor-row">
                        <div class="contributor-name">${contributor.name}</div>
                        <div class="contributor-details-wrapper">
                            ${contributor.details ? `<span class="contributor-details ${contributor.money ? 'money' : ''}">${contributor.details}</span>` : ''}
                            ${contributor.details2 ? `<span class="contributor-details ${contributor.tests ? 'tests' : ''}">${contributor.details2}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = contributorsHTML;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AboutManager.init();
}); 