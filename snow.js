// snow.js - Снегопад на ВСЕХ страницах
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. АВТОМАТИЧЕСКОЕ СОЗДАНИЕ КОНТЕЙНЕРА (чтобы не писать div в каждом html)
    let snowContainer = document.getElementById('snowflakes-container');
    
    if (!snowContainer) {
        snowContainer = document.createElement('div');
        snowContainer.id = 'snowflakes-container';
        // Принудительные стили, чтобы снег точно был поверх всего и не мешал кликам
        snowContainer.style.position = 'fixed';
        snowContainer.style.top = '0';
        snowContainer.style.left = '0';
        snowContainer.style.width = '100%';
        snowContainer.style.height = '100%';
        snowContainer.style.pointerEvents = 'none'; // Кликаем сквозь снег
        snowContainer.style.zIndex = '999999';      // Поверх всего
        snowContainer.style.overflow = 'hidden';
        document.body.appendChild(snowContainer);
    }

    const snowToggle = document.getElementById('snowToggle');
    const snowStatus = document.querySelector('.snow-status');
    
    let snowInterval;
    let isSnowing = false;
    let snowflakes = [];

    // 2. ПРОВЕРКА СОХРАНЕННОЙ НАСТРОЙКИ (работает для всех страниц)
    const savedSnowState = localStorage.getItem('edvardcode_snow');
    
    // Если в памяти "true" — запускаем снег везде
    if (savedSnowState === 'true') {
        startSnow();
        // Если на текущей странице есть кнопка, обновляем её вид
        if (snowToggle) snowToggle.classList.add('active');
        if (snowStatus) snowStatus.textContent = 'Вкл';
    }

    // 3. ОБРАБОТКА КНОПКИ (если она есть на странице)
    if (snowToggle) {
        snowToggle.addEventListener('click', function() {
            if (isSnowing) {
                stopSnow();
                snowToggle.classList.remove('active');
                if (snowStatus) snowStatus.textContent = 'Выкл';
                localStorage.setItem('edvardcode_snow', 'false'); // Запоминаем выключение
            } else {
                startSnow();
                snowToggle.classList.add('active');
                if (snowStatus) snowStatus.textContent = 'Вкл';
                localStorage.setItem('edvardcode_snow', 'true'); // Запоминаем включение
            }
        });
    }

    // --- ФУНКЦИИ СОЗДАНИЯ СНЕГА (без изменений логики) ---
    function createSnowflake() {
        if (!isSnowing) return;

        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Важно: абсолютное позиционирование для самих снежинок
        snowflake.style.position = 'absolute';
        
        const size = Math.random() * 7 + 3;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        const opacity = Math.random() * 0.7 + 0.3;
        snowflake.style.opacity = opacity.toString();
        snowflake.style.background = `rgba(255, 255, 255, ${opacity})`;
        snowflake.style.borderRadius = '50%';
        
        const duration = Math.random() * 5 + 5;
        const sway = Math.random() * 100 - 50;
        
        snowflake.style.animation = `fall ${duration}s linear infinite, sway ${duration * 2}s ease-in-out infinite`;
        
        // Добавляем стили анимации, если их нет
        if (!document.getElementById('snow-animations')) {
            const style = document.createElement('style');
            style.id = 'snow-animations';
            style.textContent = `
                @keyframes fall {
                    0% { top: -50px; transform: rotate(0deg); }
                    100% { top: 100vh; transform: rotate(360deg); }
                }
                @keyframes sway {
                    0%, 100% { transform: translateX(0) rotate(0deg); }
                    50% { transform: translateX(${sway}px) rotate(180deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        if(snowContainer) {
            snowContainer.appendChild(snowflake);
            snowflakes.push(snowflake);
        }
        
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
        snowInterval = setInterval(createSnowflake, 100);
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createSnowflake(), Math.random() * 1000);
        }
    }

    function stopSnow() {
        isSnowing = false;
        clearInterval(snowInterval);
        snowflakes.forEach(snowflake => {
            snowflake.style.transition = 'opacity 1s ease-out';
            snowflake.style.opacity = '0';
            setTimeout(() => { if (snowflake.parentNode) snowflake.remove(); }, 1000);
        });
        snowflakes = [];
    }

    window.addEventListener('beforeunload', function() {
        // Мы уже сохраняем состояние при клике, но это подстраховка
        if (isSnowing) localStorage.setItem('edvardcode_snow', 'true');
    });

    function checkPerformance() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile && isSnowing) {
            clearInterval(snowInterval);
            snowInterval = setInterval(createSnowflake, 300);
        }
    }

    window.addEventListener('resize', checkPerformance);
    checkPerformance();
});
