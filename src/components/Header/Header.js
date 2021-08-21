  
import React from 'react';
import menu_icon from "../../images/menu-btn.svg";
import HeaderPopupMenu from './HeaderPopupMenu/HeaderPopupMenu'; 
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

import './Header.css';

function Header({onClose, isOpen, onMenuBtnClick }) {
    return (
        <header className="header">
            <Logo/>
            <div className="header__navigation">
            <Navigation />
            </div>
            <img className="header__menu-btn" src={menu_icon} type="button" alt="Открыть" onClick={onMenuBtnClick} />
            <HeaderPopupMenu onClose={onClose} isOpen={isOpen} />
        </header>
    );
}
export default Header;
