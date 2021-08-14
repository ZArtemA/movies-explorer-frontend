  
import React from 'react';
import { useState } from 'react';
import './SearchForm.css';
import button from '../../images/find.svg';

function SearchForm() {

    const [checkbox, setCheckbox] = useState(true);
    function handleCheckbox() {
        setCheckbox(!checkbox);
      }

    return (
        <section className="search-form">
            <form className="search-form__box">
            <fieldset className="search-form__bar">
        <input type="text" className="search-form__input" name="movie" placeholder="Фильм" required />
        <button type="submit" className="search-form__submit-btn">
        <img className="search-form__button-img" src={button} alt="Найти" />
        </button>
      </fieldset>
      <fieldset className="search-form__box">
      <label className="search-form__checkbox-text">Короткометражки
      <input
         onClick={handleCheckbox}
         type="checkbox"
         className="search-form__checkbox_hide"
         name="checkbox"
         id="checkbox"
         defaultChecked={checkbox}
      />
      <span className="search-form__checkbox_visible"></span>
      </label> 
       </fieldset>
            </form>
        </section>
    );
}
export default SearchForm;
