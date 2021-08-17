  
import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from "../../logo.svg";
import menu_icon from "../../images/menu-btn.svg";
import account_icon from "../../images/account-img.svg";

import './Header.css';

function Header({userData, onSignOut}) {
    return (
        <header className="header">
            <Route path="/movies">
            <img className="header__logo" src={logo} alt="Лого" />
            <nav className="header__menu">
                    <Link to="/movies" className="header__link link">Фильмы</Link>
                    <Link to="/saved-movies" className="header__link link">Сохранённые фильмы</Link>
                    <Link to="/profile" className="header__link header__link_account link">
                    Аккаунт
                    <img src={account_icon} alt="иконка" className="header__link header__link_account-icon" />
                    </Link>
            </nav>
            <img className="header__menu-btn" src={menu_icon} alt="Открыть" />
            </Route>
        </header>
    );
}
export default Header;
