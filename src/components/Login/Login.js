import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';

function Login() {
    return (
        <section className="login">
            <Logo/>
<h1 className="login__greetings">заглушка логин</h1>
 <Form>
                <p>E-mail</p>
                <input/>
                <p>Пароль</p>
                <input/>
                <span></span>
 </Form>
 <p>Ещё не зарегистрированы? <Link to="signup">Регистрация</Link></p>
 </section>
    )
}

export default Login;