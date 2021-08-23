import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Logo from '../Logo/Logo';

import './Header.css';

function Header({onClose, isOpen, onMenuBtnClick }) {
    return (
        <header className="header">
            <Logo/>
            <Navigation
            isOpen={isOpen}
            onClose={onClose}
            onMenuBtnClick={onMenuBtnClick}
            />
        </header>
    );
}
export default Header;
