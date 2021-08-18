import React from 'react';
import closeButton from '../../../images/close-btn.svg';
import account_icon from "../../../images/account-img.svg";

import './HeaderPopupMenu.css';
import { NavLink } from 'react-router-dom';

function HeaderPopupMenu(props) {
    return (
        <div className={`menu ${props.isOpen ? 'menu_opened' : ''}`}>
            <div className="menu__content">
                <button className="menu__btn-close" type="button" aria-label="Закрыть" onClick={props.onClose}>
                    <img className="menu__btn-close-image" src={closeButton} alt="Закрыть" />
                </button>
                <nav className="menu__nav">
                    <NavLink to="/main" activeClassName="menu__link_active" className="menu__link link">Главная</NavLink>
                    <NavLink to="/movies" activeClassName="menu__link_active" className="menu__link link">Фильмы</NavLink>
                    <NavLink to="/saved-movies" activeClassName="menu__link_active" className="menu__link link">Сохранённые фильмы</NavLink>
                    <NavLink to="/profile" activeClassName="menu__link_active" className="menu__link menu__link_account link">
                    Аккаунт
                    <img src={account_icon} alt="иконка" className="menu__link menu__account-icon" />
                    </NavLink>
                </nav>
            </div>
        </div>
    )
};

export default HeaderPopupMenu;