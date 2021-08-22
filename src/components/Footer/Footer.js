import './Footer.css';

function Footer() {
	return (
		<footer className="footer">
            <div className="footer__content">
			<p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__menu">
            <p className="footer__copyright">&copy; 2021</p>
            <nav className="footer__social">
                <a href="/#" className="footer__link link">Яндекс.Практикум</a>
                <a href="/#" className="footer__link link">Github</a>
                <a href="/#" className="footer__link link">ВКонтакте</a>
            </nav>
            </div>
            </div>
        </footer>
	);
}

export default Footer;