  
import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import logo from "../../logo.svg";
import menu_icon from "../../images/menu-btn.svg";
import HeaderPopupMenu from './HeaderPopupMenu/HeaderPopupMenu'; 
import Navigation from '../Navigation/Navigation';

import './Header.css';

function Header({onClose, isOpen, onMenuBtnClick }) {
    return (
        <header className="header">
            <Route path="/movies">
            <NavLink exact to="/"><img className="header__logo" src={logo} alt="Лого" /></NavLink>
            <div className="header__navigation">
            <Navigation />
            </div>
            </Route>
            <img className="header__menu-btn" src={menu_icon} type="button" alt="Открыть" onClick={onMenuBtnClick} />
            <HeaderPopupMenu onClose={onClose} isOpen={isOpen} />
        </header>
    );
}
export default Header;
