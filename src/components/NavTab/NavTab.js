import { Link } from 'react-router-dom';
import './NavTab.css';


function NavTab() {
    return (
            <nav className="nav-table">
                <Link className="nav-table__link">О проекте</Link>
                <Link className="nav-table__link">Технологии</Link>
                <Link className="nav-table__link">Студент</Link>
            </nav>
    );
}
export default NavTab;
