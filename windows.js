// windows.js - функционал для страницы Windows ISO

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    initWindowsPage();
    
    // Настройка снега, если снег был включен
    if (localStorage.getItem('edvardcode_snow') === 'true') {
        const snowToggle = document.getElementById('snowToggle');
        if (snowToggle) {
            snowToggle.classList.add('active');
            const snowStatus = document.querySelector('.snow-status');
            if (snowStatus) snowStatus.textContent = 'Вкл';
        }
    }
});

function initWindowsPage() {
    // Добавляем текущую дату в футере
    const yearElement = document.querySelector('#trademark');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} EdvardCode`;
    }
    
    // Инициализация бургер-меню
    initBurgerMenu();
    
    // Анимация появления карточек
    animateCards();
    
    // Обработчики для кнопок информации
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (target) showDetails(target);
        });
    });
}

function initBurgerMenu() {
    // Эта функция уже есть в burger.js, но дублируем для безопасности
    const burger = document.getElementById('burger');
    if (!burger) return;
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        // Ваша логика меню из burger.js
    });
}

function animateCards() {
    const cards = document.querySelectorAll('.iso-card, .info-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Информация для модальных окон
const osDetails = {
    'win11-23h2': {
        title: 'Windows 11 23H2',
        content: `
            <h3>Windows 11 23H2 (2023 Update)</h3>
            <p><strong>Основные изменения:</strong></p>
            <ul>
                <li>Новый Центр уведомлений</li>
                <li>Обновленный File Explorer</li>
                <li>Улучшенная производительность</li>
                <li>Новые функции безопасности</li>
                <li>Обновления для подсистемы Android</li>
            </ul>
            <p><strong>Системные требования:</strong></p>
            <ul>
                <li>Процессор: 1 ГГц или выше, 2+ ядер</li>
                <li>ОЗУ: 4 ГБ минимум</li>
                <li>Память: 64 ГБ на SSD</li>
                <li>TPM 2.0 (обязательно)</li>
                <li>Secure Boot (обязательно)</li>
            </ul>
        `
    },
    'win11-22h2': {
        title: 'Windows 11 22H2',
        content: `
            <h3>Windows 11 22H2 (2022 Update)</h3>
            <p>Стабильная версия Windows 11 с обновлениями безопасности и исправлениями ошибок.</p>
            <p><strong>Рекомендуется для:</strong></p>
            <ul>
                <li>Пользователей, которым нужна стабильность</li>
                <li>Корпоративных сред</li>
                <li>Игровых ПК</li>
            </ul>
        `
    },
    'win10-ltsc': {
        title: 'Windows 10 LTSC 2021',
        content: `
            <h3>Windows 10 LTSC 2021 (Long-Term Servicing Channel)</h3>
            <p><strong>Особенности версии LTSC:</strong></p>
            <ul>
                <li>Без Microsoft Store</li>
                <li>Без Cortana</li>
                <li>Без встроенных рекламных приложений</li>
                <li>Только обновления безопасности (10 лет поддержки)</li>
                <li>Минимальные системные требования</li>
            </ul>
            <p><strong>Для кого подходит:</strong></p>
            <ul>
                <li>Медицинское оборудование</li>
                <li>Банкоматы и платежные системы</li>
                <li>Промышленные компьютеры</li>
                <li>Серверы и специализированные системы</li>
            </ul>
        `
    }
};

function showDetails(osId) {
    const detail = osDetails[osId];
    if (!detail) return;
    
    const modal = document.getElementById('infoModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h2>${detail.title}</h2>
        ${detail.content}
        <div class="modal-buttons">
            <button onclick="closeModal()" class="btn-home">Закрыть</button>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    // Закрытие по клику вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

function closeModal() {
    const modal = document.getElementById('infoModal');
    modal.style.display = 'none';
}

// Хеши для проверки скачанных файлов
function showHashInfo(osName, hash) {
    const modal = document.getElementById('infoModal');
    const content = document.getElementById('modalContent');
    
    content.innerHTML = `
        <h2>Хеш-суммы ${osName}</h2>
        <p><strong>SHA-256:</strong> ${hash}</p>
        <p>Для проверки целостности скачанного файла:</p>
        <ol>
            <li>Скачайте программу проверки хешей</li>
            <li>Выберите скачанный ISO файл</li>
            <li>Сравните хеш с указанным выше</li>
            <li>Если хеши совпадают - файл целый</li>
        </ol>
        <button onclick="closeModal()" class="btn-home">Закрыть</button>
    `;
    
    modal.style.display = 'flex';
}

// Добавление стилей для анимации
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.5s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal-buttons {
        margin-top: 20px;
        text-align: center;
    }
`;
document.head.appendChild(style);