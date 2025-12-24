document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger');
    const header = document.querySelector('header');
    
    // Создаем контейнер меню
    let menuContainer = document.createElement('div');
    menuContainer.className = 'menu-container';
    menuContainer.innerHTML = `
      <div class="menu-items">
        <a href="index" class="menu-item">
            <img src="icons/home.png" alt="Главная">
            Главная
        </a>
        <a href="builds" class="menu-item" id="buildsburger">
            <img src="icons/package.png" alt="Сборки">
            Сборка от EdvardCode
        </a>
        <a href="windows" class="menu-item">
            <img src="icons/windows.png" alt="Windows">
            Официальные ISO Windows
        </a>
        <a href="edvardtools" class="menu-item" id="edvardtoolsburger">
            <img src="icons/tools.png" alt="Инструменты">
            Скачать EdUnlocker
        </a>
        <a href="edvardbench" class="menu-item">
            <img src="icons/benchmark.png" alt="Игры">
            Игры
        </a>
        <a href="support" class="menu-item" id="supportburger">
            <img src="icons/support.png" alt="Поддержка">
            Поддержать
        </a>
      </div>
    `;
    
    document.body.appendChild(menuContainer);
    
    // Позиционирование меню
    function positionMenu() {
        const burgerRect = burgerMenu.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        
        menuContainer.style.top = `${headerRect.bottom + 10}px`;
        menuContainer.style.right = `${window.innerWidth - burgerRect.right}px`;
    }
    
    // Открытие меню
    function openMenu() {
        positionMenu();
        menuContainer.classList.add('show');
        burgerMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Закрытие меню
    function closeMenu() {
        menuContainer.classList.remove('show');
        burgerMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Обработчик бургер-меню
    burgerMenu.addEventListener('click', function(event) {
        event.stopPropagation();
        
        if (burgerMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Закрытие по клику вне меню
    document.addEventListener('click', function(event) {
        if (!menuContainer.contains(event.target) && event.target !== burgerMenu) {
            closeMenu();
        }
    });
    
    // Закрытие по клику на ссылку в меню
    document.querySelectorAll('.menu-item').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Обновление позиции при скролле и ресайзе
    window.addEventListener('scroll', () => {
        if (burgerMenu.classList.contains('active')) {
            positionMenu();
        }
    });
    
    window.addEventListener('resize', () => {
        closeMenu();
    });
    
    // Плавное появление меню при загрузке
    setTimeout(() => {
        menuContainer.style.transition = 'all 0.3s ease';
    }, 100);
    
    // Добавляем активный класс текущей странице
    const currentPath = window.location.pathname.split('/').pop() || 'index';
    document.querySelectorAll('.menu-item, nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index')) {
            link.classList.add('active-link');
        }
    });
    
    // Изменение шапки при скролле
    window.addEventListener('scroll', () => {
        const mainTop = document.querySelector('main')?.getBoundingClientRect().top || 0;
        if (mainTop <= header.offsetHeight) {
            header.classList.add('header-narrow');
        } else {
            header.classList.remove('header-narrow');
        }
    });

});
