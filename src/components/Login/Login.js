import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import "./Login.css";
import { PAGE_REGISTRATION, INPUT_ERROR } from '../../utils/constants';

function Login({handleLogin}) {

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
        console.log('Сабмит логина')
        const { email, password } = data;
        if (!data.email || !data.password) {
            console.log(data.email, password);
            return;
        }
        console.log(email, password)
        handleLogin({ email: email, password: password })
        console.log('Сабмит логина 5')
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
                        name="email"
                        maxLength="100"
                        minLength="5"
                        placeholder="Введите почту"
                        onChange={handleChange}
                        autoComplete="off"
                        
                         />
                         
                        <span className="form__input-error">{INPUT_ERROR}</span>
                        <p className="form__input-name">Пароль</p>
                        <input className="form__input"
                        placeholder="Введите пароль"
                        name="password"
                        type="password"
                        maxLength="40"
                        minLength="5"
                        onChange={handleChange} />
                        <span className="form__input-error">{INPUT_ERROR}</span>
                    </Form>
                <p className="login__link">Ещё не зарегистрированы? <Link to={PAGE_REGISTRATION}>Регистрация</Link></p>
        </section>
    )
}

export default Login;