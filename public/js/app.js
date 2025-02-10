document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    const content = document.getElementById('content');
    const backToTopBtn = document.getElementById('back-to-top-btn');
    const logoutBtn = document.getElementById('logout-btn');
     const avatarInput = document.getElementById('avatar-upload');
    const avatarImage = document.querySelector('.avatar');

    // Переключение меню (мобильная версия)
    menuIcon.addEventListener('click', () => {
        menu.classList.toggle('show');
    });

    // Переключение "страниц"
    menu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const pageId = event.target.dataset.page;
            showPage(pageId);

            // Скрываем меню после выбора пункта (для мобильных)
            if (window.innerWidth < 768) {
                menu.classList.remove('show');
            }
        }
    });

     // Функция показа аватара
    avatarInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarImage.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });


    // Функция отображения "страницы"
    function showPage(pageId) {
        // Скрываем все "страницы"
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.style.display = 'none');

        // Показываем выбранную "страницу"
        const selectedPage = document.getElementById(`${pageId}-page`);
        if (selectedPage) {
            selectedPage.style.display = 'block';
        }
    }

     // Кнопка "Выход" (пока просто заглушка)
    logoutBtn.addEventListener('click', (event) => {
      event.preventDefault();
      alert('Выход из системы (пока не реализовано)');
    });


    // Кнопка "Наверх"
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 700) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

     // Инициализация (показываем главную страницу при загрузке)
     showPage('profile');
});