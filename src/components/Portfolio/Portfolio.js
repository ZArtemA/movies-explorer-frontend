import './Portfolio.css';
import cursor from '../../images/cursor.svg';


function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <nav className="portfolio__list">
                <a href="https://zartema.github.io/how-to-learn//index.html" target="_blank" rel="noreferrer" className="portfolio__link">Статичный сайт<img src={cursor} alt="линк" name="ссылка"/></a>
                <a href="https://zartema.github.io/russian-travel/index.html" target="_blank" rel="noreferrer" className="portfolio__link">Адаптивный сайт<img src={cursor} alt="линк" name="ссылка"/></a>
                <a href ="https://zartema.github.io/mesto/" target="_blank" rel="noreferrer" className="portfolio__link">Одностраничное приложение<img src={cursor} alt="линк" name="ссылка"/></a>
            </nav>
        </section>
    );
}
export default Portfolio;
