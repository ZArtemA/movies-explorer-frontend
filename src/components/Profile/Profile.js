import React from 'react';
import './Profile.css';
import Form from '../Form/Form';
import { INPUT_ERROR } from '../../utils/constants';
import FormValidation from '../Validation/Validation';

function Profile(props) {

    const formValidation = FormValidation();

    const {email, name} = formValidation.data;


    function handleSubmit(e) {
        e.preventDefault();
        const { email, name } = formValidation.data;
        if (!email || !name) {
            return;
        }
        props.onSave({ email: email, name: name });
        formValidation.resetForm();
    }
    

    return (
        <section className="profile">
            <h1 className="profile__greetings">Привет {props.userData.name}</h1>
            <div className={`profile__info ${props.isOpen ? 'profile__info_hide' : ''}`}>
                <p className="profile__line">Имя<span className="profile__line_userinfo">{props.userData.name}</span></p>
                <p className="profile__line">Почта<span className="profile__line_userinfo">{props.userData.email}</span></p>
                <p className="profile__btn" onClick={props.onEditBtnClick}>Редактировать</p>
                <p className="profile__btn profile__btn_quit" onClick={props.onLogOut}>Выйти из аккаунта</p>
            </div>
            <div className={`profile__form ${props.isOpen ? 'profile__form_opened' : ''}`}>
                <Form
                    id={'profile'}
                    name={'user'}
                    onSubmit={handleSubmit}
                    button={'Сохранить'}
                    errorText={props.error}
                    >
                        <p className="form__input-name" type="text" maxLength="40" minLength="5">Имя</p>
                        <input className="form__input"
                        id="name-input"
                        name="name"
                        type="text"
                        maxLength="40"
                        minLength="2"
                        onChange={formValidation.handleChange}
                        placeholder={props.userData.name}
                        value={name || ''}
                        />
                        <span className="form__input-error">{INPUT_ERROR}</span>
                        <p className="form__input-name">Почта</p>
                        <input className="form__input"
                        id="email-input"
                        type="email"
                        name="email"
                        maxLength="100"
                        minLength="5"
                        onChange={formValidation.handleChange}
                        placeholder={props.userData.email}
                        value={email || ''}
                         />
                        <span className="form__input-error">{INPUT_ERROR}</span>
                        <p className="profile__btn-cancel" onClick={props.onClose}>Отмена</p>
                </Form>
            </div>
        </section>
    )
}

export default Profile;