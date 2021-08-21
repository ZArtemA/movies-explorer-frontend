import { Link, useLocation } from 'react-router-dom';
import "./Logo.css";
import logo from "../../logo.svg";
import mainLogo from "../../images/logo-main.svg";
import profileLogo from "../../images/logo-profile.svg";

function Logo() {
    let location = useLocation();
    return (
        <Link exact to="/">
            <img className="logo" 
            src={location.pathname === '/profile' && document.documentElement.scrollWidth < 940 ? profileLogo : location.pathname === '/' ? mainLogo : logo} 
            alt="Лого" />
        </Link>
    )
}

export default Logo;