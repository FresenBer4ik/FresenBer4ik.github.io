// games.js - функционал для страницы игр
document.addEventListener('DOMContentLoaded', function() {
    initGamesPage();
});

function initGamesPage() {
    // Настройка снега
    if (localStorage.getItem('edvardcode_snow') === 'true') {
        const snowToggle = document.getElementById('snowToggle');
        if (snowToggle) {
            snowToggle.classList.add('active');
            const snowStatus = document.querySelector('.snow-status');
            if (snowStatus) snowStatus.textContent = 'Вкл';
        }
    }
    
    // Анимация появления карточек
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in');
    });
    
    // Обработка ошибок загрузки изображений
    const images = document.querySelectorAll('.game-image img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = '🎮';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 4em;
                background: linear-gradient(45deg, #ff073a, #ff6b9d);
            `;
            this.parentNode.appendChild(placeholder);
        });
    });
    
    // Добавляем год в футере
    const yearElement = document.querySelector('#trademark');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} EdvardCode`;
    }
}

// Стили для анимации
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.5s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);