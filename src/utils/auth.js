export const BASE_URL = 'https://auth.nomoreparties.co';

//  С помощью fetch функция register создаёт POST-запрос.
// После этого в первом обработчике then мы получим объект res, который содержит информацию об ответе и статус ответа. 
// При успешном ответе вернётся статус 200.
// Второй обработчик then вернёт ещё один res с данными пользователя (которые он ввёл в форму регистрации), адресом запроса и уникальным подписанным JWT-токеном.
export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            }
        })
        .then((res) => {
            return res;
        })
}

// Делаем API запрос с помощью fetch. 
// В теле запроса отправляем учётные данные пользователя: email — логин и password — пароль пользователя. 
// Этот запрос возвращает промис с response. Затем внутри первого обработчика then вызываем response.json. 
// Этот then также возвращает промис.
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        // Сохраним токен в localStorage пользователя, чтобы он был там всякий раз, когда пользователь вернётся в приложение. 
        // Вернём объект с данными пользователя.
        .then((data) => {
            localStorage.setItem('token', data.token);
            return data;
        })
}


// Функция getContent() принимает в качестве параметра один аргумент — JWT. 
// Он будет отправлен на сервер (API) по маршруту /users/me, и, если токен действителен, вернёт ответ с информацией о пользователе.
export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
}