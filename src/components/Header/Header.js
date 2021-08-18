  
import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import logo from "../../logo.svg";
import menu_icon from "../../images/menu-btn.svg";
import account_icon from "../../images/account-img.svg";
import HeaderPopupMenu from './HeaderPopupMenu/HeaderPopupMenu'; 

import './Header.css';

function Header({onClose, isOpen, onMenuBtnClick }) {
    return (
        <header className="header">
            <Route path="/movies">
            <img className="header__logo" src={logo} alt="Лого" />
            <nav className="header__menu">
                    <NavLink to="/movies" activeClassName="header__link_active" className="header__link link">Фильмы</NavLink>
                    <NavLink to="/saved-movies" activeClassName="header__link_active" className="header__link link">Сохранённые фильмы</NavLink>
                    <NavLink to="/profile" activeClassName="header__link_active" className="header__link header__link_account link">
                    Аккаунт
                    <img src={account_icon} alt="иконка" className="header__link header__account-icon" />
                    </NavLink>
            </nav>
            </Route>
            <img className="header__menu-btn" src={menu_icon} type="button" alt="Открыть" onClick={onMenuBtnClick} />
            <HeaderPopupMenu onClose={onClose} isOpen={isOpen} />
        </header>
    );
}
export default Header;
