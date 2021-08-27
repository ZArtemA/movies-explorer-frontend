import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import "./Login.css";
import { PAGE_REGISTRATION, INPUT_ERROR } from '../../utils/constants';

function Login({handleSignin}) {

    const [data, setData] = React.useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = data;
        if (!email || !password) {
            return;
        }
        handleSignin({ email: email, password: password })
    }


    return (
        <section className="login">
            <Logo/>
                <h1 className="login__greetings">Рады видеть!</h1>
                    <Form
                    id={'login'}
                    name={'signin'}
                    onSubmit={handleSubmit}
                    button={'Войти'}
                    >
                        <p className="form__input-name">E-mail</p>
                        <input className="form__input"
                        id="email-input"
                        type="email"
                        value={data.email || ""}
                        maxLength="100"
                        minLength="5"
                        placeholder="Введите почту"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                         />
                        <span className="form__input-error">{INPUT_ERROR}</span>
                        <p className="form__input-name" type="password" maxLength="40" minLength="5">Пароль</p>
                        <input className="form__input"
                        value={data.password || ""}
                        placeholder="Введите пароль"
                        onChange={handleChange} />
                        <span className="form__input-error">{INPUT_ERROR}</span>
                    </Form>
                <p className="login__link">Ещё не зарегистрированы? <Link to={PAGE_REGISTRATION}>Регистрация</Link></p>
        </section>
    )
}

export default Login;