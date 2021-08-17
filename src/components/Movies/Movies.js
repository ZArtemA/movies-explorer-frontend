import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ handleCheckbox, checkbox }) {
return (
    <section className="movies">
      <div className="movies__container">
        <SearchForm handleCheckbox={handleCheckbox} checkbox={checkbox} />
        <MoviesCardList />
      </div>
    </section>
  )
}
export default Movies