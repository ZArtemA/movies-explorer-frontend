import { Link, useLocation } from 'react-router-dom';
import "./Logo.css";
import logo from "../../logo.svg";
import mainLogo from "../../images/logo-main.svg";
import profileLogo from "../../images/logo-profile.svg";
import mainDesctopLogo from "../../images/logo-main-desctop.svg";
import { PAGE_MAIN } from '../../utils/constants'


function Logo() {
    let location = useLocation();
    return (
        <Link to={PAGE_MAIN}>
            <img className="logo" 
            src={location.pathname === '/profile' && document.documentElement.scrollWidth < 940 ? profileLogo :
             location.pathname === '/' && document.documentElement.scrollWidth > 1110 ? mainDesctopLogo :
              location.pathname === '/' ? mainLogo : logo} 
            alt="Лого" />
        </Link>
    )
}

export default Logo;