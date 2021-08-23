import { Link } from 'react-router-dom';
import "./Logo.css";
import logo from "../../logo.svg";
import { PAGE_MAIN } from '../../utils/constants'


function Logo() {
    return (
        <Link to={PAGE_MAIN}>
            <img className="logo" src={logo} alt="Лого" />
        </Link>
    )
}

export default Logo;