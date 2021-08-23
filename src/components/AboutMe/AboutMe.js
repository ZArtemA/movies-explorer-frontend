import myPhoto from "../../images/my-photo.jpg";
import { VK_LINK, GIT_LINK } from '../../utils/constants'
import './AboutMe.css';

function AboutMe() {
    return (
        <section className="student" id="student">
            <h2 className="student__title">Студент</h2>
            <div className="student__content">
            <div className="student__text">
            <h3 className="student__name">Артем</h3>
            <p className="student__info">Фронтенд-разработчик, 30 лет</p>
            <p className="student__about">Я родился и живу в Барнауле. 
            В 2013 году закончил Аграрный университет по специальности Земельный кадастр.
             Но быстро разочаровался в профессии. Начал работать на фрилансе.
             Сначала писал тексты. Потом начал брать заказы на верстку. И постепенно открыл для себя программирование. Решил получить полноценный стек знаний и навыков в Яндекс-Практикуме.
             Сейчас заканчиваю учебу и ищу работу с интересными задачами и опытными специалистами, у которых можно будет продолжить учиться уже на практике.</p>
            <div className="student__links">
            <a href={VK_LINK} target="_blank" rel="noreferrer" className="student__link">ВКонтакте</a>
            <a href={GIT_LINK} target="_blank" rel="noreferrer" className="student__link">Github</a>
            </div>
            </div>
            <img className="student__photo" src={myPhoto} name="Артем" alt="моя фотография" />
            </div>
        </section>
    );
}
export default AboutMe;
