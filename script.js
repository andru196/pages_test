document.addEventListener('DOMContentLoaded', function() {
    // Проверяем, что мы внутри Telegram
    if (window.Telegram && window.Telegram.WebApp) {
        const webApp = window.Telegram.WebApp;

        // Отображаем initData
        document.getElementById('init-data').textContent = webApp.initData || 'Init data не получена';

        // Парсим и отображаем данные пользователя
        const user = webApp.initDataUnsafe.user;
        if (user) {
            const userInfo = `
ID: ${user.id}
Имя: ${user.first_name}
Фамилия: ${user.last_name || 'Не указана'}
Username: @${user.username || 'Не указан'}
Язык: ${user.language_code || 'Не указан'}
            `.trim();
            document.getElementById('user-info').textContent = userInfo;
        } else {
            document.getElementById('user-info').textContent = 'Данные пользователя не получены';
        }

        // Расширяем приложение на весь экран
        webApp.expand();
    } else {
        document.getElementById('init-data').textContent = 'Это приложение работает внутри Telegram Mini Apps. Откройте его через бота.';
    }
});