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
        setData({[e.target.name]: e.target.value});
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
                type="text"
                maxLength="40"
                minLength="2"
                placeholder="Введите имя"
                value={data.name}
                onChange={handleChange}
                />
                <span className="form__input-error">{INPUT_ERROR}</span>
                <p className="form__input-name">E-mail</p>
                <input className="form__input"
                type="email"
                maxLength="100"
                minLength="5"
                placeholder="Введите почту"
                value={data.email}
                onChange={handleChange}
                />
                <span className="form__input-error">{INPUT_ERROR}</span>
                <p className="form__input-name">Пароль</p>
                <input className="form__input"
                type="password"
                maxLength="40" 
                minLength="5"
                placeholder="Введите пароль"
                value={data.password}
                onChange={handleChange}
                 />
                <span className="form__input-error">{INPUT_ERROR}</span>
    </Form>
 <p className="register__link">Уже зарегистрированы? <Link to={PAGE_LOGIN}>Войти</Link></p>
 </section>
    )
}

export default Register;