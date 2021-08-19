  
import React from 'react';
import { NavLink } from 'react-router-dom';
import account_icon from "../../images/account-img.svg";

import './Navigation.css';

function Navigation() {
    return (
            <nav className="nav__menu">
            <NavLink exact to="/" activeClassName="nav__link_active" className="nav__link nav__link_main">Главная</NavLink>
            <NavLink to="/movies" activeClassName="nav__link_active" className="nav__link">Фильмы</NavLink>
            <NavLink to="/saved-movies" activeClassName="nav__link_active" className="nav__link">Сохранённые фильмы</NavLink>
            <NavLink to="/profile" activeClassName="nav__link_active" className="nav__link nav__link_account">
            Аккаунт
            <img src={account_icon} alt="иконка" className="nav__link nav__account-icon" />
            </NavLink>
            </nav>
    );
}
export default Navigation;
