import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import "./Login.css";

function Login() {
    return (
        <section className="login">
            <Logo/>
<h1 className="login__greetings">Рады видеть!</h1>
 <Form>
                <p>E-mail</p>
                <input/>
                <p>Пароль</p>
                <input/>
                <span></span>
 </Form>
 <p className="login__link">Ещё не зарегистрированы? <Link to="signup">Регистрация</Link></p>
 </section>
    )
}

export default Login;