  
import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from "../../logo.svg";
import account_icon from "../../images/account-img.svg";

import './Header.css';

function Header({userData, onSignOut}) {
    return (
        <header className="header">
            <Route path="/movies">
            <img className="header__logo" src={logo} alt="Лого" />
            <nav className="header__menu">
                    <Link to="/movies" className="header__link link">Фильмы</Link>
                    <Link to="/saved-movies" className="header__link link">Сохраненные фильмы</Link>
                    <Link to="/profile" className="header__link header__link_account link">
                    Аккаунт
                    <img src={account_icon} alt="иконка" className="header__link menu__account-icon" />
                    </Link>
            </nav>
            </Route>
        </header>
    );
}
export default Header;
