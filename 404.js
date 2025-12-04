// 404.js - интерактивная страница ошибки

document.addEventListener('DOMContentLoaded', function() {
    // Счетчик посещений ошибки 404
    let visitCount = localStorage.getItem('404_visit_count') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('404_visit_count', visitCount);
    document.getElementById('visitCount').textContent = visitCount;
    
    // Таймер пребывания на странице
    let secondsOnPage = 0;
    const errorTimer = setInterval(() => {
        secondsOnPage++;
        document.getElementById('errorTime').textContent = secondsOnPage;
    }, 1000);
    
    // Интересные факты о ошибках
    const funFacts = [
        "Ошибка 404 получила название от кода состояния HTTP '404 Not Found'",
        "Первая страница 404 появилась в 1993 году на сайте CERN",
        "Некоторые сайты создают очень креативные страницы 404",
        "В среднем 0,1% всех посещений сайтов заканчиваются на 404",
        "Google имеет специальный инструмент для поиска 404 ошибок на сайтах",
        "Страницы 404 могут быть полезны для SEO, если правильно настроены",
        "Некоторые компании используют 404 страницы для развлечения пользователей",
        "Существует сайт, который коллекционирует креативные страницы 404",
        "Ошибка 404 может возникнуть из-за неправильной ссылки или удаленной страницы",
        "Страница 404 должна помогать пользователю найти нужную информацию"
    ];
    
    // Показать случайный факт
    window.showFunFact = function() {
        const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
        const funFactElement = document.getElementById('funFact');
        
        funFactElement.textContent = randomFact;
        funFactElement.style.display = 'block';
        
        // Автоматическое скрытие через 10 секунд
        setTimeout(() => {
            funFactElement.style.display = 'none';
        }, 10000);
    };
    
    // Поиск по сайту (упрощенная версия)
    window.searchSite = function() {
        const searchInput = document.getElementById('errorSearch');
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            alert('Введите что-нибудь для поиска');
            return;
        }
        
        // Список доступных страниц
        const pages = [
            { name: 'Главная', url: 'index', keywords: ['главная', 'home', 'начало'] },
            { name: 'Сборки', url: 'builds', keywords: ['сборки', 'windows', 'сборка', 'build'] },
            { name: 'Windows ISO', url: 'windows', keywords: ['windows', 'iso', 'операционная система'] },
            { name: 'Игры', url: 'games', keywords: ['игры', 'games', 'играть'] },
            { name: 'Telegram канал', url: 'https://t.me/edvardcodetg', keywords: ['telegram', 'канал', 'tg'] },
            { name: 'GitHub', url: 'https://github.com/edvardcode', keywords: ['github', 'код', 'репозиторий'] }
        ];
        
        // Поиск совпадений
        const matches = pages.filter(page => 
            page.keywords.some(keyword => keyword.includes(query)) ||
            page.name.toLowerCase().includes(query)
        );
        
        if (matches.length > 0) {
            let message = 'Возможно, вы ищете:\n';
            matches.forEach(page => {
                message += `• ${page.name}\n`;
            });
            message += '\nХотите перейти на первую найденную страницу?';
            
            if (confirm(message)) {
                window.location.href = matches[0].url;
            }
        } else {
            alert('К сожалению, ничего не найдено. Попробуйте другой запрос.');
        }
    };
    
    // Анимация цифр 404
    const digits = document.querySelectorAll('.error-digit');
    digits.forEach((digit, index) => {
        digit.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Эффект при наведении на статистику
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            const number = this.querySelector('.stat-number');
            const currentValue = parseInt(number.textContent);
            let tempValue = 0;
            
            const interval = setInterval(() => {
                tempValue += Math.ceil(currentValue / 20);
                if (tempValue >= currentValue) {
                    tempValue = currentValue;
                    clearInterval(interval);
                }
                number.textContent = tempValue;
            }, 30);
        });
    });
    
    // Эффект печатания в поле поиска
    const searchPlaceholders = [
        "Что вы ищете?",
        "Название сборки...",
        "Игра...",
        "Windows ISO...",
        "Введите запрос..."
    ];
    
    let currentPlaceholder = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriterEffect() {
        const searchInput = document.getElementById('errorSearch');
        const currentText = searchPlaceholders[currentPlaceholder];
        
        if (isDeleting) {
            searchInput.placeholder = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            searchInput.placeholder = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriterEffect, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentPlaceholder = (currentPlaceholder + 1) % searchPlaceholders.length;
            setTimeout(typeWriterEffect, 500);
        } else {
            setTimeout(typeWriterEffect, isDeleting ? 50 : 100);
        }
    }
    
    // Запускаем эффект печати
    setTimeout(typeWriterEffect, 1000);
    
    // Добавляем возможность поиска по нажатию Enter
    document.getElementById('errorSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchSite();
        }
    });
    
    // Эффект при загрузке страницы
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // Очистка таймера при уходе со страницы
    window.addEventListener('beforeunload', function() {
        clearInterval(errorTimer);
    });
});