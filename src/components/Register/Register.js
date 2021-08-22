import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Register.css';

function Register() {
    return (
        <section className="register">
            <Logo/>
            <h1 className="register__greetings">Добро пожаловать!</h1>
    <Form>  
    <p>Имя</p>
                <input/>
                <p>E-mail</p>
                <input/>
                <p>Пароль</p>
                <input/>
                <span></span>
    </Form>
 <p className="register__link">Уже зарегистрированы? <Link to="signin">Войти</Link></p>
 </section>
    )
}

export default Register;