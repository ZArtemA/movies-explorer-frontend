import './Profile.css';
import Form from '../Form/Form';
import { INPUT_ERROR } from '../../utils/constants';

function Profile(props) {

    return (
        <section className="profile">
            <h1 className="profile__greetings">Привет Артем</h1>
            <div className={`profile__info ${props.isOpen ? 'profile__info_hide' : ''}`}>
                <p className="profile__line">Имя<span className="profile__line_userinfo">Артем</span></p>
                <p className="profile__line">Почта<span className="profile__line_userinfo">pochta@yandex.ru</span></p>
                <p className="profile__btn" onClick={props.onEditBtnClick}>Редактировать</p>
                <p className="profile__btn profile__btn_quit">Выйти из аккаунта</p>
            </div>
            <div className={`profile__form ${props.isOpen ? 'profile__form_opened' : ''}`}>
                <Form
                    id={'profile'}
                    name={'user'}
                    onSubmit={props.onSave}
                    button={'Сохранить'}
                    >
                        <p className="form__input-name" type="text" maxLength="40" minLength="5">Имя</p>
                        <input className="form__input" type="text" maxLength="40" minLength="2" placeholder="Артем" />
                        <span className="form__input-error">{INPUT_ERROR}</span>
                        <p className="form__input-name">Почта</p>
                        <input className="form__input" type="email" maxLength="100" minLength="5" placeholder="pochta@yandex.ru" />
                        <span className="form__input-error">{INPUT_ERROR}</span>
                        <p className="profile__btn-cancel" onClick={props.onClose}>Отмена</p>
                </Form>
            </div>
        </section>
    )
}

export default Profile;