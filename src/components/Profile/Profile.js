import './Profile.css';

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
            <form className={`profile__form ${props.isOpen ? 'profile__form_opened' : ''}`}>
            <fieldset className="profile__line">
                Имя
                <input className="profile__form-item" type="text" maxLength="40" minLength="2" placeholder="Артем"></input>
                </fieldset>
                <fieldset className="profile__line">
                Почта
                <input className="profile__form-item" type="email" maxLength="100" minLength="5" placeholder="pochta@yandex.ru"></input>
                </fieldset>
                <p className="profile__edit-error"></p>
                <button className="profile__save-btn" onClick={props.onSaveBtnClick}>Сохранить</button>
            </form>
        </section>
    )
}

export default Profile;