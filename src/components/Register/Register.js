import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Register.css';

import { PAGE_LOGIN, INPUT_ERROR } from '../../utils/constants';

function Register({handleRegister}) {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        name: '',
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
        const { email, password, name } = data;
        if (!email || !password || !name) {
            return;
        }
        handleRegister({ email: email, password: password, name: name })
    }
    
    return (
        <section className="register">
            <Logo/>
            <h1 className="register__greetings">Добро пожаловать!</h1>
    <Form
     id={'registration'}
     name={'signup'}
     onSubmit={handleSubmit}
     button={'Зарегистрироваться'}
    >  
                <p className="form__input-name">Имя</p>
                <input className="form__input"
                id="name-input"
                type="text"
                name="name"
                maxLength="40"
                minLength="2"
                placeholder="Введите имя"
                onChange={handleChange}
                autoComplete="off"
                />
                <span className="form__input-error">{INPUT_ERROR}</span>
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
                id="password-input"
                type="password"
                name="password"
                maxLength="40" 
                minLength="5"
                placeholder="Введите пароль"
                onChange={handleChange}
                autoComplete="off"
                 />
                <span className="form__input-error">{INPUT_ERROR}</span>
    </Form>
 <p className="register__link">Уже зарегистрированы? <Link to={PAGE_LOGIN}>Войти</Link></p>
 </section>
    )
}

export default Register;