import { Link } from 'react-router-dom';
import './Portfolio.css';
import cursor from '../../images/cursor.svg';


function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <nav className="portfolio__list">
                <Link to="https://github.com/ZArtemA/first-project" className="portfolio__link">Статичный сайт<img src={cursor} alt="линк" name="ссылка"/></Link>
                <Link to="https://github.com/ZArtemA/second-project" className="portfolio__link">Адаптивный сайт<img src={cursor} alt="линк" name="ссылка"/></Link>
                <Link to="https://zartema.github.io/mesto/" className="portfolio__link">Одностраничное приложение<img src={cursor} alt="линк" name="ссылка"/></Link>
            </nav>
        </section>
    );
}
export default Portfolio;
