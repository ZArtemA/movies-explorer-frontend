import './NavTab.css';


function NavTab() {
    return (
            <nav className="nav-table">
                <a href="/#about" className="nav-table__link">О проекте</a>
                <a href="/#techs" className="nav-table__link">Технологии</a>
                <a href="/#student" className="nav-table__link">Студент</a>
            </nav>
    );
}
export default NavTab;
