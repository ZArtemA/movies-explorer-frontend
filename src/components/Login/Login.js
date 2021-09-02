import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import "./Login.css";
import { PAGE_REGISTRATION } from '../../utils/constants';
import FormValidation from '../Validation/Validation';

function Login({handleLogin, error}) {

    const formValidation = FormValidation();

    const {email, password} = formValidation.data;



    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formValidation.data;
        if (!email || !password) {
            return;
        }
        handleLogin({ email: email, password: password });
        formValidation.resetForm();
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
                    errorText={error}
                    isValid={formValidation.isValid}
                    >
                        <p className="form__input-name">E-mail</p>
                        <input className="form__input"
                        id="email-input"
                        type="email"
                        name="email"
                        maxLength="100"
                        minLength="5"
                        onChange={formValidation.handleChange}
                        placeholder="Введите почту"
                        value={email || ''}
                        pattern="^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$"
                        required
                         />
                    <span className="form__input-error">{formValidation.errors.email}</span>
                    <p className="form__input-name">Пароль</p>
                    <input className="form__input"
                            id="password-input"
                            type="password"
                            name="password"
                            maxLength="20" 
                            minLength="5"
                            placeholder="Введите пароль"
                            onChange={formValidation.handleChange}
                            autoComplete="off"
                            value={password || ''}
                            required
                         />
                    <span className="form__input-error">{formValidation.errors.password}</span>
                    </Form>
                <p className="login__link">Ещё не зарегистрированы? <Link to={PAGE_REGISTRATION}>Регистрация</Link></p>
        </section>
    )
}

export default Login;