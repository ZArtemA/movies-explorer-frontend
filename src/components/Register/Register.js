import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';

function Register() {
    return (
        <section className="register">
            <Logo/>
            <h1 className="register__greetings">заглушка регистрация</h1>
    <Form>  
    <p>Имя</p>
                <input/>
                <p>E-mail</p>
                <input/>
                <p>Пароль</p>
                <input/>
                <span></span>
    </Form>
 <p>Уже зарегистрированы? <Link to="signup">Войти</Link></p>
 </section>
    )
}

export default Register;