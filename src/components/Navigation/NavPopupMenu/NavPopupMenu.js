import React from 'react';
import closeButton from '../../../images/close-btn.svg';

import './NavPopupMenu.css';
import Navigation from '../Navigation';

function NavPopupMenu(props) {
    return (
        <div className={`menu ${props.isOpen ? 'menu_opened' : ''}`}>
            <div className="menu__content">
                <button className="menu__btn-close" type="button" aria-label="Закрыть" onClick={props.onClose}>
                    <img className="menu__btn-close-image" src={closeButton} alt="Закрыть" />
                </button>
                <Navigation />
            </div>
        </div>
    )
};

export default NavPopupMenu;