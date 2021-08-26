import './Footer.css';
import { VK_LINK, GIT_LINK, PRACTICUM_LINK } from '../../utils/constants'

function Footer() {
	return (
		<footer className="footer">
            <div className="footer__content">
			<p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__menu">
            <p className="footer__copyright">&copy; 2021</p>
            <nav className="footer__social">
                <a href={PRACTICUM_LINK} target="_blank" rel="noreferrer" className="footer__link link">Яндекс.Практикум</a>
                <a href={GIT_LINK} target="_blank" rel="noreferrer" className="footer__link link">Github</a>
                <a href={VK_LINK} target="_blank" rel="noreferrer" className="footer__link link">ВКонтакте</a>
            </nav>
            </div>
            </div>
        </footer>
	);
}

export default Footer;