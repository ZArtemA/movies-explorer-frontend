import { Link } from 'react-router-dom';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import './Register.css';

import { PAGE_LOGIN } from '../../utils/constants';

function Register() {
    return (
        <section className="register">
            <Logo/>
            <h1 className="register__greetings">Добро пожаловать!</h1>
    <Form>  
                <p>Имя</p>
                <input/>
                <span className="form__input-error"></span>
                <p>E-mail</p>
                <input/>
                <span className="form__input-error"></span>
                <p>Пароль</p>
                <input/>
                <span className="form__input-error"></span>
    </Form>
 <p className="register__link">Уже зарегистрированы? <Link to={PAGE_LOGIN}>Войти</Link></p>
 </section>
    )
}

export default Register;