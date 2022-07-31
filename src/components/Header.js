import React from 'react';
import logo from '../images/header-logo.svg';
import { Route, Link } from 'react-router-dom';

function Header({email}) {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="лого" />
            <Route path="/sign-in">
                <Link to="sign-up" className="header__button">Регистрация</Link>
            </Route>
            <Route path="/sign-up">
                <Link to="sign-in" className="header__button">Войти</Link>
            </Route>
            <Route exact path="/">
                <p className= "header__text">{email}</p>
                <Link to="sign-in" className="header__button">Выйти</Link>
            </Route>
        </header>
    );
}

export default Header;