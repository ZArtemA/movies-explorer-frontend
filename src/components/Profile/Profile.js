import React from 'react';
import './Profile.css';

function Profile() {
    return (
        <section className="profile">
            <h1 className="profile__greetings">Привет Виталий</h1>
            <form className="profile__form">
            <fieldset className="profile__form-fieldset">
                <p>Имя</p>
                <input className="profile__form-item">
                </input>
                </fieldset>
                <fieldset className="profile__form-fieldset">
                <p>E-mail</p>
                <input className="profile__form-item">
                </input>
                </fieldset>
                <button className="profile__edit-btm">Редактировать</button>
            </form>
            <button className="profile__quit-btn">Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;