import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import "./Login.css";
import { PAGE_REGISTRATION } from '../../utils/constants';

function Login() {
    return (
        <section className="login">
            <Logo/>
<h1 className="login__greetings">Рады видеть!</h1>
 <Form>
                <p>E-mail</p>
                <input/>
                <span className="form__input-error"></span>
                <p>Пароль</p>
                <input/>
                <span className="form__input-error"></span>
 </Form>
 <p className="login__link">Ещё не зарегистрированы? <Link to={PAGE_REGISTRATION}>Регистрация</Link></p>
 </section>
    )
}

export default Login;