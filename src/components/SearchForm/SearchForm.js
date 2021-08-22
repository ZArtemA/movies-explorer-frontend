import './SearchForm.css';
import button from '../../images/find.svg';
import Checkbox from './Checkbox/Checkbox';

function SearchForm({ handleCheckbox, checkbox }) {

    return (
        <section className="search-form">
            <form className="search-form__box">
            <fieldset className="search-form__bar">
        <input type="text" className="search-form__input" name="movie" placeholder="Фильм" required />
        <button type="submit" className="search-form__submit-btn">
        <img className="search-form__button-img" src={button} alt="Найти" />
        </button>
      </fieldset>
       <Checkbox handleCheckbox={handleCheckbox} checkbox={checkbox} />
            </form>
        </section>
    );
}
export default SearchForm;
