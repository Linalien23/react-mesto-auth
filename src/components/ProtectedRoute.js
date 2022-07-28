import React from "react";
import { Route, Redirect } from 'react-router-dom';

// HOC-компонент для защиты роута /, чтобы на него не смогли перейти неавторизованные пользователи
// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ component: Component, ...props }) => {
    return (
        <Route>
            {() =>
                props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />
            }
        </Route>
    )
}

export default ProtectedRoute;

// HOC-компонент ProtectedRoute возвращает компонент Route. 
// Если значение loggedIn — true, Route отрисует компонент, который передан HOC-компоненту как пропс, включая переданные пропсы. 
// Если значение false — вернёт компонент Redirect и переадресует пользователя на страницу авторизации.