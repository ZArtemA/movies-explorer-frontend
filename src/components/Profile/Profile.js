import React from 'react';
import './Profile.css';
import Form from '../Form/Form';
import FormValidation from '../Validation/Validation';

function Profile(props) {

    const formValidation = FormValidation();

    const {email, name} = formValidation.data;

    function handleSubmit(e) {
        document.querySelectorAll('input').disabled=true;
        e.preventDefault();
        if (!email || !name) {
            return;
        }
        props.onSave({ email: email, name: name });
        formValidation.resetForm();
        document.querySelectorAll('input').disabled=false;
        //console.log({email, name})
        //console.log(document.querySelectorAll('input').disabled)
    }

    function handleCancel() {
        props.onClose();
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
                    successText={props.success}
                    isValid={formValidation.isValid}
                    >
                        <p className="form__input-name">Имя</p>
                        <input className={`form__input ${formValidation.inputValid.name===undefined ? '' : (!formValidation.inputValid.name ? "form__input_invalid" : '')}`}
                        id="name-input"
                        name="name"
                        type="text"
                        maxLength="30"
                        minLength="2"
                        onChange={formValidation.handleChange}
                        placeholder={props.userData.name}
                        value={name || ''}
                        pattern="[A-Za-zА-Яа-яЁё0-9\s-]{2,30}"
                        required
                        />
                        <span name="name" className="form__input-error">{formValidation.errors.name}</span>
                        <p className="form__input-name">Почта</p>
                        <input className={`form__input ${formValidation.inputValid.email===undefined ? '' : (!formValidation.inputValid.email ? "form__input_invalid" : '')}`}
                        id="email-input"
                        type="email"
                        name="email"
                        maxLength="60"
                        minLength="5"
                        onChange={formValidation.handleChange}
                        placeholder={props.userData.email}
                        value={email || ''}
                        pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
                        required
                         />
                        <span name="email" className="form__input-error">{formValidation.errors.email}</span>
                        <p className="profile__btn-cancel" onClick={handleCancel}>Отмена</p>
                </Form>
            </div>
        </section>
    )
}

export default Profile;