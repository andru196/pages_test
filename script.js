document.addEventListener('DOMContentLoaded', function() {
    const webApp = window.Telegram?.WebApp;
    const initDataElement = document.getElementById('init-data');
    const userInfoElement = document.getElementById('user-info');
    const authButton = document.getElementById('auth-button');
    const responseContainer = document.getElementById('response-container');
    const serverResponseElement = document.getElementById('server-response');

    if (webApp) {
        // Отображаем initData и данные пользователя
        initDataElement.textContent = webApp.initData || 'Init data не получена';
        const user = webApp.initDataUnsafe.user;
        if (user) {
            const userInfo = `
ID: ${user.id}
Имя: ${user.first_name}
Фамилия: ${user.last_name || 'Не указана'}
Username: @${user.username || 'Не указан'}
Язык: ${user.language_code || 'Не указан'}
            `.trim();
            userInfoElement.textContent = userInfo;
        } else {
            userInfoElement.textContent = 'Данные пользователя не получены';
        }
        webApp.expand();
    } else {
        initDataElement.textContent = 'Это приложение работает внутри Telegram Mini Apps. Откройте его через бота.';
    }

    // Обработчик для кнопки авторизации
    authButton.addEventListener('click', async function() {
        const initData = webApp?.initData;
        if (!initData) {
            alert('Init data не доступна. Запустите приложение через Telegram.');
            return;
        }

        // Блокируем кнопку на время запроса
        authButton.disabled = true;
        authButton.textContent = 'Отправка запроса...';
        responseContainer.style.display = 'none';

        try {
            // Отправляем POST-запрос на сервер
            serverResponseElement.textContent = JSON.stringify(webApp);
            const response = await fetch('https://wearo.online/api/v2/Auth/Tg', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `tma ${initData}`
                },
                body: JSON.stringify({ initData: initData})
            });
            console.log(webApp);
            console.error(webApp);

            const responseData = await response.json();            
            // Отображаем ответ сервера
            serverResponseElement.textContent = JSON.stringify(responseData, null, 2);
            responseContainer.style.display = 'block';
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Произошла ошибка при отправке запроса. Проверьте консоль для подробностей.');
        } finally {
            // Разблокируем кнопку
            authButton.disabled = false;
            authButton.textContent = 'Тест авторизации (POST)';
        }
    });
});