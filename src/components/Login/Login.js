import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import "./Login.css";
import { PAGE_REGISTRATION, INPUT_ERROR } from '../../utils/constants';

function Login({handleSignin}) {
    return (
        <section className="login">
            <Logo/>
                <h1 className="login__greetings">Рады видеть!</h1>
                    <Form
                    id={'login'}
                    name={'signin'}
                    onSubmit={handleSignin}
                    button={'Войти'}
                    >
                        <p className="form__input-name">E-mail</p>
                        <input className="form__input" type="email" maxLength="100" minLength="5" placeholder="Введите почту" />
                        <span className="form__input-error">{INPUT_ERROR}</span>
                        <p className="form__input-name" type="password" maxLength="40" minLength="5">Пароль</p>
                        <input className="form__input" placeholder="Введите пароль"/>
                        <span className="form__input-error">{INPUT_ERROR}</span>
                    </Form>
                <p className="login__link">Ещё не зарегистрированы? <Link to={PAGE_REGISTRATION}>Регистрация</Link></p>
        </section>
    )
}

export default Login;