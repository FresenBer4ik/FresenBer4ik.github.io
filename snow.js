// snow.js - Снегопад на сайте
document.addEventListener('DOMContentLoaded', function() {
    const snowToggle = document.getElementById('snowToggle');
    const snowStatus = document.querySelector('.snow-status');
    const snowContainer = document.getElementById('snowflakes-container');
    let snowInterval;
    let isSnowing = false;
    let snowflakes = [];

    // Проверяем настройку в localStorage
    const savedSnowState = localStorage.getItem('edvardcode_snow');
    if (savedSnowState === 'true') {
        startSnow();
        snowToggle.classList.add('active');
        snowStatus.textContent = 'Вкл';
    }

    // Обработчик кнопки
    snowToggle.addEventListener('click', function() {
        if (isSnowing) {
            stopSnow();
            snowToggle.classList.remove('active');
            snowStatus.textContent = 'Выкл';
            localStorage.setItem('edvardcode_snow', 'false');
        } else {
            startSnow();
            snowToggle.classList.add('active');
            snowStatus.textContent = 'Вкл';
            localStorage.setItem('edvardcode_snow', 'true');
        }
    });

    function createSnowflake() {
        if (!isSnowing) return;

        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Случайный размер от 3 до 10px
        const size = Math.random() * 7 + 3;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Позиция
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        // Цвет снежинки
        const opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.opacity = opacity.toString();
        snowflake.style.background = `rgba(255, 255, 255, ${opacity})`;
        
        // Анимация
        const duration = Math.random() * 5 + 5; // 5-10 секунд
        const sway = Math.random() * 100 - 50; // -50px до +50px
        
        snowflake.style.animation = `
            fall ${duration}s linear infinite,
            sway ${duration * 2}s ease-in-out infinite
        `;
        
        // CSS для анимации
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                0% {
                    top: -50px;
                    transform: rotate(0deg);
                }
                100% {
                    top: 100vh;
                    transform: rotate(360deg);
                }
            }
            @keyframes sway {
                0%, 100% {
                    transform: translateX(0) rotate(0deg);
                }
                50% {
                    transform: translateX(${sway}px) rotate(180deg);
                }
            }
        `;
        
        if (!document.getElementById('snow-animations')) {
            style.id = 'snow-animations';
            document.head.appendChild(style);
        }
        
        snowContainer.appendChild(snowflake);
        snowflakes.push(snowflake);
        
        // Удаляем снежинку после падения
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.remove();
                const index = snowflakes.indexOf(snowflake);
                if (index > -1) snowflakes.splice(index, 1);
            }
        }, duration * 1000);
    }

    function startSnow() {
        if (isSnowing) return;
        isSnowing = true;
        
        // Создаем снежинки каждые 100мс
        snowInterval = setInterval(createSnowflake, 100);
        
        // Сразу создаем несколько снежинок
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createSnowflake(), Math.random() * 1000);
        }
    }

    function stopSnow() {
        isSnowing = false;
        clearInterval(snowInterval);
        
        // Плавно удаляем все снежинки
        snowflakes.forEach(snowflake => {
            snowflake.style.transition = 'opacity 1s ease-out';
            snowflake.style.opacity = '0';
            setTimeout(() => {
                if (snowflake.parentNode) {
                    snowflake.remove();
                }
            }, 1000);
        });
        
        snowflakes = [];
        
        // Удаляем стили анимации
        const animations = document.getElementById('snow-animations');
        if (animations) {
            animations.remove();
        }
    }

    // Автоматически останавливаем снег при уходе со страницы
    window.addEventListener('beforeunload', function() {
        if (isSnowing) {
            localStorage.setItem('edvardcode_snow', 'true');
        }
    });

    // Оптимизация для мобильных устройств
    function checkPerformance() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile && isSnowing) {
            // Реже создаем снежинки на мобильных
            clearInterval(snowInterval);
            snowInterval = setInterval(createSnowflake, 300);
        }
    }

    window.addEventListener('resize', checkPerformance);
    checkPerformance();
});