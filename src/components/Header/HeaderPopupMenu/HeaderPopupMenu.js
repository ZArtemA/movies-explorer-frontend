import React from 'react';
import closeButton from '../../../images/close-btn.svg';

import './HeaderPopupMenu.css';
import Navigation from '../../Navigation/Navigation';

function HeaderPopupMenu(props) {
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

export default HeaderPopupMenu;